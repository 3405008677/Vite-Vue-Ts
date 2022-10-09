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
  },
});
