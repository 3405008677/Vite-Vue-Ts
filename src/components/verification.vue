<template>
  <div>
    <canvas id="v-canvas" :width="contentWidth" :height="contentHeight"></canvas>
  </div>
</template>

<script setup>
import { watch } from 'vue'

const props = defineProps({
  identifyCode: {
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
  },
  drawText = (ctx, txt, i) => {
    // 随机生成字体颜色
    ctx.fillStyle = randomColor(50, 160)
    // 随机生成字体大小
    ctx.font = randomNum(props.fontSizeMin, props.fontSizeMax)
    let x = (i + 1) * (props.contentWidth / (props.idenifyCode.length + 1)),
      y = randomNum(props.fontSizeMax, props.contentHeight - 5),
      deg = randomNum(-30, 30)
    ctx.translate(x, y)
    ctx.rotate((deg * Math.PI) / 180)
    ctx.fillText(txt, 0, 0)
    // 恢复坐标原点和旋转角度
    ctx.rotate((-deg * Math.PI) / 180)
    ctx.translate(-x, -y)
  },
  drawLine = ctx => {
    // 绘制干扰线
    for (let i = 0; i < 4; i++) {
      ctx.strokeStyle = randomColor(100, 200)
      ctx.beginPath()
      ctx.moveTo(randomNum(0, props.contentWidth), randomNum(0, props.contentHeight))
      ctx.lineTo(randomNum(0, props.contentWidth), randomNum(0, props.contentHeight))
      ctx.stroke()
    }
  },
  //
  drawPic = () => {
    let canvas = document.getElementById('v-canvas')
    let ctx = canvas.getContext('2d')
    ctx.textBaseline = 'bottom'
    // 绘制背景
    ctx.fillStyle = '#e6ecfd'
    ctx.fillRect(0, 0, props.contentWidth, props.contentHeight)
    // 绘制文字
    for (let i = 0; i < props.idenifyCode; i++) {
      drawText(ctx, props.idenifyCode[i], i)
    }
    drawLine(ctx)
    drawDot(ctx)
  }
watch(
  () => props.identifyCode,
  (newV, oldV) => {
    drawPic()
  }
)
drawPic()
</script>
