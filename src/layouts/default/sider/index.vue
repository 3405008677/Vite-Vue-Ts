<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >
    <template v-for="item in menuList" :key="item.path">
      <SiderMenu :data="item" v-if="item.children" />
      <el-menu-item v-else :index="item.path" router>
        <!-- <el-icon></el-icon> -->
        <template #title>{{ item.meta.title }}</template>
      </el-menu-item>
    </template>
  </el-menu>
</template>
<script setup>
import { ref } from "vue";
import SiderMenu from "./siderMenu.vue";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const menuList = ref(router.options.routes[0].children);
const isCollapse = ref(false);
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};
</script>
<style scoped lang="scss"></style>
