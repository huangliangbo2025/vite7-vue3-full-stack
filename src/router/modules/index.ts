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

const authModules = import.meta.glob(`./auth/*.ts`, {
  eager: true,
}) as Modules

const errorModules = import.meta.glob(`./error/*.ts`, {
  eager: true,
}) as Modules

export const permissionsRoutes = getRouters(permissionsModules)
export const authRoutes = getRouters(authModules)
export const errorRoutes = getRouters(errorModules)
