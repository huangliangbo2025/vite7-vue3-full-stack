import { createRouter, createWebHistory } from 'vue-router'

import { commonRoutes, permissionsRoutes } from './modules/index'

const routes = [...commonRoutes, ...permissionsRoutes]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export { commonRoutes, permissionsRoutes, routes }

export default router
