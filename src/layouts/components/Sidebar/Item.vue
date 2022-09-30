<template>
  <div>
    <i :class="icon"></i>
    <span slot="title">{{ title }}</span>
  </div>
</template>

<script setup name="MenuItem">
import { ref } from "vue";
const props = {
  icon: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
};
</script>
<style scoped lang="scss"></style>
