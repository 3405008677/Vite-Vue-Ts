<template>
  <div>
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item v-for="item in breadcrumbList" :key="item">
        <span>{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script setup>
import { computed } from "@vue/reactivity";
import { useRoute } from "vue-router";
const route = useRoute();
const breadcrumbList = computed(() => {
  /**
   * 此处有大坑
   * 之前用的是splice
   * splice可以改变原数组的值
   * 使用后route.matched上面的数组少了一个
   * 导致当route为根下面子路由时 component 不显示
   * 所有慎用 可以导致原数组发送改变
   */
  let arr = route.matched.slice(1);
  return arr;
});
</script>
<style scoped lang="scss">
* {
  color: $--header-size-color !important;
  --el-text-color-placeholder: $--header-size-color;
}
</style>
