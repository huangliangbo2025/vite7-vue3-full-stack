import { httpClient } from '@/apis/httpClient'
import type { DashboardAllData } from './type'

export const getDashboardDataApi = (...reset: any[]) =>
  httpClient.get<DashboardAllData>('/api/dashboard/allData', ...reset)
