<template>
  <div>
    <canvas id="v-canvas" :width="Width" :height="Height"></canvas>
  </div>
</template>

<script setup>
const props = defineProps({
  idenifyCode: {
    // 默认注册码
    type: String,
    default: '1234'
  },
  fontSizeMin: {
    // 字体最小值
    type: Number,
    default: 25
  },
  fontSizeMax: {
    // 字体最大值
    type: Number,
    default: 25
  },
  backgroundColorMin: {
    // 验证码图片背景色最小值
    type: Number,
    default: 200
  },
  backgroundColorMax: {
    // 验证码图片背景色最大值
    type: Number,
    default: 220
  },
  dotColorMin: {
    // 背景干扰点最小值
    type: Number,
    default: 60
  },
  dotColorMax: {
    // 背景干扰点最大值
    type: Number,
    default: 120
  },
  contentWidth: {
    // 容器宽度
    type: Number,
    default: 90
  },
  contentHeight: {
    // 容器高度
    type: Number,
    default: 38
  }
})
// 生成一个随机数
const randomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
  },
  // 生成一个随机颜色
  randomColor = (min, max) => {
    let r = randomNum(min, max),
      g = randomNum(min, max),
      b = randomNum(min, max)
    return `rgb(${r},${g},${b})`
  }
  // 
</script>
