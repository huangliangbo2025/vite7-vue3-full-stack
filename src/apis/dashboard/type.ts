/**
 * 仪表盘核心数据类型定义
 * 对应接口：/api/dashboard/allData
 * 适用场景：平台管理系统仪表盘页面数据渲染
 */

/**
 * 核心指标卡片数据类型
 * 包含今日访问、拦截数、付款相关、转化率等核心业务指标
 */
export interface CoreMetrics {
  /** 今日访问量（0-500随机整数） */
  todayVisits: number
  /** 今日拦截数（0-100随机整数，≤今日访问量） */
  blockedCount: number
  /** 今日付款人数（0-80随机整数） */
  payUsers: number
  /** 今日付款笔数（0-120随机整数，≥付款人数） */
  payOrders: number
  /** 累计总访问量（1000-10000随机整数） */
  totalVisits: number
  /** 支付转化率（10.0%-80.0%，保留1位小数） */
  payConversionRate: string
  // /** 前台服务状态（0=离线/1=在线，布尔值映射） */
  // frontendStatus: 0 | 1
  // /** 后台服务状态（0=离线/1=在线，布尔值映射） */
  // backendStatus: 0 | 1
}

/**
 * 图表单条数据类型
 * 对应域名访问统计图表的单日数据
 */
export interface ChartItem {
  /** 日期（格式：MM/DD） */
  date: string
  /** 当日访问量（整数） */
  visits: number
  /** 当日付款数（整数） */
  payments: number
}

/**
 * 域名访问统计数据类型
 * 包含时间范围、域名列表、图表数据
 */
export interface DomainStats {
  /** 统计时间范围（如：近7天） */
  timeRange: string
  /** 域名筛选列表（用于前端下拉筛选） */
  domains: string[]
  /** 图表核心数据（近7天访问/付款趋势） */
  chartData: ChartItem[]
}

/**
 * 系统信息数据类型
 * 包含数据更新时间、服务器状态、告警数等系统级信息
 */
export interface SystemInfo {
  /** 数据最后更新时间（格式：YYYY-MM-DD HH:mm:ss） */
  updateTime: string
  /** 服务器运行状态（如：正常/异常/维护中） */
  serverStatus: string
  /** 未处理告警数量（0-5随机整数） */
  alertCount: number
}

/**
 * 仪表盘完整数据类型
 * 整合所有模块数据，对应接口返回根结构
 */
export interface DashboardAllData {
  /** 核心指标卡片数据 */
  coreMetrics: CoreMetrics
  /** 域名访问统计图表数据 */
  domainStats: DomainStats
  /** 系统基础信息 */
  systemInfo: SystemInfo
}
