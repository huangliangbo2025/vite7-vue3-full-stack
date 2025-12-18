import { addRoutes } from '@/router'
import { useAuthStore } from '@/stores'
import type { UserModule } from '@/types/modules'
import { generateAccessRoute } from '@/utils/route'
import NProgress from 'nprogress'

export const install: UserModule = ({ app, router }) => {
  app.use(router)

  let isRouteInited = false

  router.beforeEach(async (to, _from, next) => {
    NProgress.start()

    const { token, menus } = useAuthStore()

    if (!token) {
      if (to.path === '/auth/login')
        isRouteInited = false

      // 无需登录验证
      if (to.meta?.noLogin) {
        next()
        return
      }

      // 未登录，去登录页
      next({
        path: '/auth/login',
        replace: true,
      })
      return
    }

    // 已登录，无需去登录
    if (to.path === '/auth/login') {
      next({
        path: '/',
        replace: true,
      })
      return
    }

    if (!isRouteInited) {
      const accessRoutes = generateAccessRoute(menus)
      addRoutes(accessRoutes)
      isRouteInited = true
      next({ ...to, replace: true })
      return
    }

    console.log(333333, router.getRoutes())

    // 你可以在这里进一步做拦截，如果你跳转的路由在permissionRoute的菜单里，但是不在你的权限内，你可以跳转到权限拦截界面，比如401界面

    next()
  })

  router.afterEach(() => {
    NProgress.done()
  })
}
