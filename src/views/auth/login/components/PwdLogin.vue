<script setup lang="ts">
import { Hide, Lock, Message, User, View } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { pick } from 'lodash-es'
import { useReqLogin } from '../hooks/useReqLogin'

const passVisible = ref(false)
const formRef = useTemplateRef('formRef')
const validateRef = useTemplateRef('validateRef')

const form = reactive({
  username: import.meta.env.VITE_ACCOUNT || '',
  password: import.meta.env.VITE_PASSWORD || '',
  code: ''
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
  code: [
    {
      required: true,
      message: '验证码不能为空',
      trigger: 'blur'
    }
  ]
})

const passInputType = computed(() => (passVisible.value ? 'text' : 'password'))
// 密码查看切换
const passVisibleToggleClick = () => {
  passVisible.value = !passVisible.value
}

const { loginMutation } = useReqLogin()
const { isPending, mutate } = loginMutation
const isProd = import.meta.env.PROD

const onSubmit = async () => {
  await formRef.value?.validate(async (valid: boolean, fields: any) => {
    if (valid) {
      // 开发环境下不需要验证
      if (isProd && !validateRef.value!.validate(form.code)) {
        ElMessage.warning('验证码不正确')
        validateRef.value?.refresh()
        return
      }

      mutate(pick(form, ['username', 'password']))
    } else {
      console.log('error submit!', fields)
    }
  })
}

const onEnter = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.keyCode === 13) {
    // 触发登录
    onSubmit()
  }
}

document.addEventListener('keydown', onEnter)

onUnmounted(() => {
  document.removeEventListener('keydown', onEnter)
})
</script>

<template>
  <el-form ref="formRef" class="login-form-box" :model="form" :rules="rules">
    <el-form-item prop="username">
      <el-input
        v-model.trim="form.username"
        placeholder="请输入用户名"
        size="large"
        autocomplete="off"
      >
        <template #prefix>
          <el-icon class="text-16px">
            <User />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model.trim="form.password"
        :type="passInputType"
        placeholder="请输入密码"
        autocomplete="new-password"
        size="large"
      >
        <template #prefix>
          <el-icon class="text-20px">
            <Lock />
          </el-icon>
        </template>
        <template #suffix>
          <el-icon class="text-20px block cursor-pointer" @click="passVisibleToggleClick">
            <Hide v-if="passVisible" />
            <View v-else />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="code">
      <el-input v-model.trim="form.code" size="large" placeholder="请输入验证码">
        <template #prefix>
          <el-icon class="text-20px">
            <Message />
          </el-icon>
        </template>
        <template #suffix>
          <div
            class="bottom-1px right-1px top-1px absolute overflow-hidden bg-[rgba(115,103,240,0.3)]"
          >
            <Captcha ref="validateRef" :height="46" :width="150" :show-border="false" />
          </div>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button class="login-btn" type="primary" :loading="isPending" @click.prevent="onSubmit">
        登录
      </el-button>
    </el-form-item>
  </el-form>
</template>
