<script setup lang="ts">
import type { ECharts } from 'echarts/core'
import type { DomainStats } from '@/apis/dashboard/type'
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart } from 'echarts/charts'
// 引入标题，提示框，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  DatasetComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  TransformComponent
} from 'echarts/components'
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'
// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'

const { data = [] } = defineProps<Props>()

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  LegendComponent
])

interface Props {
  data: DomainStats['chartData']
}
const chartRef = useTemplateRef('chartRef')
let chartInstance: ECharts | null = null

watch(
  () => data,
  (value) => {
    console.log('--chartRef.value--', chartRef.value)
    nextTick(() => {
      if (value && chartRef.value) {
        // 初始化图表实例
        chartInstance = echarts.init(chartRef.value)
        renderChart(value)
      }
    })
  },
  {
    immediate: true,
    flush: 'post'
  }
)

onMounted(() => {
  // 监听窗口大小变化，重绘图表
  window.addEventListener('resize', handleResize)

  // 组件卸载时清理
  return () => {
    window.removeEventListener('resize', handleResize)
    if (chartInstance) {
      chartInstance.dispose()
      chartInstance = null
    }
  }
})

const handleResize = () => {
  chartInstance?.resize()
}

const renderChart = (data: DomainStats['chartData']) => {
  if (!chartInstance) return

  // 计算访问数据的最大值
  const maxVisits = Math.max(...data.map((item) => item.visits), 0)
  const yAxisMax = maxVisits + 20

  // 图表配置项
  const option = {
    color: ['#5470C6', '#EE6666'], // 紫色(访问)、橙色(已支付)
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['访问', '已支付'],
      top: 0,
      left: 'center',
      textStyle: {
        fontSize: 12
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: data.map((item) => item.date),
      axisLine: {
        show: true
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: yAxisMax,
      // interval: 1,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    series: [
      {
        name: '访问',
        type: 'bar',
        data: data.map((item) => item.visits), // 访问数据
        barWidth: 20
      },
      {
        name: '已支付',
        type: 'bar',
        data: data.map((item) => item.payments), // 已支付数据
        barWidth: 20
      }
    ]
  }

  chartInstance.setOption(option)
}
</script>

<template>
  <div ref="chartRef" class="chart-wrapper" />
</template>
