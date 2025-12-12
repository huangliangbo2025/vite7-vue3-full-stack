<script setup lang="ts">
import { Hide, Lock, Message, User, View } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useReqRegister } from '../hooks/useReqRegister'

const passVisible = ref(false)
const formRef = useTemplateRef('formRef')

const form = reactive({
  username: '',
  password: '',
  nickname: ''
})
const rules = reactive({
  username: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur'
    }
  ],
  nickname: [
    {
      required: true,
      message: '昵称不能为空',
      trigger: 'blur'
    }
  ]
})

const passInputType = computed(() => (passVisible.value ? 'text' : 'password'))
// 密码查看切换
const passVisibleToggleClick = () => {
  passVisible.value = !passVisible.value
}

const { registerMutation } = useReqRegister()
const { isPending, mutate } = registerMutation

const onSubmit = async () => {
  await formRef.value?.validate(async (valid: boolean, fields: any) => {
    if (valid) {
      mutate({ ...toRaw(form) })
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<template>
  <el-form
    ref="formRef"
    class="register-form-box"
    :model="form"
    :rules="rules"
    label-position="top"
  >
    <el-form-item prop="username" label="用户名">
      <el-input
        v-model.trim="form.username"
        placeholder="请输入用户名"
        size="large"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item prop="password" label="密码">
      <el-input
        v-model.trim="form.password"
        :type="passInputType"
        placeholder="请输入密码"
        size="large"
        autocomplete="new-password"
      >
        <template #suffix>
          <el-icon class="text-20px block cursor-pointer" @click="passVisibleToggleClick">
            <Hide v-if="passVisible" />
            <View v-else />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="nickname" label="昵称">
      <el-input v-model.trim="form.nickname" placeholder="请输入用户名" size="large" />
    </el-form-item>
    <el-form-item>
      <el-button
        class="register-btn"
        type="primary"
        size="large"
        :loading="isPending"
        @click.prevent="onSubmit"
      >
        注册
      </el-button>
    </el-form-item>
  </el-form>
</template>
