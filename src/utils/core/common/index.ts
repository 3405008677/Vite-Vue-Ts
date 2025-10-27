import { v4 as uuidv4 } from 'uuid'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

/**
 * 树状结构转扁平数据
 * @param tree 树状结构
 * @returns
 */
export const flattenTree = (tree: any[]) => {
  const result: any = tree.reduce((callbackfn: any[], item: any) => {
    const { children, ...res } = item
    const arr = children && children.length > 0 ? flattenTree(children) : []
    return callbackfn.concat(res, ...arr)
  }, [])
  return result
}

export function guid() {
  const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  return `${S4() + S4()}-${S4()}-${S4()}-${S4()}-${S4() + S4() + S4()}`
}

/**
 *  创建一个 uuid 唯一标识
 */
// import { copyValue } from "@/utils/core/common/"
export function getuuid() {
  return uuidv4().replaceAll('-', '')
}

/**
 * 复制 弹窗
 */
// import { copyValue } from "@/utils/core/common/"
export async function copyValue(text: any) {
  try {
    const textarea = document.createElement('textarea')
    textarea.value = text
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
    // ElMessage.success(t('communal.copySuccess.text', '复制成功'))
    ElMessage.success('复制成功')
  } catch (err) {
    // ElMessage.warning(t('communal.copySuccess.text', '复制失败'))
    ElMessage.warning('复制失败')
  }
}
