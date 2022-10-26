<template>
  <el-sub-menu :index="data.name">
    <template #title>
      <el-icon>
        <component :is="data.meta.elIcon" />
      </el-icon>
      <span>{{ data.meta.title }}</span>
    </template>
    <template v-for="item in data.children" :key="item.name">
      <SiderMenu v-if="item.children" :data="item" />
      <el-menu-item-group v-else>
        <el-menu-item :index="item.name">
          <span>{{ item.meta.title }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </template>
  </el-sub-menu>
</template>
<script>
import { defineComponent, toRefs } from "vue";
export default defineComponent({
  name: "SiderMenu",
  props: {
    data: {
      type: Object,
    },
  },
  setup(props) {
    const { data } = toRefs(props);
    return {
      data,
    };
  },
});
</script>
<style scoped lang="scss"></style>
