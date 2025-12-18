<script setup lang="ts">
import { useReqMenu } from '../../menu/hooks'
import type { MenuDto } from '@/apis/menu'

const visible = ref(false)
const permissions = ref<string[]>([])
const menuIds = ref<string[]>(['menu_1001', 'menu_2002', 'menu_2003'])
const tableRef = useTemplateRef('tableRef')

const { queryMenuList, menuList } = useReqMenu()
const { isFetching } = queryMenuList

// =============  选中菜单变更   ======================

const handleSelectionChange = (menus: MenuDto[]) => {
  menuIds.value = menus.map((item) => item.id)
}

// =============== 选中权限操作按钮变更  ======================

const onPermissionChange = (isTrue: boolean, code: string) => {
  if (isTrue && code) {
    if (!permissions.value.includes(code)) permissions.value.push(code)
  } else if (!isTrue && code) {
    permissions.value = permissions.value.filter((p) => p !== code)
  }
  console.log(isTrue, code)
}

// ===================  编辑时，菜单勾选框状态回显  ============================
const selectedRows: MenuDto[] = []

const collectSelectedRows = (rows: MenuDto[]) => {
  rows.forEach((row) => {
    if (menuIds.value.includes(row.id)) {
      selectedRows.push(row)
    }
    if (row.children?.length) {
      collectSelectedRows(row.children)
    }
  })
}
const restoreSelection = async (rows: MenuDto[]) => {
  if (!tableRef.value) return

  tableRef.value.clearSelection()
  selectedRows.length = 0

  collectSelectedRows(rows)

  for (const row of selectedRows) {
    tableRef.value.toggleRowSelection(row, true)
    await nextTick()
  }
}

// 编辑时恢复选中的行
watch(
  [menuList, visible],
  async ([data, visible]) => {
    if (visible && data.length > 0) {
      await nextTick()
      await restoreSelection(data)
    }
  },
  { immediate: true }
)

// ===============  对话框打开关闭按钮 ========================

const open = () => {
  visible.value = true
}

const handleClose = () => {
  visible.value = false
}

const onSubmit = async () => {}

defineExpose({
  open,
  close
})
</script>

<template>
  <el-dialog v-model="visible" title="权限配置" :width="720" @close="handleClose">
    <p class="text-#919191 mb-20px">
      给用户设置<em class="text-error">菜单权限</em>以及<em class="text-error">操作权限</em>
    </p>
    <div>
      <el-table
        ref="tableRef"
        border
        :max-height="700"
        v-loading="isFetching"
        :data="menuList"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        row-key="id"
        default-expand-all
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="菜单名称" prop="title" />
        <el-table-column label="权限配置" prop="permissions">
          <template #default="{ row }">
            <el-checkbox
              v-for="perItem in row.permissions"
              :key="perItem.id"
              :label="perItem.name"
              :checked="permissions.includes(perItem.code)"
              @change="(isTrue: any) => onPermissionChange(isTrue, perItem.code)"
            />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <template #footer>
      <el-button plain @click="handleClose">取消</el-button>
      <el-button type="primary" @click="onSubmit">确定</el-button>
    </template>
  </el-dialog>
</template>
