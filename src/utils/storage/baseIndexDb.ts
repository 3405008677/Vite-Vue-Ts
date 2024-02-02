/**
 * IndexDB
 */
interface BDataType {
  uid: string | number
  [key: string]: any
}

class IndexDBAdapter {
  /**********************************
   * 变量s
   ***********************************/
  protected m_dbname: string
  protected m_db!: IDBDatabase

  constructor(name: string) {
    this.m_dbname = name

    this.init()
  }

  /**********************************
   * 方法s
   ***********************************/
  /**
   * 初始化
   */
  init() {
    console.log('IndexDBAdapter init!!')
  }

  /**
   * 打开、连接数据库
   * @return {Promise<IDBDatabase>}
   */
  mConnectDB(): Promise<IDBDatabase> {
    console.log('IndexDBAdapter mConnectDB!!')
    return new Promise((resolve, reject) => {
      let indexDB = window.indexedDB
      const request = indexDB.open(this.m_dbname)
      request.onerror = (err) => reject(err)
      request.onsuccess = (event) => {
        this.m_db = (<IDBOpenDBRequest>event.target).result
        resolve((<IDBOpenDBRequest>event.target).result)
      }
      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const objectStore = (<IDBOpenDBRequest>event.target).result.createObjectStore(
          this.m_dbname,
          {
            keyPath: 'uid',
          },
        )
        objectStore.createIndex('uid', 'uid', { unique: true })
        objectStore.createIndex('name', 'name', { unique: false })
      }
    })
  }

  /**
   * 关闭数据库
   */
  mDisconnectDB(): Promise<boolean> {
    return new Promise((resolve) => {
      this.m_db.close()
      console.log('数据库已关闭')
      resolve(true)
    })
  }

  /**
   * 新增数据
   */
  addDataDB(data: BDataType): Promise<boolean> {
    return new Promise((resolve) => {
      const transaction = this.m_db.transaction([this.m_dbname], 'readwrite')
      transaction.oncomplete = (event) => {
        console.log('事务成功!', event)
        resolve(true)
      }
      transaction.onerror = (event) => {
        console.log('事务失败!', event)
        resolve(false)
      }
      const request = transaction.objectStore(this.m_dbname).add(data)
      request.onsuccess = (event) => {
        console.log('添加成功!', event)
      }
      request.onerror = (event) => {
        console.log('添加失败!', event)
      }
    })
  }

  /**
   * 通过主键读取数据
   */
  get(uid: string | number): Promise<BDataType> {
    return new Promise((resolve, reject) => {
      let transaction = this.m_db.transaction([this.m_dbname], 'readonly')
      let objectStore = transaction.objectStore(this.m_dbname)
      let request = objectStore.get(uid)
      request.onsuccess = () => {
        console.log('主键查询结果:', request.result)
        resolve(request.result)
      }
      request.onerror = (event) => {
        console.log('事务失败!', event)
        reject(false)
      }
    })
  }

  /**
   * 通过索引读取数据
   */
  getDataByIndex(indexName: string, indexValue: string): Promise<any | boolean> {
    return new Promise((resolve, reject) => {
      var store = this.m_db.transaction([this.m_dbname], 'readonly').objectStore(this.m_dbname)
      var request = store.index(indexName).get(indexValue)
      request.onerror = function () {
        console.log('事务失败')
        reject(false)
      }
      request.onsuccess = (event) => {
        let result = (<IDBRequest>event.target).result as IDBCursorWithValue
        console.log('索引查询结果：', result)
        resolve(result)
      }
    })
  }

  /**
   * 通过游标读取数据
   */
  cursorDataDB(): Promise<any[]> {
    return new Promise((resolve) => {
      let listArr: any = []
      let store = this.m_db.transaction([this.m_dbname], 'readonly').objectStore(this.m_dbname)
      let request = store.openCursor()
      request.onsuccess = (event) => {
        let cursor = (<IDBRequest>event.target).result as IDBCursorWithValue
        if (cursor) {
          listArr.push(cursor.value)
          cursor.continue()
        } else {
          console.log('游标读取的数据：', listArr)
          resolve(listArr)
        }
      }
    })
  }

  /**
   * 通过索引和游标查询记录
   */
  cursorAndIndexDB(indexName: string, indexValue: string): Promise<any[]> {
    return new Promise((resolve) => {
      let listArr: any = []
      let store = this.m_db.transaction([this.m_dbname], 'readonly').objectStore(this.m_dbname)
      let request = store.index(indexName).openCursor(IDBKeyRange.only(indexValue))
      // 绑定成功状态的监听
      request.onsuccess = (event) => {
        let cursor = (<IDBRequest>event.target).result as IDBCursorWithValue
        if (cursor) {
          listArr.push(cursor.value)
          cursor.continue()
        } else {
          console.log('游标读取的数据：', listArr)
          resolve(listArr)
        }
      }
      //绑定失败情况的回调监听
    })
  }

  /**
   * 更新数据
   */
  mUpdate(data: BDataType): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const request = this.m_db
        .transaction([this.m_dbname], 'readwrite')
        .objectStore(this.m_dbname)
        .put(data)
      request.onsuccess = function () {
        console.log('数据更新成功')
        resolve(true)
      }
      request.onerror = function () {
        console.log('数据更新失败')
        reject(false)
      }
    })
  }

  /**
   * 通过主键删除数据
   */
  mDelete(uid: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const request = this.m_db
        .transaction([this.m_dbname], 'readwrite')
        .objectStore(this.m_dbname)
        .delete(uid)
      request.onerror = function () {
        console.log('删除失败')
        reject(false)
      }
      request.onsuccess = function () {
        console.log('删除成功')
        resolve(true)
      }
    })
  }

  /**
   * 删除数据库
   */
  mDeleteAll(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let request = window.indexedDB.deleteDatabase(this.m_dbname)
      request.onerror = function () {
        console.log('删除失败')
        reject(false)
      }
      request.onsuccess = function () {
        console.log('删除成功')
        resolve(true)
      }
    })
  }
}

export { IndexDBAdapter }
