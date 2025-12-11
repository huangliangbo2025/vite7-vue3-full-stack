import { useAuthStore } from '@/stores'
import type { UserModule } from '@/types/modules'
import NProgress from 'nprogress'

const WHITE_LIST = ['/auth/login']

export const install: UserModule = ({ app, router }) => {
  app.use(router)

  router.beforeEach(async (to, _from, next) => {
    NProgress.start()
    if (WHITE_LIST.includes(to.path)) {
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

    next()
  })

  router.afterEach(() => {
    NProgress.done()
  })
}
