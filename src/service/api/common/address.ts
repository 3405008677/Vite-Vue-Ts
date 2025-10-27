// 引入文件
import http from '@/service' // 引入网络请求http

/**
 * 查询国家拉下数据项
 * @returns
 */
// import {countryItemsAPI} from "@/service/api/common/address"
export function countryItemsAPI(keyWord: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/District/CountryItems', { keyWord })
      .then((result) => {
        resolve(result.data)
      })
      .catch((error: Error) => {
        reject(error)
      })
  })
}

/**
 * 查询省（州）拉下数据项
 * @returns
 */
// import {provinceItemsAPI} from "@/service/api/common/address"
// 输入参数{parId: 1156, "keyWord":""}
export function provinceItemsAPI(params: any): Promise<any[]> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/District/ProvinceItems', params)
      .then((result) => {
        resolve(result.data)
      })
      .catch((error: Error) => {
        reject(error)
      })
  })
}

/**
 * 根据上级地区id查询其下各级地区
 * @returns
 */
// import {districtItemsAPI} from "@/service/api/common/address"
// 输入参数{parId: 1156, "keyWord":""}
export function districtItemsAPI(params: any): Promise<any[]> {
  return new Promise((resolve, reject) => {
    http
      .post('/SysManage/District/DistrictItems', params)
      .then((result) => {
        resolve(result.data)
      })
      .catch((error: Error) => {
        reject(error)
      })
  })
}

export default { countryItemsAPI, provinceItemsAPI, districtItemsAPI }
