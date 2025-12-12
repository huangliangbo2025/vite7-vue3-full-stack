import { useAuthStore } from '@/stores'
import type { UserModule } from '@/types/modules'
import NProgress from 'nprogress'

export const install: UserModule = ({ app, router }) => {
  app.use(router)

  router.beforeEach(async (to, _from, next) => {
    NProgress.start()

    if (to.meta?.noLogin) {
      next()
      return
    }

    const { token } = useAuthStore()

    if (!token) {
      next({
        path: '/auth/login',
        replace: true,
      })
      return
    }

    // 你可以在这里进一步做拦截，如果你跳转的路由在permissionRoute的菜单里，但是不在你的权限内，你可以跳转到权限拦截界面，比如401界面

    next()
  })

  router.afterEach(() => {
    NProgress.done()
  })
}
