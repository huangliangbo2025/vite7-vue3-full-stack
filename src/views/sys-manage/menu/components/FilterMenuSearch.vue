<script setup lang="ts">
const emit = defineEmits<{
  (e: 'search', params: any): void
}>()

// 表单数据
const form = reactive({
  status: '',
  username: ''
})

const onSubmit = async () => {
  emit('search', { ...toRaw(form) })
}
</script>

<template>
  <el-form inline label-position="top">
    <el-form-item prop="status" label="用户状态">
      <el-select v-model="form.status" placeholder="请选择" class="!w-50">
        <el-option label="启用" value="1" />
        <el-option label="停用" value="0" />
      </el-select>
    </el-form-item>
    <el-form-item prop="username" label="账号">
      <el-input v-model="form.username" class="!w-50" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="">
      <div class="!pt-7">
        <el-button class="w-full" type="primary" @click="onSubmit"> 搜索 </el-button>
      </div>
    </el-form-item>
  </el-form>
</template>
