import { BasicLayout } from '@/layouts'

export default {
  path: '/',
  component: BasicLayout,
  meta: {
    sort: 1,
  },
  children: [
    {
      path: '',
      name: 'Home',
      component: () => import('@/views/home/index.vue'),
      meta: { title: '首页', requiresAuth: true },
    },
  ],
}
