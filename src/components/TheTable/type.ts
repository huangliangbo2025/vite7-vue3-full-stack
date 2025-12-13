import type { ElTableColumn } from 'element-plus'

// 定义表格列配置类型
export type TableColumnAlign = 'left' | 'center' | 'right'
export type TableColumnFixed = 'left' | 'right' | boolean

// 操作按钮配置类型
export interface TableAction<T = any> {
  text: string
  icon?: any
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'
  size?: 'mini' | 'small' | 'medium' | 'large'
  handler: (scope: { row: T; index: number }) => void
  disabled?: boolean | ((scope: { row: T; index: number }) => boolean)
  hidden?: boolean | ((scope: { row: T; index: number }) => boolean)
  [key: string]: any
}

// 操作列配置类型
export interface OperationColumn<T = any> {
  label?: string
  width?: number | string
  minWidth?: number | string
  fixed?: TableColumnFixed
  align?: TableColumnAlign
  actions: TableAction<T>[]
}

// 表格列配置类型
export type ElTableColumnProp = InstanceType<typeof ElTableColumn>['$props']
export interface TableColumn extends ElTableColumnProp {
  ellipsis?: boolean
}
