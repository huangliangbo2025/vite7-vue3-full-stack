import type { MockMethod } from 'vite-plugin-mock'

import auth from './auth'

export default [...auth] as MockMethod[]
