import { defineStore } from "pinia";

export default defineStore("user", {
  state: () => {
    return {
      title: 'user数据',
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
