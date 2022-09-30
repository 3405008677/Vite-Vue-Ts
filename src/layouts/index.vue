<template>
  <div :class="classObj" class="app-wrapper"></div>
</template>
<script setup>
import { computed, ref } from "vue";
import { myMapState, userStore } from "@/store";
import { mapState } from "pinia";

// const { sidebar, sidebarLogo } = myMapState(userStore, [
//   "sidebar",
//   "sidebarLogo",
// ]);
const { sidebar, sidebarLogo } = mapState(["sidebar", "sidebarLogo"]);

console.log(sidebar, sidebarLogo);
</script>
<style scoped lang="scss">
.com-logo {
  background-color: var(--el-menu-bg-color);
  height: 60px;
}
.el-menu {
  height: 100%;
}
</style>
