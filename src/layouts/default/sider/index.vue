<template>
  <el-menu default-active="/home" class="el-menu-vertical-demo" :collapse="isCollapse" router>
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
import { ref } from "vue";
import SiderMenu from "./siderMenu.vue";
import { userStore } from "@/store";
import { useRouter } from "vue-router";
const isCollapse = ref(false);
const router = useRouter();
console.log(router.options.routes,'now-router');
</script>
<style lang="scss" scoped>
:deep(.el-menu-item-group__title) {
  padding: 0;
}
</style>
