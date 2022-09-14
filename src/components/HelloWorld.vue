<template>
  <div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { userStore } from '@/store'

const props = defineProps({
  msg: String
})
const count = ref(0)

console.log(userStore.counter, props.msg)
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
