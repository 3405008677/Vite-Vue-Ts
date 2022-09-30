<template>
  <div class="app-wrapper">
    <div
      v-if="device === 'mobile' && sidebar.opend"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <Sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{ 'fixen-header': fixedHeader }">
        <Navbar />
        <Tags-View v-if="needdTagsView" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { Sidebar } from "./components";
import { settingsStore, appStore } from "@/store";
import { storeToRefs } from "pinia";
import { useRouter ,useRoute} from "vue-router";

const route = useRoute()
const { showSettings, needTagsView, fixedHeader } = storeToRefs(settingsStore);
const { sidebar, device } = storeToRefs(appStore);

console.log(route.name);

const handleClickOutside = () => {};
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
