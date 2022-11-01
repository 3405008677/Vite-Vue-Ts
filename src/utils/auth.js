import { Session } from "./storage";

// 存储基本信息
const setUserInfo = (info) => {
  return Session.set(import.meta.env.VITE_WEB_INFO, info);
};

//获取基本信息
const getUserInfo = (info) => {
  return Session.get(import.meta.env.VITE_WEB_INFO) || {};
};

//存储token
const setToken = (token) => {
  return Session.set("token", token);
};

// 获取token
const getToken = () => {
  return Session.get("token");
};

// 存储管理员路由
const setRouterList = (value) => {
  return Session.set("ROUTER-LIST", value);
};

// 获取管理员路由
const getRouterList = () => {
  return Session.get("ROUTER-LIST");
};

// 存储路由名称
const setRouterNameList = (value) => {
  // 扁平化 + 去重
  value = Array.from(new Set(getRouterNameList()).add(value)).flat();
  return Session.set("ROUTER-NAME-LIST", value);
};

// 获取路由名称
const getRouterNameList = () => {
  return Session.get("ROUTER-NAME-LIST");
};
// 退出登录
const removeToken = () => {
  return Session.remove("token");
};

export {
  setUserInfo,
  getUserInfo,
  setToken,
  getToken,
  setRouterList,
  getRouterList,
  setRouterNameList,
  getRouterNameList,
  removeToken,
};
