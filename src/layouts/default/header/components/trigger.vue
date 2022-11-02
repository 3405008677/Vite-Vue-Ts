<template>
  <el-icon :size="18" @click="appStore.toggleCollapsed">
    <component :is="appStore.isCollapse ? 'Expand' : 'Fold'" />
  </el-icon>
</template>
<script setup>
import { appStore } from "@/store";
</script>
<style scoped lang="scss">
* {
  color: $--header-size-color;
}
</style>
