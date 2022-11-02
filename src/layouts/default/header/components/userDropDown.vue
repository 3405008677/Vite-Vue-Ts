<template>
  <el-dropdown>
    <div class="flex-a">
      <el-image
        class="userImage"
        :src="imageUrl"
        style="width: 26px; height: 26px"
        fit="cover"
        @click="urlClick"
      />
      <span>title</span>
    </div>
  </el-dropdown>
</template>
<script setup>
import { userStore } from "@/store";
import { computed } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const imageUrl = computed(() => {
  if (userStore.info.image) {
    return userStore.info.image;
  } else {
    return "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif";
  }
});
const urlClick = () => {
  console.log(route);
  console.log(router.getRoutes());
};
</script>
<style scoped lang="scss">
.userImage {
  border-radius: 50%;
  margin: 0 10px;
}
</style>
