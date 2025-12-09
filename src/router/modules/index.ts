import type { RouteRecordRaw } from 'vue-router'

type Modules = Record<string, { default: RouteRecordRaw | RouteRecordRaw[] }>

const getRouters = (modules: Modules) => {
  const routes: RouteRecordRaw[] = []
  Object.values(modules).forEach(({ default: moduleRoutes }) => {
    if (!moduleRoutes) return

    if (Array.isArray(moduleRoutes))
      routes.push(...moduleRoutes)
    else
      routes.push(moduleRoutes)
  })

  return routes
}

const permissionsModules = import.meta.glob(`./permissions/*.ts`, {
  eager: true,
}) as Modules

const commonModules = import.meta.glob(`./common/*.ts`, {
  eager: true,
}) as Modules

export const permissionsRoutes = getRouters(permissionsModules)
export const commonRoutes = getRouters(commonModules)

console.log('permissionsRoutes:', permissionsRoutes)
