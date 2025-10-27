/**
 * 验证表单
 */
export function validateForm(formRef: any): Promise<boolean> {
  return new Promise((resolve) => {
    formRef.validate((result: boolean) => {
      resolve(result)
    })
  })
}

/**
 * 验证指定字段
 */
export function validateField(formRef: any, field: string): Promise<boolean> {
  return new Promise((resolve) => {
    formRef.validateField(field, (valid: boolean) => {
      resolve(valid)
    })
  })
}

/**
 * 清除表单验证结果
 */
export function clearValidation(formRef: any): void {
  formRef.clearValidate()
}

/**
 * 重置表单（清空值和验证）
 */
export function resetForm(formRef: any): void {
  formRef.resetFields()
}

export default {
  validateForm,
  validateField,
  clearValidation,
  resetForm,
}

