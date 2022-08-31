<template>
  <div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { user } from '@/store'

let userStare = user()

const props = defineProps({
  msg: String
})
const count = ref(0)

console.log(userStare.counter, props.msg)
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
