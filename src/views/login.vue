<template></template>

<script setup></script>

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
