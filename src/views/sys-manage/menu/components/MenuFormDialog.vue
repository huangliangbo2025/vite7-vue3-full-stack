<script setup lang="ts">
import type { FormRules } from 'element-plus'
import type { CreateMenuDto } from '@/apis/menu'
import { useForm } from '@/hooks/useForm'
import { useReqRoles } from '../../role/hooks'
import { useReqMenu } from '../hooks'
import { QuestionFilled } from '@element-plus/icons-vue'

const visible = ref(false)

const initializeForm: CreateMenuDto = {
  title: '',
  path: '',
  icon: '',
  order: 0,
  keepAlive: false,
  hidden: false,
  isLogin: true,
  disabled: false,
  permissions: [],
  enabled: 1
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
  <el-dialog v-model="visible" title="新增菜单" :width="720" @close="handleClose">
    <template #title>
      <h3>
        <span>新增菜单</span>
        <el-popover :width="1000" trigger="hover">
          <template #reference>
            <el-icon class="text-warning cursor-pointer"><question-filled /></el-icon>
          </template>
          <template #default>
            <div class="overflow-y-auto p-5">
              <p class="text-dark mb-3">
                前端会通过一个脚本，会生成一个路由映射的文件（src/router-map）,例如：
              </p>
              <p class="mb-3">
                <HighlightCode
                  :language="'javascript'"
                  :code="`// 每次新增路由，都应当运行一下pnpm dev触发路由生成脚本
export default { 
    '/dashboard': import('@/views/dashboard/index.vue'),
    '/sys-manage/user': import('@/views/sys-manage/user/index.vue'),
    '/sys-manage/menu': import('@/views/sys-manage/user/index.vue'),
    '/sys-manage/user/:id': import('@/views/sys-manage/user/:id/index.vue'),
}
// ==========  生成路由 =========
// 注意, 这里不在设置name 和redirect, 因为大多数项目,这个值都非必须
// 如果需要Name值通过/sys-manage/menu去转换
// 你的菜单路径必须是/dashboard、/sys-manage/user等值
[{
  path: '/dashboard',
  component: Layout,  // 如果没有父级路由,就自动添加
  children: [{
    path: '',
    component: import('@/views/dashboard/index.vue'),
    meta: {
      fullPath: '/dashboard',
      ....
    }
  }]
},
{
  path: '/sys-manage',
  component: Layout,
  children: [{
    path: 'user',
    ....
  }]
}
]
`"
                >
                </HighlightCode>
              </p>
            </div>
          </template>
        </el-popover>
      </h3>
    </template>

    <div v-if="visible">
      <el-form ref="formRef" :model="form" :rules="rules" label-width="auto" label-position="top">
        <el-form-item prop="parentId" label="父级菜单">
          <el-input v-model="form.parentId" />
        </el-form-item>
        <el-form-item prop="path" label="菜单路径（和前端路径要匹配）">
          <el-input v-model="form.path" />
        </el-form-item>
        <el-form-item prop="title" label="菜单名称">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="icon" label="图标" label-position="right"> </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="order" label="排序" label-position="right">
              <el-input-number v-model="form.order" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item
              prop="hidden"
              label="是否隐藏（在菜单栏中将不会展示）"
              label-position="right"
            >
              <el-checkbox v-model="form.hidden" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="isLogin" label="是否需要登录验证" label-position="right">
              <el-checkbox v-model="form.isLogin" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item
          prop="permissions"
          label="权限(按钮的话，配合v-permission使用，接口的话，根据需求修改axios的封装)"
        >
          <!-- <el-input v-model="form.permissions" /> -->
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>
