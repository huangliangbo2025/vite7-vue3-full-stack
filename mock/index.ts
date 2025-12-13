import type { MockMethod } from 'vite-plugin-mock'

import auth from './auth'
import menu from './menu'
import role from './role'
import user from './user'

export default [...auth, ...role, ...user, ...menu] as MockMethod[]
