import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

const modules = import.meta.glob('./modules/*.ts', {
  eager: true,
}) as Record<string, { default: RouteRecordRaw | RouteRecordRaw[] }>

const routes: RouteRecordRaw[] = []

Object.values(modules).forEach(({ default: moduleRoutes }) => {
  if (!moduleRoutes) return

  if (Array.isArray(moduleRoutes))
    routes.push(...moduleRoutes)
  else
    routes.push(moduleRoutes)
})

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export { routes }

export default router
