<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="device === 'mobile' && sidebar.opend"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <Sidebar class="sidebar-container" />
    <div :class="{ hasTagsView: tagsView }" class="main-container">
      <div :class="{ 'fixen-header': fixedHeader }">
        <Navbar />
        <Tags-View v-if="needdTagsView" />
      </div>
      <app-main />
      <right-panel v-if="showSettings">
        <settings />
      </right-panel>
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue";
import RightPanel from "@/components/RightPanel/index.vue";
import { AppMain, Navbar, Settings, Sidebar } from "./components";
import { appStore, settingsStore } from "@/store";
import { storeToRefs } from "pinia";

const { showSettings, tagsView, fixedHeader } = storeToRefs(settingsStore);
const { sidebar, device } = storeToRefs(appStore);
const classObj = computed(() => {
  return {
    hideSidebar: !sidebar.opened,
    openSidebar: sidebar.opened,
    withoutAnimation: sidebar.withoutAnimation,
    mobile: device === "mobile",
  };
});
const handleClickOutside = appStore.closeSideBar(false);
</script>
<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    transition: width 0.28s;
  }
  .hideSidebar .fixed-header {
    width: calc(100% - 54px);
  }
  .mobile .fixed-header {
    width: 100%;
  }
}
</style>
