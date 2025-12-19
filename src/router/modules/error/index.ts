import { BasicLayout } from '@/layouts'
import NotPermission from '@/views/error-page/403.vue'
import NotFound from '@/views/error-page/404.vue'
import type { RouteRecordRaw } from 'vue-router'

const errorRoutes: RouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
  {
    path: '/404',
    component: BasicLayout,
    children: [
      {
        path: '',
        name: 'NotFound',
        meta: {
          noLogin: true,
          title: '页面找不到',
          hideInMenu: true,
          hideInTags: true,
        },
        component: NotFound,
      },
    ],
  },
  {
    path: '/403',
    component: BasicLayout,
    children: [
      {
        path: '',
        name: 'NotPermission',
        meta: {
          noLogin: true,
          title: '无权限',
          hideInMenu: true,
          hideInTags: true,
        },
        component: NotPermission,
      },
    ],
  },
]
export default errorRoutes
