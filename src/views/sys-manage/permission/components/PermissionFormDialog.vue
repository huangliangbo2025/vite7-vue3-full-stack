<script setup lang="ts">
import type { FormRules } from 'element-plus'
import type { CreatePermissionDto, PermissionDto } from '@/apis/permission'
import { useForm } from '@/hooks/useForm'
import { useReqPermission } from '../hooks'

const visible = ref(false)

const initializeForm: CreatePermissionDto = {
  id: undefined,
  name: '',
  code: '',
  description: ''
}
// 表单数据
const form = ref<CreatePermissionDto>({ ...initializeForm })

const { createPermissionMutation, updatePermissionMutation } = useReqPermission({
  handleSuccess() {
    close()
    handleClose()
  }
})

const { formRef, validateForm } = useForm()

const isLoading = computed(
  () => updatePermissionMutation.isPending.value || createPermissionMutation.isPending.value
)

const mutate = (form: CreatePermissionDto) =>
  form.id ? updatePermissionMutation.mutate(form) : createPermissionMutation.mutate(form)

// 表单验证规则
const rules: FormRules = {
  name: [
    { required: true, message: '请输入权限名称', trigger: 'blur' },
    { min: 2, max: 20, message: '权限名称长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '请输入权限标识码', trigger: 'blur' },
    { min: 2, max: 50, message: '权限标识码长度在 2 到 50 个字符', trigger: 'blur' }
  ]
}

const open = () => {
  visible.value = true
}

const openEdit = (v: any) => {
  visible.value = true
  form.value = v
}

const close = () => {
  visible.value = false
}

const handleClose = () => {
  form.value = { ...initializeForm }
  close()
}

const onSubmit = async () => {
  await validateForm()
  mutate({ ...form.value })
}

defineExpose({
  open,
  close,
  openEdit
})
</script>

<template>
  <el-dialog v-model="visible" title="新增权限" :width="600" @close="handleClose">
    <div v-if="visible">
      <el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
        <el-form-item prop="name" label="权限名称">
          <el-input v-model="form.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="code" label="权限标识码">
          <el-input v-model="form.code" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="description" label="权限备注">
          <el-input v-model="form.description" placeholder="请输入" />
        </el-form-item>
      </el-form>
    </div>

    <template #footer>
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" :loading="isLoading" @click="onSubmit">确 定</el-button>
    </template>
  </el-dialog>
</template>
