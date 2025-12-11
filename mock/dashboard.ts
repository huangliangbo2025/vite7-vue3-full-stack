// mock/index.ts
import Mock from 'mockjs'
import { createResponse } from './util'

export default [{
  url: '/api/dashboard/allData',
  method: 'get',
  timeout: 1500, // 模拟延迟
  response: (request: any) =>
    createResponse(
      Mock.mock({
        // 核心指标卡片数据（随机化）
        coreMetrics: {
          todayVisits: Mock.mock('@integer(0, 500)'), // 今日访问：0-500随机
          blockedCount: Mock.mock('@integer(0, 100)'), // 已拦截：0-100随机
          payUsers: Mock.mock('@integer(0, 80)'), // 付款人数：0-80随机
          payOrders: Mock.mock('@integer(0, 120)'), // 付款笔数：0-120随机
          totalVisits: Mock.mock('@integer(1000, 10000)'), // 总访问：1000-10000随机
          payConversionRate() { // 支付转化率：10.0%-80.0%随机
            return `${(Mock.mock('@float(10, 80, 1, 1)')).toFixed(1)}%`
          },
          // frontendStatus: Mock.mock('@boolean'), // 前台状态：随机布尔值（0/1）
          // backendStatus: Mock.mock('@boolean'), // 后台状态：随机布尔值（0/1）
        },
        // 域名访问统计图表数据
        domainStats: {
          timeRange: '近7天',
          domains: [
            '全部域名',
            'domain1.com',
            'domain2.com',
            'domain3.com',
          ],
          chartData: [
            {
              date: '11/20',
              visits: Mock.mock('@integer(0, 100)'),
              payments: Mock.mock('@integer(0, 50)'),
            },
            {
              date: '11/21',
              visits: Mock.mock('@integer(100, 500)'),
              payments: Mock.mock('@integer(0, 150)'),
            },
            {
              date: '11/22',
              visits: Mock.mock('@integer(300, 600)'),
              payments: Mock.mock('@integer(0, 80)'),
            },
            {
              date: '11/23',
              visits: Mock.mock('@integer(300, 600)'),
              payments: Mock.mock('@integer(0, 80)'),
            },
            {
              date: '11/24',
              visits: Mock.mock('@integer(300, 600)'),
              payments: Mock.mock('@integer(0, 50)'),
            },
            {
              date: '11/25',
              visits: Mock.mock('@integer(300, 600)'),
              payments: Mock.mock('@integer(0, 50)'),
            },
            {
              date: '11/26',
              visits: Mock.mock('@integer(0, 100)'),
              payments: Mock.mock('@integer(0, 30)'),
            },
          ],
        },
        // 系统信息
        systemInfo: {
          updateTime: Mock.mock('@datetime'),
          serverStatus: '正常',
          alertCount: Mock.mock('@integer(0, 5)'),
        },
      }),
      request,
    ),
}]
