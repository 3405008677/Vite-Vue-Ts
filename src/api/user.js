import request from "@/utils/request";

// 登录
const login = (params) => {
  return request.post({
    url: "/login",
    data: params,
  });
};
// 获取路由
const getMenus = () => {
  return request.get({
    url: "/getRouter",
  });
};
// 获取用户信息
const getInfo = (token) => {
  return request.get({
    url: "/userInfo",
    params: { token },
  });
};
//退出
const logout = () => {
  return request.post({
    url: "/logout",
  });
};

export { login, getMenus, getInfo, logout };
