import { defineStore } from "pinia";
import { getToken, setToken, removeToken, setRouterList, getRouterList } from "@/utils/auth";
import { resetRouter, addRouteList } from "@/router";
import { formattingRouter } from "@/router/utils";
// import { routerList as myRouterList } from "/mock/router";
import { loginApi, getMenuListApi, getUserInfoListApi, logoutApi } from "@/api/user";

export default defineStore("user", {
  state: () => {
    return {
      token: getToken(),
      name: "",
      avatar: "",
      introduction: "",
      info: "",
      roles: [],
      routerList: getRouterList(),
    };
  },
  actions: {
    // 管理员登录
    async login(userinfo) {
      const { username, password } = userinfo;
      let response = await loginApi({ username: username.trim(), password: password.trim() });
      const { bean } = response;
      this.token = bean.token;
      setToken(bean.token);
      // 获取用户信息
      // this.getInfo()
      // 获取路由信息
      this.getRouterList();
    },
    // 获取用户信息
    async getInfo() {
      let response = await getUserInfoListApi(this.token);
      const { data } = response;
      if (!data) return response.msg;
      const { roles, name, avatar, introduction } = data;
      if (!roles || roles.length <= 0) return "getInfo: roles must be a non-null array!";
      this.roles = roles;
      this.name = name;
      this.avatar = avatar;
      this.introduction = introduction;
      return data;
    },
    // 获取管理员路由
    async getRouterList() {
      let { bean } = await getMenuListApi();
      let rs = formattingRouter(bean);
      console.log(rs);
      // 动态添加权限
      addRouteList(rs);
      // 设置本地router-list
      setRouterList(rs);
      // 更新到pinia
      this.routerList = rs;
    },
    //退出登录
    async logout() {
      await logoutApi(this.token);
      this.token = "";
      this.roles = [];
      removeToken();
      resetRouter();
      resolve();
    },
    //删除token
    resetToken() {
      removeToken();
      resolve();
    },
  },
  getters: {},
});
