<template>
  <div
    class="cursor-default"
    :class="appStore.isCollapse ? 'flex-j-a content-1' : 'flex-a content-0'"
  >
    <el-image class="image" :src="logoUrl" fit="cover" style="width: 32px; height: 32px"></el-image>
    <div class="font" v-if="!appStore.isCollapse">{{ title }}</div>
  </div>
</template>
<script setup>
import logoUrl from "@/assets/logo.png";
import { appStore } from "@/store";
const title = import.meta.env.VITE_LOGO_TITLE;
</script>
<style scoped lang="scss">
.content-0 {
  height: 56px;
  padding: 10px 4px 10px 16px;
}
.content-1 {
  height: 56px;
  padding: 10px 0px 10px 0px;
}
.image {
  min-width: 32px;
}
.font {
  padding-left: 8px;
  font-weight: 600;
  font-size: 18px;
}
</style>
