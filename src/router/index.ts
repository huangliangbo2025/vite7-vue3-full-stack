import { createRouter, createWebHistory } from 'vue-router'

import { RouterHandle } from './helper'
import { authRoutes, errorRoutes, permissionsRoutes } from './modules/index'

const routes = [...authRoutes, ...permissionsRoutes, ...errorRoutes]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const handleRouter = new RouterHandle(router)

export const addRoutes = handleRouter.addRoutes
export const removeRoutes = handleRouter.removeRoutes

export { authRoutes, permissionsRoutes, routes }

export default router
