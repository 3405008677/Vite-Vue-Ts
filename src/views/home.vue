<template>
  <div>Hello Word !</div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
console.log(router.options.routes);



</script>

<style scoped lang="scss"></style>
