import { defineStore } from "pinia";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter } from "@/router";
import { loginApi, getInfoApi, logoutApi } from "@/api/user";

export default defineStore("user", {
  state: () => {
    return {
      token: getToken(),
      name: "",
      avatar: "",
      introduction: "",
      roles: [],
      routerList: [],
    };
  },
  actions: {
    setUserInfo(value) {
      this.userInfo = value;
    },
    setPermissionStore(value) {
      this.permissionStore = value;
    },
    // 用户登录
    login(userinfo) {
      const { username, password } = userinfo;
      return new Promise((resolve, reject) => {
        loginApi({ username: username.trim(), password: password.trim() })
          .then((response) => {
            console.log(response)
            const { data } = response;
            this.token = data.token;
            setToken(data.token);
            // 获取用户信息
            // this.setInfo()
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 获取用户信息
    setInfo() {
      return new Promise((resolve, reject) => {
        getInfoApi(this.token)
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
});
