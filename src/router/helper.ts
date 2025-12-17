import { isExternal } from '@/utils/is'
import type { Router, RouteRecordRaw } from 'vue-router'
import { errorRoutes } from './modules'

export class RouterHandle {
  private removeRouteGroup: Array<() => void> = []
  private router: Router
  constructor(router: Router) {
    this.router = router
  }

  addRoutes = (dynamicRoutes: RouteRecordRaw[]) => {
    try {
      ;[...dynamicRoutes, ...errorRoutes].forEach((route) => {
        if (this.isValidRoute(route)) {
          const removeRoute = this.router.addRoute(route)
          this.removeRouteGroup.push(removeRoute)
        }
      })
    } catch (error) {
      console.error('Failed to add routes:', error)
      throw error
    }
  }

  removeRoutes = () => {
    this.removeRouteGroup.forEach((removeRoute) => {
      removeRoute()
    })
    this.removeRouteGroup = []
  }

  private isValidRoute(route: RouteRecordRaw): boolean {
    return !isExternal(route.path) && Boolean(this.router)
  }
}
