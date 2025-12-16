import type { TableColumnCtx } from 'element-plus'

// 表格列配置（官方推荐用 TableColumnCtx）
export interface TableColumn<T = any> extends Partial<TableColumnCtx<T>> {
  ellipsis?: boolean
}
