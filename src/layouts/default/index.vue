<template>
  <div class="common-layout">
    <el-container>
      <el-aside v-if="appStore.showSidebar" width="auto">
        <LayoutSideBar />
      </el-aside>
      <el-container>
        <el-header class="header flex-a">
          <LayoutHeader />
        </el-header>
        <el-main>
          <LayoutContent />
          <LayoutFooter />
        </el-main>
      </el-container>
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
<style scoped lang="scss">
.common-layout {
  height: 100%;
  .el-container {
    height: 100%;
  }
  .header {
    background-color: pink;
    --el-header-height: 56px;
  }
}
</style>
