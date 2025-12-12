import { BasicLayout } from '@/layouts'
import type { RouteRecordRaw } from 'vue-router'

export default [{
  path: '/apps',
  name: 'Apps',
  redirect: '/access-control',
  meta: {
    title: 'APP & PAGES',
    disabled: true,
  },
  children: [],
}, {
  path: '/',
  component: BasicLayout,
  redirect: '/dashboard',
  children: [
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index.vue'),
      meta: { title: '控制面板', requiresAuth: true, icon: 'menu-icon-dashboard' },
    },
  ],
}] as RouteRecordRaw[]
