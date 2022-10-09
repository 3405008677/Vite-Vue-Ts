<template>
  <div :class="{ 'has-logo': settingsStore.sidebarLogo }">
    <Logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollba-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-time
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        ></sidebar-time>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script setup>
import { computed } from "vue";
import Logo from "./Logo.vue";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";
import { settingsStore } from "@/store";




</script>
<style scoped lang="scss"></style>
