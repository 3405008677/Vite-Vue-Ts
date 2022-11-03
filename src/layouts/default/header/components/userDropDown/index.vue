<template>
  <el-dropdown>
    <div class="flex-a">
      <el-image class="userImage" :src="imageUrl" style="width: 26px; height: 26px" fit="cover" />
      <span>{{ userName }}</span>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item icon="House">主页</el-dropdown-item>
        <el-dropdown-item divided icon="Lock" @click="isLock = !isLock">锁定屏幕</el-dropdown-item>
        <el-dropdown-item icon="SwitchButton" @click="quit">退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <Lock v-model="isLock" />
</template>
<script setup>
import { ref } from "vue";
import { userStore } from "@/store";
import { computed } from "@vue/reactivity";
import { useRouter } from "vue-router";
import Lock from "./lock.vue";
const router = useRouter();
const isLock = ref(false);
const imageUrl = computed(() => {
  if (userStore.info.image) {
    return userStore.info.image;
  } else {
    return "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif";
  }
});
const userName = computed(() => userStore.userinfo.name);
const quit = () => {
  ElMessageBox.confirm("是否确认退出系统?", "温馨提示!", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    userStore.logout();
    ElNotification({
      title: "提示",
      message: "退出成功",
      type: "success",
    });
    router.replace("/login");
  });
};
</script>
<style scoped lang="scss">
* {
  color: $--header-size-color;
}
.userImage {
  border-radius: 50%;
  margin-right: 10px;
}
</style>
