import request from "@/utils/request";
// 登录
const loginApi = (params) => {
  return request.post("/sys/login", params);
};
// 获取管理员路由
const getMenuListApi = () => {
  return request.get("/sys/menu/list");
};
// 获取用户信息
const getUserInfoListApi = (token) => {
  return request.get("/sys/user/infoList", token);
};
//退出
const logoutApi = () => {
  return request.post("/logout");
};

export { loginApi, getMenuListApi, getUserInfoListApi, logoutApi };
