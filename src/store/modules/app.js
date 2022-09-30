import { defineStore } from "pinia";

export default defineStore("app", {
  state: () => {
    return {
      sidebarLogo: true,
      sidebar: '导航',
    };
  },
  actions: {
    setSideBarLogo(value) {
      this.sidebarLogo = value;
    },
  },
});
