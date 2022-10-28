<template>
  <el-dropdown>
    <div class="flex-a">
      <el-image class="userImage" :src="imageUrl" style="width: 26px; height: 26px" fit="cover" />
      <span>title</span>
    </div>
  </el-dropdown>
</template>
<script setup>
import { userStore } from "@/store";
import { computed } from "@vue/reactivity";

const imageUrl = computed(() => {
  console.log(userStore.info.image);
  if (userStore.info.image) {
    return userStore.info.image;
  } else {
    return "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif";
  }
});
</script>
<style scoped lang="scss">
.userImage {
  border-radius: 50%;
  margin: 0 10px;
}
</style>
