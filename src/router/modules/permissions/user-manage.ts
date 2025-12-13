import { BasicLayout } from '@/layouts'
import type { RouteRecordRaw } from 'vue-router'

export default [{
  path: '/system',
  name: 'system',
  redirect: '/sys-manage/user',
  meta: {
    title: 'SYSTEM & PAGES',
    disabled: true,
  },
  children: [],
}, {
  path: '/sys-manage',
  component: BasicLayout,
  redirect: '/sys-manage/user',
  meta: { title: '系统管理', icon: 'menu-icon-system' },
  children: [
    {
      path: 'user',
      name: 'User',
      component: () => import('@/views/sys-manage/user/index.vue'),
      meta: { title: '用户管理' },
    },
    {
      path: 'role',
      name: 'Role',
      component: () => import('@/views/sys-manage/role/index.vue'),
      meta: { title: '角色管理' },
    },
    {
      path: 'menu',
      name: 'Menu',
      component: () => import('@/views/sys-manage/menu/index.vue'),
      meta: { title: '菜单管理' },
    },
  ],
}] as RouteRecordRaw[]
