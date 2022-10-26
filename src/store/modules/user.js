import { defineStore } from "pinia";
import { getToken, setToken, removeToken, setRouterList, getRouterList } from "@/utils/auth";
import { resetRouter } from "@/router";
import { addRouteList } from "@/router";
import { routerList as myRouterList } from "/mock/router";
import { loginApi, getMenuListApi, getUserInfoListApi, logoutApi } from "@/api/user";

export default defineStore("user", {
  state: () => {
    return {
      token: getToken(),
      name: "",
      avatar: "",
      introduction: "",
      roles: [],
      routerList: getRouterList(),
    };
  },
  actions: {
    // 管理员登录
    login(userinfo) {
      const { username, password } = userinfo;
      return new Promise((resolve, reject) => {
        loginApi({ username: username.trim(), password: password.trim() })
          .then((response) => {
            const { bean } = response;
            this.token = bean.token;
            setToken(bean.token);
            // 获取用户信息
            // this.getInfo()
            this.getRouterList();
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 获取用户信息
    getInfo() {
      return new Promise((resolve, reject) => {
        getUserInfoListApi(this.token)
          .then((response) => {
            const { data } = response;
            if (!data) reject(response.msg);
            const { roles, name, avatar, introduction } = data;
            if (!roles || roles.length <= 0) reject("getInfo: roles must be a non-null array!");
            this.roles = roles;
            this.name = name;
            this.avatar = avatar;
            this.introduction = introduction;
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 获取管理员路由
    async getRouterList() {
      // let { bean } = await getMenuListApi();
      // this.routerList = bean;
      // 动态添加权限
      addRouteList(myRouterList);
      // 设置本地router-list
      setRouterList(myRouterList);
      // 更新到pinia
      this.routerList = myRouterList;
    },
    //退出登录
    logout() {
      return new Promise((resolve, reject) => {
        logoutApi(this.token)
          .then(() => {
            this.token = "";
            this.roles = [];
            removeToken();
            resetRouter();
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    //删除token
    resetToken() {
      return new Promise((resolve) => {
        removeToken();
        resolve();
      });
    },
  },
  getters: {},
});
