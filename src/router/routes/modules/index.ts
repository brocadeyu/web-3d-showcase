import type { RouteRecordRaw } from 'vue-router'
import basicLayout from '@/views/core/basic-layout.vue'
const routes: RouteRecordRaw[] = [
  {
    component: basicLayout,
    meta: {
      icon: 'ant-design:home-filled',
      order: -1,
      title: 'test',
    },
    name: 'Index',
    path: '/',
    children: [
      {
        name: 'Workspace',
        path: '/workspace',
        component: () => import('@/views/modules/workspace/index.vue'),
        meta: {
          affixTab: true,
          icon: 'ant-design:rocket-outlined',
          title: '111',
        },
      },
    ],
  },
]

export default routes
