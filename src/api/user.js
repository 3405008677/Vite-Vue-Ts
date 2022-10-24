import request from "@/utils/request";
// 登录
const loginApi = (params) => {
  return request.post("/sys/login", params);
};
// 获取路由
const getMenusApi = () => {
  return request.get("/getRouter");
};
// 获取用户信息
const getInfoApi = (token) => {
  return request.get("/userInfo", token);
};
//退出
const logoutApi = () => {
  return request.post("/logout");
};

export { loginApi, getMenusApi, getInfoApi, logoutApi };
