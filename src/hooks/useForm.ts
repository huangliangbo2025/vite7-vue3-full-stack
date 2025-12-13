import type { FormInstance } from 'element-plus'

export const useForm = () => {
  const formRef = ref<FormInstance>()

  const validateForm = async () => {
    return new Promise((resolve, reject) => {
      if (!formRef.value)
        return reject(new Error('form 实例未定义'))

      formRef.value.validate((valid, fields) => {
        if (valid) {
          console.log('submit!')
          resolve(null)
        } else {
          console.log('error submit!', fields)
          reject(fields)
        }
      })
    })
  }

  const resetForm = () => {
    if (!formRef.value)
      return

    formRef.value.resetFields()
  }

  return {
    formRef,
    validateForm,
    resetForm,
  }
}
