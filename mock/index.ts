import type { MockMethod } from 'vite-plugin-mock'

import auth from './auth'
import role from './role'
import user from './user'

export default [...auth, ...role, ...user] as MockMethod[]
