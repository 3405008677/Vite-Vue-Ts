<template>
  <el-menu
    :default-active="route.path"
    class="el-menu-vertical-demo"
    :collapse="appStore.isCollapse"
    router
  >
  <CompLogo />
    <template v-for="item in userStore.routerList" :key="item.name">
      <SiderMenu :data="item" v-if="item.children" />
      <el-menu-item v-else :index="item.name" router>
        <el-icon>
          <component :is="item.meta.elIcon" />
        </el-icon>
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
  </el-menu>
</template>
<script setup>
import CompLogo from "@/components/logo.vue";
import SiderMenu from "./siderMenu.vue";
import { userStore, appStore } from "@/store";
import { useRoute } from "vue-router";
// 路由与菜单匹配
const route = useRoute();
</script>
<style lang="scss" scoped>
// .el-menu-item-group {
//   :deep(.el-menu-item-group__title) {
//     padding: 0 !important;
//   }
// }
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  height: calc(100% - 56px)
}
</style>
