<script setup lang="ts">
import type { FormRules } from 'element-plus'
import { useForm } from '@/hooks/useForm'
import { useReqRoles } from '../hooks'

const visible = ref(false)
// 表单数据
const form = ref({
  name: ''
})

const { isPending, mutate } = useReqRoles({
  handleSuccess() {
    close()
    handleClose()
  }
})
const { formRef, validateForm, resetForm } = useForm()

// 表单验证规则
const rules: FormRules = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, max: 20, message: '姓名长度在 2 到 20 个字符', trigger: 'blur' }
  ]
}

const open = () => {
  visible.value = true
}

const openEdit = (v: any) => {
  visible.value = true
  Object.assign(form, v)
}

const isOnlyView = ref(false)
const openDetail = (v: any) => {
  visible.value = true
  isOnlyView.value = true
  Object.assign(form, v)
}

const close = () => {
  visible.value = false
}

const handleClose = () => {
  isOnlyView.value = false
  resetForm()
  close()
}

const onSubmit = async () => {
  await validateForm()
  mutate({ ...form.value })
}

defineExpose({
  open,
  close,
  openEdit,
  openDetail
})
</script>

<template>
  <el-dialog v-model="visible" title="添加新角色" :width="720" @close="handleClose">
    <div v-if="visible" class="h-60vh overflow-auto">
      <p class="text-#919191 mb-20px">
        设置角色权限时：有 (功能) 提示的为菜单内的功能，否则为菜单，如果未勾选菜单，界面将不展示；
      </p>
      <div>
        <el-form
          ref="formRef"
          :model="form"
          :rules="rules"
          label-width="auto"
          :disabled="isOnlyView"
        >
          <el-form-item prop="name" label="角色名称">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label=" ">
            <el-button :loading="isPending" class="w-full" type="primary" @click="onSubmit">
              提交
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-dialog>
</template>
