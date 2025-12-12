import { createRouter, createWebHistory } from 'vue-router'

import { commonRoutes, errorRoutes, permissionsRoutes } from './modules/index'

const routes = [...commonRoutes, ...permissionsRoutes, ...errorRoutes]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export { commonRoutes, permissionsRoutes, routes }

export default router
