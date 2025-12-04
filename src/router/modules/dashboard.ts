import { BasicLayout } from '@/layouts'

export default {
  path: '/dashboard',
  component: BasicLayout,
  children: [
    {
      path: '',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index.vue'),
      meta: { title: '首页', requiresAuth: true },
    },
  ],
}
