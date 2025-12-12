import { BasicLayout } from '@/layouts'
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
          title: '页面找不到',
          hideInMenu: true,
          hideInTags: true,
        },
        component: NotFound,
      },
    ],
  },
]
export default errorRoutes
