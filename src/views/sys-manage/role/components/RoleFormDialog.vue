<script setup lang="ts">
import type { FormRules } from 'element-plus'
import { useForm } from '@/hooks/useForm'
import { useReqRoles } from '../hooks'
import type { CreateRoleDto } from '@/apis/role'

const visible = ref(false)
const id = ref<number>()
// 表单数据
const form = ref<Partial<CreateRoleDto>>({
  name: '',
  code: '',
  desc: '',
  permissions: [],
  menuIds: []
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
  ],
  code: [
    { required: true, message: '请输入唯一标识码', trigger: 'blur' },
    { min: 2, max: 20, message: 'code长度在 2 到 50 个字符', trigger: 'blur' }
  ]
}

const open = () => {
  visible.value = true
}

const openEdit = async (v: any) => {
  const { id: _id, ...reset } = v
  visible.value = true
  await nextTick()
  id.value = _id
  Object.assign(form.value, reset)
}

const handleClose = () => {
  visible.value = false
  id.value = undefined
  resetForm()
}

const onSubmit = async () => {
  await validateForm()
  mutate({ ...form.value, id: id.value } as CreateRoleDto)
}

defineExpose({
  open,
  close,
  openEdit
})
</script>

<template>
  <el-dialog
    v-model="visible"
    :title="id ? '编辑角色' : '添加新角色'"
    :width="600"
    @close="handleClose"
  >
    <div>
      <el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
        <el-form-item prop="name" label="角色名称">
          <el-input v-model="form.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="code" label="角色标识码">
          <el-input v-model="form.code" placeholder="值必须唯一" />
        </el-form-item>
        <el-form-item prop="desc" label="描述">
          <el-input v-model="form.desc" placeholder="描述" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" :loading="isPending" @click="onSubmit">确定</el-button>
    </template>
  </el-dialog>
</template>
