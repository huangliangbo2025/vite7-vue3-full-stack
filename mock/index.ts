import type { MockMethod } from 'vite-plugin-mock'
import file from '../mock copy/file'
import user from '../mock copy/user'
import auth from './auth'

export default [...user, ...auth, ...file] as MockMethod[]
