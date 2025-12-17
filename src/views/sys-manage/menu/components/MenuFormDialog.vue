<script setup lang="ts">
import type { FormRules } from 'element-plus'
import type { CreateMenuDto, MenuDto } from '@/apis/menu'
import { useForm } from '@/hooks/useForm'
import { useReqRoles } from '../../role/hooks'
import { useReqMenu } from '../hooks'
import { Delete, Plus, QuestionFilled } from '@element-plus/icons-vue'
import { MenuIcon } from '@/assets/icons'
import routerMapList from '@/imported-routes-map-map'
import { buildRouteTree } from '../helper'

interface Props {
  menuList: MenuDto[]
}

const { menuList = [] } = defineProps<Props>()

// 菜单路径列表
const menuPathTreeData = buildRouteTree(Object.keys(routerMapList))

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

// 2. 字段映射配置：告诉组件你的字段对应关系
const treeSelectProps = ref({
  label: 'title', // 组件显示的文本 → 你的 title 字段
  children: 'children', // 子节点字段 → 你的 children 字段（如果字段名不同，这里改）
  disabled: (node: any) => {
    // 自定义禁用逻辑：disabled 为 true 或 enabled 为 0 时禁用
    return node.disabled || node.enabled === 0
  }
})

defineExpose({
  open,
  close,
  openEdit
})
</script>

<template>
  <el-dialog v-model="visible" title="新增菜单" :width="600" @close="handleClose">
    <template #title>
      <div>
        <span>新增菜单</span>
        <el-popover :width="1000" trigger="click">
          <template #reference>
            <el-icon class="text-warning cursor-pointer"><question-filled /></el-icon>
          </template>
          <template #default>
            <div class="h-160 overflow-y-auto p-5">
              <p class="text-dark mb-3">
                前端会通过一个脚本(scripts/auto-import-routes.js)，会生成一个路由映射的文件（src/imported-routes-map-map.ts）,例如：
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
      </div>
    </template>

    <div v-if="visible">
      <el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
        <el-form-item prop="parentId" label="父级菜单">
          <el-tree-select
            placeholder="请选择"
            v-model="form.parentId"
            :data="menuList"
            node-key="id"
            value-id="title"
            :render-after-expand="false"
            style="width: 100%"
            clearable
            :treeSelectProps="treeSelectProps"
            :props="{
              label: 'title'
            }"
          />
        </el-form-item>
        <el-form-item prop="title" label="菜单名称">
          <el-input v-model="form.title" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="path" label="路由路径">
          <el-tree-select
            placeholder="请选择"
            v-model="form.path"
            :data="menuPathTreeData"
            :render-after-expand="false"
            style="width: 100%"
            clearable
          />
        </el-form-item>
        <el-form-item prop="icon" label="图标">
          <el-popover :width="360">
            <template #reference>
              <el-input class="w-full" v-model="form.icon" clearable />
            </template>
            <el-space :size="20" :wrap="true" class="px-2 py-3">
              <div
                class="hover:text-primary cursor-pointer"
                :class="{ 'text-primary': form.icon === icon }"
                v-for="icon in MenuIcon"
                :key="icon"
                @click="form.icon = icon"
              >
                <svg-icon size="30" :name="icon" />
              </div>
            </el-space>
          </el-popover>
        </el-form-item>
        <el-form-item prop="order" label="排序">
          <el-space>
            <el-input-number v-model="form.order" />
            <span class="text-12px">序号越大越靠前</span>
          </el-space>
        </el-form-item>
        <el-form-item prop="hidden" label="是否隐藏">
          <el-radio-group v-model="form.hidden">
            <el-radio :value="true">是</el-radio>
            <el-radio :value="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="isLogin" label="登录验证">
          <el-radio-group v-model="form.isLogin">
            <el-radio :value="true">是</el-radio>
            <el-radio :value="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="keepAlive" label="是否缓存">
          <el-radio-group v-model="form.keepAlive">
            <el-radio :value="true">是</el-radio>
            <el-radio :value="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="disabled" label="禁止点击">
          <el-radio-group v-model="form.disabled">
            <el-radio :value="true">是</el-radio>
            <el-radio :value="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="enabled" label="状态">
          <el-switch v-model="form.enabled" :active-value="1" :inactive-value="0"></el-switch>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>
