<template>
  <div class="flex-a header h">
    <div class="flex-a h">
      <span class="flex-a hover cursor-pointer">
        <LayoutTrigger />
      </span>
      <LayoutBreadcrumb class="pl-10" />
    </div>
    <div class="flex-a h">
      <div class="hover flex-a cursor-pointer"><LayoutfullScreen /></div>
      <div class="hover flex-a cursor-pointer"><LayoutUserDropDown /></div>
      <div class="hover flex-a cursor-pointer"><LayoutUserDropDown /></div>
    </div>
  </div>
</template>
<script setup>
import LayoutTrigger from "./components/trigger.vue";
import LayoutBreadcrumb from "./components/breadcrumb.vue";
import LayoutfullScreen from "./components/fullScreen.vue";
import LayoutUserDropDown from "./components/userDropDown.vue";
</script>
<style scoped lang="scss">
.header {
  width: 100%;
  justify-content: space-between;
}
.hover {
  height: 100%;
  padding: 1px 10px 0;
  &:hover {
    background-color: $--header-bg-hover-color;
  }
}
</style>
