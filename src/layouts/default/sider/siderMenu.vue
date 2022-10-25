<template>
  <el-sub-menu>
    <template #title>
      <span>{{ data.meta.title || "" }}</span>
    </template>
    {{ data }}
    <template v-for="item in data" :key="item.path">
      <SiderMenu v-if="item.children" :data="item" />
      <el-menu-item-group v-else>
        <el-menu-item :index="item.path">
          <span>{{ item.meta.title || "" }}</span>
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
      type: Array,
    },
  },
  setup(props) {
    const { data } = toRefs(props);
    console.log(data.value, "123");
    return {
      data,
    };
  },
});
</script>
<style scoped lang="scss"></style>
