<template>
  <div :class="{ 'has-logo': userStore.sidebarLogo }">
    <Logo />
    <el-scrollbar>
      <el-menu>
        <sidebar-time></sidebar-time>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script setup>
import { computed } from "vue";
import Logo from "./Logo.vue";
import { userStore } from "@/store";

// const showLogo = computed(()=>)
</script>
<style scoped lang="scss"></style>
