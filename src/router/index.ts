import Home from '@/views/home/index.vue'
import Login from '@/views/login/index.vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

export const routes: RouteRecordRaw[] = [{
  path: '/',
  name: 'Home',
  component: Home,
}, {
  path: '/login',
  name: 'Login',
  component: Login,
}]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
