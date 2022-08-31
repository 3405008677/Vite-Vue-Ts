// import axios from 'axios'

// const request = axios.create({
//   baseURL: import.meta.env.VITE_BASE_URL,
//   timeout: 10000,
//   headers: {}
// })


// const request = (url, options = {}) => {
//   let { headers = {}, method = 'GET', data = {} = options }

// }


// /**
//  * 对 Axios 库的二次封装
//  *
//  * author: 母鸡啊
//  * date: 2021-5-5
//  */

// import axios from "axios";
// import { notEmpty, stringify, Observable } from "./utils";

// const request = (url, options = {}) => {
//   let { headers = {}, method = "GET", data = {} } = options;
//   if (
//     headers["Content-Type"] === "application/x-www-form-urlencoded" &&
//     notEmpty(data)
//   ) {
//     options.data = stringify(data);
//   }
//   options.url = url;
//   options.method = method;
//   return request.http.request(options);
// };

// const event = new Observable(),
//   onHttpRequest = (fn, scope) => {
//     event.on("onRequest", fn, scope);
//   },
//   onHttpResponse = (fn, scope) => {
//     event.on("onResponse", fn, scope);
//   },
//   onHttpError = (fn, scope) => {
//     event.on("onError", fn, scope);
//   },
//   notifyError = (status, message, data) => {
//     event.emit("onError", { status, message, data });
//   },
//   errorMessage = {
//     0: "无法连接服务",
//     403: "资源拒绝访问",
//     401: "未验证的用户",
//     504: "代理访问错误",
//     500: "服务运行错误",
//     404: "服务资源不存在",
//     302: "登录过期",
//   };

// const errorHandler = (error) => {
//   if (error.response) {
//     let { status, data } = error.response;
//     if (status in errorMessage) {
//       notifyError(status, errorMessage[status], data);
//     }
//   }

//   return Promise.reject(error);
// };

// const createHttp = (options) => {
//   let http = axios.create(options);
//   // 拦截器
//   http.interceptors.request.use((config) => {
//     event.emit("onRequest", config);
//     return config;
//   });

//   http.interceptors.response.use((response) => {
//     event.emit("onResponse", response);
//     return response;
//   }, errorHandler);
//   request.http = http;
// };
// createHttp({ timeout: 1000 });

// request.install = (app) => {
//   app.config.globalProperties.$request = request;
// };

// export { request, createHttp, onHttpRequest, onHttpResponse, onHttpError };

// export default request;