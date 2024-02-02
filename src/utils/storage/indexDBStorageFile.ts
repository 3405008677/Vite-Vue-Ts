/**
 * @Description: 网络文件加载管理器
 * 1 加载url路径的文件
 * 2 url已经加载完毕，则使用indexDB缓存到浏览器本地(异步非阻塞)
 * 3 如果url已经加载过且有本地缓存，则直接使用本地缓存
 * 4 若url中带有更新标识符，则强制更新本地缓存
 */

import { IndexDBAdapter } from './baseIndexDb'

class NetFileLoader {
  // 变量
  private indexDB: IndexDBAdapter

  // 方法
  constructor() {
    this.indexDB = new IndexDBAdapter('Babylon')
    this.mConnectDB()
  }

  private async mConnectDB() {
    await this.indexDB.mConnectDB()
  }

  storageDBModel(key: string, url: string) {
    return fetch(url)
      .then((response) => response.arrayBuffer())
      .then((glbArrayBuffer) => {
        this.indexDB.addDataDB({ uid: key, file: glbArrayBuffer })
      })
  }

  async gainDBModel(key: string): Promise<any> {
    await this.indexDB.get(key).then((result) => {
      if (result === undefined || result === null) return new Promise((resole) => resole(false))
      let blob = new Blob([result.file])

      return new Promise((resolve) => {
        resolve(blob)
      })
    })
  }

  gainAndStorage(key: string, url: string): Promise<any> {
    return new Promise((resolve) => {
      this.gainDBModel(key).then((result) => {
        if (result !== undefined && result !== null) return resolve(result)
        this.storageDBModel(key, url)

        resolve(false)
      })
    })
  }
}

export { NetFileLoader }
