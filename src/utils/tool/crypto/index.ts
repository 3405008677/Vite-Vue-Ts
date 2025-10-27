import CryptoJS from 'crypto-js' //支持MD5、SHA1、SHA2、SHA3、RIPEMD-160加密，AES、DES、Rabbit、RC4、RC4Drop、TripleDES加解密
import storage from '@/utils/core/storage'

export function Encrypt(word: string) {
  // 加密 入参：JSON字符串
  const cmc = storage.localStorage.get('LOGIN-CMC')
  let newCmc = cmc.split('').reverse().join('')

  // console.log('-----', cmc, newCmc)

  let key = CryptoJS.enc.Utf8.parse(newCmc.slice(0, 16)) // 十六位十六进制数作为密钥
  const iv = CryptoJS.enc.Utf8.parse(newCmc.slice(-16)) // 十六位十六进制数作为密钥偏移量

  let srcs = CryptoJS.enc.Utf8.parse(word)
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
    // 注意这里的Pkcs7格式，这里是有其他格式的具体还是看后台使用的是什么格式
    // 如果格式和后端不一致，加密后的内容会和后端不一致
  })
  return encrypted.toString()
}

export function Decrypt(word: string) {
  // 解密
  const cmc = storage.localStorage.get('LOGIN-CMC')
  let newCmc = cmc.split('').reverse().join('')

  let key = CryptoJS.enc.Utf8.parse(newCmc.slice(0, 16)) // 十六位十六进制数作为密钥
  const iv = CryptoJS.enc.Utf8.parse(newCmc.slice(-16)) // 十六位十六进制数作为密钥偏移量

  let decrypt = CryptoJS.AES.decrypt(word, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
    // 注意这里的Pkcs7格式，这里是有其他格式的具体还是看后台使用的是什么格式
    // 如果格式和后端不一致，解密出来无法转成JSON格式或者根本解不出来
  })
  return decrypt.toString(CryptoJS.enc.Utf8)
}
