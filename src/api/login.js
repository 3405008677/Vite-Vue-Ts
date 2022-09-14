import request from "@/utils/request";

export default {
  // 登录
  login(params) {
    return request.post({
      url: "/login",
      data: params,
    });
  },
  // 获取路由
  getMenus() {
    return request.get({
      url: "/getRouter",
    });
  },
  // 获取用户信息
  getUserInfo(){
    return request.get({
      url:"/userInfo"
    })
  }
};
