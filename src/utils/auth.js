import { Session } from "./storage";

// 存储基本信息
const setUserInfo = (info) => {
  return Session.set(import.meta.env.VITE_WEB_INFO, info)
}

//获取基本信息
const getUserInfo = (info) => {
  return Session.get(import.meta.env.VITE_WEB_INFO) || {}
}

//存储token
const setToken = () => {
  return Session.set('token', token)
}

// 获取token
const getToken = () => {
  return Session.get('token')
}

// 退出登录
const removeToken = () => {
  return Session.remove('token')
}

export { setUserInfo, getUserInfo, setToken, getToken, removeToken }