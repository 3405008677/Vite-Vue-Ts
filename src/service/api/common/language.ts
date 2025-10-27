/**
 * 语言
 * @author lcb
 * @date 2022-03-29
 */
// 引入文件
import http from '@/service' // 引入网络请求http

/**
 * 获取语种下拉组件数据
 * @returns
 */
// import {LangItemsAPI} from "@/service/api/common/language"
export function LangItemsAPI() {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/LanguageBase/LangItems')
      .then((result) => {
        resolve(result)
      })
      .catch((error: Error) => {
        reject(error)
      })
  })
}

/**
 * 6.2.5查询多语言新版本资源
 * @returns
 */
// import {langNewSourceAPI} from "@/service/api/common/language"
export function langNewSourceAPI() {
  return new Promise((resolve, reject) => {
    let params = {
      // langVer: settingStore.prefer?.langVer,
      // langCode: settingStore.prefer?.lang,
      langVer: 0,
      langCode: 'zh-cn',
    }
    http
      .post('/SysManage/Language/LangNewSource', params)
      .then((result) => {
        resolve(result)
      })
      .catch((error: Error) => {
        reject(error)
      })
  })
}
