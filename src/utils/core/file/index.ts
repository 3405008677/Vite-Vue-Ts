import { ElMessage } from 'element-plus'

/**
 * 这个是下载图片 解决跨域  imgsrc 文件全路径
 * @param imgsrc
 * @param name 文件名
 */
export function downloadIamge(imgsrc: string, name: string) {
  // 下载图片地址和图片名
  let image = new Image()
  // 解决跨域 Canvas 污染问题
  image.setAttribute('crossOrigin', 'anonymous')
  image.onload = function () {
    let canvas = document.createElement('canvas')
    canvas.width = image.width
    canvas.height = image.height
    let context = canvas.getContext('2d')
    if (context) {
      context.drawImage(image, 0, 0, image.width, image.height)
      let url = canvas.toDataURL('image/png') // 得到图片的base64编码数据

      let a = document.createElement('a') // 生成一个a元素
      let event = new MouseEvent('click') // 创建一个单击事件
      a.download = name || 'photo' // 设置图片名称
      a.href = url // 将生成的URL设置为a.href属性
      a.dispatchEvent(event) // 触发a的单击事件
      document.body.removeChild(a)
    }
    document.body.removeChild(canvas)
  }
  image.src = imgsrc
}

/**
 * 下载文件
 * @param data
 * @param fileName
 * @param isStream
 */
// import {download} from "@/utils/core/file/index"
export function download(data: BlobPart, fileName: string, isStream: boolean) {
  try {
    const type = isStream
      ? 'application/octet-stream' // 二进制流
      : // ? 'application/x-zip-compressed'
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // Excel MIME 类型
    // 确保数据格式正确
    const blob = new Blob([data], { type })

    const nav = window.navigator as any
    if (nav.msSaveOrOpenBlob) {
      nav.msSaveOrOpenBlob(blob, fileName)
    } else {
      const objectUrl = URL.createObjectURL(blob)
      const a = document.createElement('a')
      document.body.appendChild(a)
      a.style.display = 'none'
      a.href = objectUrl
      a.download = fileName
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(objectUrl)
    }
  } catch (err) {
    ElMessage.error('下载失败')
  }
}

/**
 * 路径下载
 * @param url
 * @param filename
 */
export function urlDownload(url: string, filename: string) {
  const elelink = document.createElement('a')
  elelink.target = '_blank'
  elelink.href = url
  elelink.download = filename
  elelink.click()
  elelink.remove()
}

export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(blob) // 读取 Blob 并转换为 Base64
    reader.onload = () => resolve(reader.result as string) // 结果返回 Base64
    reader.onerror = (error) => reject(error)
  })
}

/**
 * 下载 base64 文件
 * @param base64String
 * @param title
 */
export function base64Download(base64String: string, title: string) {
  // 将 Base64 转换为二进制数据
  const byteCharacters = atob(base64String.replace(/-/g, '+').replace(/_/g, '/'))
  const byteNumbers = new Array(byteCharacters.length)
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }
  const byteArray = new Uint8Array(byteNumbers)
  const blob = new Blob([byteArray], { type: 'application/zip' })
  // 创建下载链接
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = title
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(link.href)
}

/**
 * base64 下载 zip 格式文件
 * @param base64Data
 */
// import {downloadZip} from "@/utils/core/file/index"
export function downloadZip(base64Data: any, name: string) {
  // 将 Base64 数据解码为二进制数据
  const binaryData = atob(base64Data)

  // 将二进制数据转换为字节数组
  const byteNumbers = new Uint8Array(binaryData.length)
  for (let i = 0; i < binaryData.length; i++) {
    byteNumbers[i] = binaryData.charCodeAt(i)
  }

  // 创建 Blob 对象
  const blob = new Blob([byteNumbers], { type: 'application/zip' })
  // 动态创建 <a> 标签，用于下载文件
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = name + '.zip' // 下载文件的默认名称

  // 自动触发点击事件
  document.body.appendChild(link)
  link.click()

  // 清理动态创建的链接
  URL.revokeObjectURL(link.href)
  document.body.removeChild(link)
}

/**
 * 计算文件的 SHA-256 哈希值
 * @param file 文件对象
 * @returns Promise<string> 返回十六进制哈希字符串
 */
// import { calculateFileSHA256 } from '@/utils/core/file/index'
export function calculateFileSHA256(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!window.crypto || !window.crypto.subtle) {
      return reject('当前环境不支持 Web Crypto API')
      // 提示用户切换到HTTPS或现代浏览器
    }

    const reader = new FileReader()

    reader.onload = async (e) => {
      try {
        const arrayBuffer = e.target?.result as ArrayBuffer
        const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer)
        const hashArray = Array.from(new Uint8Array(hashBuffer))
        const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
        resolve(hashHex)
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = () => reject(reader.error)
    reader.readAsArrayBuffer(file)
  })
}
