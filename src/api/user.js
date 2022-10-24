import request from "@/utils/request";
// 登录
const loginApi = (params) => {
  return request.post({
    url: "/sys/login",
    data: params,
  });
};
// 获取路由
const getMenusApi = () => {
  return request.get({
    url: "/getRouter",
  });
};
// 获取用户信息
const getInfoApi = (token) => {
  return request.get({
    url: "/userInfo",
    params: { token },
  });
};
//退出
const logoutApi = () => {
  return request.post({
    url: "/logout",
  });
};

export { loginApi, getMenusApi, getInfoApi, logoutApi };
