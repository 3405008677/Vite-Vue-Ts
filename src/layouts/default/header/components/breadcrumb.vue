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
  let arr = route.matched;
  arr.splice(0, 1);
  return arr;
});
</script>
<style scoped lang="scss"></style>
