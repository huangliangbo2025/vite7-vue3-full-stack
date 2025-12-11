<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { getDashboardDataApi } from '@/apis/dashboard'
import TheBarChart from './components/TheBarChart.vue'

const domain = ref('')

const { isLoading, data } = useQuery({
  queryKey: ['dashboard'],
  queryFn: () => getDashboardDataApi()
})

const coreMetrics = computed(() => data.value?.coreMetrics)
const domainStats = computed(() => data.value?.domainStats)

const statisticalList = computed(() => {
  if (!coreMetrics.value) return []

  return [
    {
      key: 'todayVisits',
      title: '今日访问数',
      icon: 'dashboard-icon-1',
      iconColor: 'primary',
      value: coreMetrics.value.todayVisits
    },
    {
      key: 'blockedCount',
      title: '已拦截',
      icon: 'dashboard-icon-2',
      iconColor: 'success',
      value: coreMetrics.value.blockedCount
    },
    {
      key: 'payUsers',
      title: '付款人数',
      icon: 'dashboard-icon-3',
      iconColor: 'warning',
      value: coreMetrics.value.payUsers
    },
    {
      key: 'payOrders',
      title: '付款笔数',
      icon: 'dashboard-icon-4',
      iconColor: 'danger',
      value: coreMetrics.value.payOrders
    }
  ] as const
})
</script>

<template>
  <div class="w-full p-[var(--el-main-padding)]">
    <template v-if="!data && isLoading">
      <el-card>
        <el-skeleton :rows="5" />
      </el-card>
      <el-card class="mt-5">
        <el-skeleton :rows="5" />
      </el-card>
    </template>
    <template v-else>
      <el-card>
        <el-row class="flex">
          <el-col v-for="item in statisticalList" :key="item.key" :span="6">
            <div class="gap-8px flex flex-1">
              <el-tag round :type="item.iconColor" class="h-80px! w-80px!">
                <span class="text-40px">
                  <svg-icon :name="item.icon" />
                </span>
              </el-tag>
              <div class="h-80px flex flex-col justify-between">
                <span class="text-20px leading-40px font-700 text-black">{{ item.value }}</span>
                <span
                  class="text-16px leading-40px leading-40px text-[var(--el-color-info-dark-2)]"
                  >{{ item.title }}</span
                >
              </div>
            </div>
          </el-col>
        </el-row>
      </el-card>

      <el-card class="mt-5">
        <template #header>
          <div class="card-header">
            <div class="flex justify-between">
              <span class="leading-32px">域名访问统计</span>

              <div class="item-center gap-12px flex">
                <el-select v-model="domain" class="w-200px!">
                  <el-option
                    v-for="value in domainStats?.domains"
                    :key="value"
                    :value="value"
                    :label="value"
                  />
                </el-select>
                <span class="text-5 leading-32px font-700 block">{{
                  coreMetrics?.payConversionRate
                }}</span>
                <span class="text-4 leading-32px block text-[var(--el-color-info-dark-2)]">
                  总访问:
                  <em class="text-black">{{ coreMetrics?.totalVisits }}</em>
                </span>
              </div>
            </div>
          </div>
        </template>
        <div>
          <TheBarChart class="h-160" :data="domainStats?.chartData" />
        </div>
      </el-card>
    </template>
  </div>
</template>
