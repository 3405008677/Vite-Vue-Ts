import { defineStore } from "pinia";
import { Session } from "@/utils/storage";
export default defineStore("app", {
  state: () => {
    return {
      sidebar: {
        opened: false,
        withoutAnimation: false,
      },
      device: "desktop",
      size: Session.get("size") || "medium",
      // 显示LOGO
      isLogo: true,
      // 是否显示左边栏
      showSidebar: true,
      // 缩小左边栏
      isCollapse: false,
    };
  },
  actions: {
    toggleSideBar(value) {
      this.sidebar.opened = !this.sidebar.opened;
      this.sidebar.withoutAnimation = false;
      if (this.sidebar.opened) {
        Session.set("sidebarStatus", 1);
      } else {
        Session.set("sidebarStatus", 0);
      }
    },
    closeSideBar(value) {
      Session.set("sidebarStatus", 0);
      this.sidebar.opened = false;
      this.sidebar.withoutAnimation = value;
    },
    toggleDevice(value) {
      this.device = value;
    },
    setSize(value) {
      Session.set("size", value);
    },
    setShowSidebar(value) {
      this.showSidebar = value;
    },
    //缩小 or 还原 sidebar
    toggleCollapsed() {
      this.isCollapse = !this.isCollapse;
    },
  },
});
