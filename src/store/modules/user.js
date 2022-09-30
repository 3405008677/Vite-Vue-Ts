import { defineStore } from "pinia";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter, addRoutes } from "@/router";

export default defineStore("user", {
  state: () => {
    return {
      title: "user数据",
      userInfo: {},
      permissionStore: [],
    };
  },
  actions: {
    setUserInfo(value) {
      this.userInfo = value;
    },
    setPermissionStore(value) {
      this.permissionStore = value;
    },
  },
});
