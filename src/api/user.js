import request from "@/utils/request";
// 登录
const loginApi = (params) => {
  return request.post("/sys/login", params);
};
// 获取管理员路由
const getMenuListApi = () => {
  return request.get("/sys/menu/list", { roleId: 1 });
};
// 获取指定用户信息
const getUserInfoApi = (id) => {
  return request.get("sys/user/info", id);
};
// 获取所有用户信息
const getUserInfoListApi = (token) => {
  return request.get("/sys/user/infoList", token);
};
export { loginApi, getMenuListApi, getUserInfoListApi, getUserInfoApi };
