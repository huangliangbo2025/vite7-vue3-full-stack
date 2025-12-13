<script setup lang="ts">
import type { FormRules } from 'element-plus'
import type { CreateMenuDto } from '@/apis/menu'
import { useForm } from '@/hooks/useForm'
import { useReqRoles } from '../../role/hooks'
import { useReqMenu } from '../hooks'

const visible = ref(false)

const initializeForm: CreateMenuDto = {
  menuname: '',
  password: '',
  role: '',
  nickname: '',
  status: 1,
  remark: ''
}
// 表单数据
const form = ref<CreateMenuDto>({ ...initializeForm })

const { createMenuMutation, updateMenuMutation } = useReqMenu({
  handleSuccess() {
    close()
    handleClose()
  }
})

const { roleList } = useReqRoles()

const { formRef, validateForm } = useForm()

const isLoading = computed(
  () => updateMenuMutation.isPending.value || createMenuMutation.isPending.value
)

const mutate = (form: CreateMenuDto) =>
  form.id ? updateMenuMutation.mutate(form) : createMenuMutation.mutate(form)

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
  <el-dialog v-model="visible" title="用户资料" :width="720" @close="handleClose">
    <div v-if="visible">
      <el-form ref="formRef" :model="form" :rules="rules" label-width="auto" label-position="top">
        <el-form-item prop="menuname" label="账号">
          <el-input v-model="form.menuname" />
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="form.password" />
        </el-form-item>
        <el-form-item prop="role" label="选择角色">
          <el-select v-model="form.role" :disabled="form.id">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="nickname" label="昵称(分流/操作时 访问控制显示的名字)">
          <el-input v-model="form.nickname" />
        </el-form-item>
        <el-form-item prop="status" label="用户状态">
          <el-select v-model="form.status">
            <el-option :value="1" label="启用" />
            <el-option :value="0" label="停用" />
          </el-select>
        </el-form-item>

        <el-form-item label=" ">
          <el-button :loading="isLoading" class="w-full" type="primary" @click="onSubmit">
            提交
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>
