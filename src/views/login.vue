<template>
  <p>Login</p>
  <el-button type="primary" @click="one()">Primary</el-button>
</template>

<script setup>
const one = () => {
  // document.documentElement 是全局变量时
  const el = document.documentElement
  // const el = document.getElementById('xxx')
  console.log(el)
  // 获取 css 变量
  getComputedStyle(el).getPropertyValue(`--el-color-primary`)
  // 设置 css 变量
  el.style.setProperty('--el-color-primary', 'red')
}
</script>

<style scoped lang="scss">
.login {
  @for $i from 1 through 4 {
    .login-animation#{$i} {
      opacity: 0; //透明度
      animation-name: upTop; //动画名称
      animation-duration: 0.5s; //动画时长
      animation-fill-mode: forwards; //动画播放完成后保持最后样式
      animation-delay: calc($i/10) + s; //等待n秒后执行
    }
  }
}
</style>
