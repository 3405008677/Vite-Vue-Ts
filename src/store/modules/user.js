import { defineStore } from "pinia";
import {
  getToken,
  setToken,
  setRouterList,
  getRouterList,
  getUserInfo,
  setUserInfo,
} from "@/utils/auth";
import { Session } from "@/utils/storage";
import { resetRouter, addRouteList } from "@/router";
import { formattingRouter } from "@/router/utils";
import { loginApi, getMenuListApi, getUserInfoApi } from "@/api/user";

export default defineStore("user", {
  state: () => {
    return {
      userId: "",
      token: getToken(),
      userinfo: getUserInfo(),
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
      let { bean } = await loginApi({ username: username.trim(), password: password.trim() });
      this.token = bean.token;
      this.userId = bean.id;
      setToken(bean.token);
      // 获取用户信息
      this.getInfo();
      // 获取路由信息
      await this.getRouterList();
    },
    // 获取用户信息
    async getInfo() {
      let { bean } = await getUserInfoApi({ id: this.userId });
      this.userinfo = bean;
      setUserInfo(bean);
    },
    // 获取管理员路由
    async getRouterList() {
      let { bean } = await getMenuListApi();
      let rs = formattingRouter(bean);
      // 动态添加权限
      addRouteList(rs);
      // 设置本地router-list
      setRouterList(rs);
      // 更新到pinia
      this.routerList = rs;
    },
    //退出登录
    async logout() {
      this.token = "";
      this.roles = [];
      Session.clear();
      resetRouter();
    },
  },
  getters: {},
});
