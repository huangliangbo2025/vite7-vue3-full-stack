<script setup lang="ts">
import { Iphone, Message } from '@element-plus/icons-vue'
import { validatePhone } from '@/utils/form-validate'
// const userStore = useUserStore()

const loading = ref(false)
const formRef = useTemplateRef('formRef')
const form = reactive({
  phone: '',
  code: ''
})
const rules = reactive({
  phone: [{ validator: validatePhone, trigger: 'blur' }],
  code: [
    {
      required: true,
      message: '验证码不能为空',
      trigger: 'blur'
    }
  ]
})

const onSubmit = async () => {
  await formRef.value?.validate(async (valid: boolean, fields: any) => {
    if (valid) {
      console.log('submit!')
      loading.value = true
      /* userStore.login(toRaw(form)).then(() => {
        loading.value = false
        const { redirect, ...query } = route.query
        router.push({ path: (redirect as string) || '/', query })
      }) */
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<template>
  <el-form ref="formRef" class="login-form-box" :model="form" :rules="rules">
    <el-form-item name="phone">
      <el-input v-model.trim="form.phone" v-number:11 placeholder="请输入手机号" size="large">
        <template #prefix>
          <el-icon class="text-20px">
            <Iphone />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item name="code">
      <el-input v-model.trim="form.code" size="large" placeholder="请输入验证码">
        <template #prefix>
          <el-icon class="text-20px">
            <Message />
          </el-icon>
        </template>
        <template #suffix>
          <Countdown />
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button class="login-btn" type="primary" :loading="loading" @click.prevent="onSubmit">
        登录
      </el-button>
    </el-form-item>
  </el-form>
</template>
