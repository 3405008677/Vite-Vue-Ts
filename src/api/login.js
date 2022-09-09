import request from "@/utils/request";

export default {
  login(params) {
    return request.post({
      url: "/login",
      data: params,
    });
  },
  getMenus() {
    return request.get({
      url: "/getRouter",
    });
  },
};
