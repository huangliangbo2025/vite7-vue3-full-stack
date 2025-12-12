import { BlankLayout } from '@/layouts'

export default {
  path: '/auth',
  component: BlankLayout,
  children: [
    {
      path: 'login',
      name: 'Login',
      component: () => import('@/views/auth/login/index.vue'),
      meta: { title: '登录', noLogin: true },
    },
  ],
}
