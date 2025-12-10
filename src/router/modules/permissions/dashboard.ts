import { BasicLayout } from '@/layouts'

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
  path: '/dashboard',
  component: BasicLayout,
  children: [
    {
      path: '',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index.vue'),
      meta: { title: '控制面板', requiresAuth: true, icon: 'menu-icon-dashboard' },
    },
  ],
}]
