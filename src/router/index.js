// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/About.vue'),
      },
      {
        path: '/swagger',
        name: 'Swagger',
        component: () => import('@/views/Swagger.vue'),
      },
      {
        path: '/messenger',
        name: 'Messenger',
        component: () => import('@/views/Messenger.vue'),
      },
      {
        path: '/termsofservice',
        name: 'Terms Of Service',
        component: () => import('@/views/TermsOfService.vue'),
      },
      {
        path: '/privacypolicy',
        name: 'Privacy Policy',
        component: () => import('@/views/PrivacyPolicy.vue'),
      },
     {
       path: '/whityWeight',
       name: 'Whity Weight',
       component: () => import('@/views/WhityWeight.vue'),
     }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
