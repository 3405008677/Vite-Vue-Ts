import request from '@utils/request'



export function loginIn (params) {
  return request.post({
    url: '/login',
    data: params
  })
}

// export function getUser (params) {
//   return request.get({
//     url
//   })
// }