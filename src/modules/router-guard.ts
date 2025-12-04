import type { UserModule } from '@/types/modules'
import NProgress from 'nprogress'

export const install: UserModule = ({ app, router }) => {
  app.use(router)

  router.beforeEach(async (_to, _from, next) => {
    NProgress.start()
    next()
  })

  router.afterEach(() => {
    NProgress.done()
  })
}
