<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <LayoutSideBar v-if="appStore.showSidebar" />
      </el-aside>
      <el-main>
        <LayoutHeader />
        <LayoutContent />
        <LayoutFooter />
      </el-main>
    </el-container>
  </div>
</template>
<script setup>
import LayoutSideBar from "./sider/index.vue";
import LayoutHeader from "./header/index.vue";
import LayoutContent from "./content/index.vue";
import LayoutFooter from "./footer/index.vue";
import { appStore } from "@/store";
</script>
<style scoped lang="scss"></style>
