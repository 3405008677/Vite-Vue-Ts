import { ElMessage, ElMessageBox } from 'element-plus'
import i18n from '@/i18n'

// 提示方法
export const hintFun = {
  del: (selectData: any[] | string, func: () => void) => {
    const t = i18n.global.t
    if (!selectData || !selectData.length) {
      ElMessage.warning(t('commonresource.leastReminder.key', '最少勾选一条数据'))
    } else {
      let message = t('commonresource.delPrompt.key', '确定删除此项？')
      if (typeof selectData === 'string') {
        message = t('commonresource.deleteThisItem.key', '确定删除此项吗？')
      }
      ElMessageBox.confirm(message, t('commonresource.prompt.key', '提示'), {
        confirmButtonText: t('commonresource.determine.key', '确认'),
        cancelButtonText: t('commonresource.cancel.key', '取消'),
        type: 'error',
      })
        .then(() => {
          func()
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
}

export default { hintFun }
