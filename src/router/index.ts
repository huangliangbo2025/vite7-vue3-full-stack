import { createRouter, createWebHistory } from 'vue-router'

import { RouterHandle } from './helper'
import { authRoutes, errorRoutes } from './modules/index'

const routes = [...authRoutes, { path: '/', redirect: '/dashboard' }]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const handleRouter = new RouterHandle(router)

export const addRoutes = handleRouter.addRoutes
export const removeRoutes = handleRouter.removeRoutes

// 记住errorRoutes要在权限路由后面添加
export { authRoutes, errorRoutes, routes }

export default router
