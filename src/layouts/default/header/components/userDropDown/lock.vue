<template>
  <el-dialog v-model="isLock" :show-close="false" destroy-on-close>
    <template #header="{ close, titleId, titleClass }">
      <div class="flex-a">
        <span>
          <p :id="titleId" :class="titleClass">锁定屏幕</p>
        </span>
        <span>
          <el-icon @click="close"><Close /></el-icon>
          <LayoutfullScreen />
        </span>
      </div>
    </template>
    <el-form>
      <el-form-item label="Promotion name">
        <el-input autocomplete="off" />
      </el-form-item>
      <el-form-item label="Zones">
        <el-select placeholder="Please select a zone">
          <el-option label="Zone No.1" value="shanghai" />
          <el-option label="Zone No.2" value="beijing" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button>Cancel</el-button>
        <el-button type="primary"> Confirm </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import LayoutfullScreen from "../fullScreen.vue";

const props = defineProps({
  isLock: {
    type: Boolean,
    default: false,
  },
});
</script>
<style scoped lang="scss">
.flex-a {
  justify-content: space-between;
}
</style>
