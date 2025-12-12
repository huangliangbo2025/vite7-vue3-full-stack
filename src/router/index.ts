import { createRouter, createWebHistory } from 'vue-router'

import { authRoutes, errorRoutes, permissionsRoutes } from './modules/index'

const routes = [...authRoutes, ...permissionsRoutes, ...errorRoutes]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export { authRoutes, permissionsRoutes, routes }

export default router
