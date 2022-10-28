<template>
  <div class="flex-a header">
    <div class="flex-a">
      <LayoutTrigger />
      <LayoutBreadcrumb class="pl-10" />
    </div>
    <div class="flex-a">
      <div><LayoutfullScreen /></div>
      <div><LayoutUserDropDown /></div>
      <div>//.,/</div>
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
</style>
