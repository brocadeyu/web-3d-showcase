import type { RouteRecordRaw } from 'vue-router'
import AuthPageLayout from '@/views/auth/auth-layout.vue'
const fallbackNotFoundRoute: RouteRecordRaw = {
  component: () => import('@/views/core/not-found.vue'),
  name: 'FallbackNotFound',
  path: '/:path(.*)*',
}

const coreRoutes: RouteRecordRaw[] = [
  {
    name: 'Root',
    path: '/',
    redirect: '/home',
  },
  {
    component: AuthPageLayout,
    name: 'Authentication',
    path: '/auth',
    children: [
      {
        name: 'Login',
        path: 'login',
        component: () => import('@/views/auth/login-page.vue'),
      },
      // {
      //   name: 'Register',
      //   path: '/register',
      //   component: () => import('@/views/auth/register-page.vue'),
      // },
    ],
  },
]
export { coreRoutes, fallbackNotFoundRoute }
