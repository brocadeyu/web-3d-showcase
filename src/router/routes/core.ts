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
    redirect: '/workspace',
  },
  {
    component: AuthPageLayout,
    name: 'Authentication',
    path: '/auth',
    children: [
      {
        name: 'Login',
        path: 'login',
        component: () => import('@/views/auth/login.vue'),
      },
      // {
      //   name: 'Register',
      //   path: '/register',
      //   component: () => import('@/views/auth/register-page.vue'),
      // },
    ],
  },
  // {
  //   name: 'Workspace',
  //   path: '/workspace',
  //   component: () => import('@/views/modules/workspace/index.vue'),
  //   meta: {
  //     affixTab: true,
  //     icon: 'ant-design:rocket-outlined',
  //     title: '111',
  //   },
  // },
]
export { coreRoutes, fallbackNotFoundRoute }
