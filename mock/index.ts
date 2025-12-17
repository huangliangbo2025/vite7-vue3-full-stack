import type { MockMethod } from 'vite-plugin-mock'

import auth from './auth'
import menu from './menu'
import permission from './permission'
import role from './role'
import user from './user'

export default [...auth, ...role, ...user, ...menu, ...permission] as MockMethod[]
