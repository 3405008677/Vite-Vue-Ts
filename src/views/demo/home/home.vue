<template>
  <div>Hello Home !</div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
console.log(router.options.routes[0].children);
</script>

<style scoped lang="scss"></style>
