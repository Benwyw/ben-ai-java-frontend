// Composables
import { createRouter, createWebHistory } from 'vue-router'

/**
 * Router Configuration with Navigation Metadata
 *
 * Each route can have the following meta properties for navigation:
 *
 * - title: Display name in sidebar (required for nav visibility)
 * - icon: MDI icon name (e.g., 'mdi-home')
 * - navSection: Section grouping - 'main', 'tools', 'legal' (default: 'main')
 * - navOrder: Order within section (lower = higher priority, default: 100)
 * - navHidden: Set to true to hide from sidebar
 * - parent: Parent route name for nesting (enables infinite depth)
 * - defaultExpanded: Set to true to expand group by default
 *
 * Example of nested routes:
 * {
 *   path: '/reports',
 *   name: 'Reports',
 *   meta: { title: 'Reports', icon: 'mdi-file-chart', navSection: 'tools', defaultExpanded: true }
 * },
 * {
 *   path: '/reports/monthly',
 *   name: 'MonthlyReport',
 *   meta: { title: 'Monthly', parent: 'Reports' }
 * },
 * {
 *   path: '/reports/monthly/sales',
 *   name: 'MonthlySalesReport',
 *   meta: { title: 'Sales', parent: 'MonthlyReport' }  // Grandchild - infinite nesting!
 * }
 */

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      // ==================== MAIN SECTION ====================
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: {
          title: 'Home',
          icon: 'mdi-home',
          navSection: 'main',
          navOrder: 1
        },
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/About.vue'),
        meta: {
          title: 'About',
          icon: 'mdi-information',
          navSection: 'main',
          navOrder: 2
        },
      },
      {
        path: '/messenger',
        name: 'Messenger',
        component: () => import('@/views/Messenger.vue'),
        meta: {
          title: 'Messenger',
          icon: 'mdi-message',
          navSection: 'main',
          navOrder: 3
        },
      },

      // ==================== TOOLS SECTION ====================
      {
        path: '/swagger',
        name: 'Swagger',
        component: () => import('@/views/Swagger.vue'),
        meta: {
          title: 'Swagger',
          icon: 'mdi-api',
          navSection: 'tools',
          navOrder: 1
        },
      },
      {
        path: '/whityweight',
        name: 'Whity Weight',
        component: () => import('@/views/WhityWeight.vue'),
        meta: {
          title: 'Whity Weight',
          icon: 'mdi-scale-bathroom',
          navSection: 'tools',
          navOrder: 2
        },
      },
      {
        path: '/report',
        name: 'Report',
        component: () => import('@/views/Report.vue'),
        meta: {
          title: 'Report',
          icon: 'mdi-file-chart',
          navSection: 'tools',
          navOrder: 3
        },
      },

      // ==================== LEGAL SECTION ====================
      {
        path: '/termsofservice',
        name: 'Terms Of Service',
        component: () => import('@/views/TermsOfService.vue'),
        meta: {
          title: 'Terms of Service',
          icon: 'mdi-file-document',
          navSection: 'legal',
          navOrder: 1
        },
      },
      {
        path: '/privacypolicy',
        name: 'Privacy Policy',
        component: () => import('@/views/PrivacyPolicy.vue'),
        meta: {
          title: 'Privacy Policy',
          icon: 'mdi-shield-lock',
          navSection: 'legal',
          navOrder: 2
        },
      },

      // ==================== AUTH (Hidden from nav) ====================
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
        meta: {
          title: 'Login',
          navHidden: true  // Hidden from sidebar
        },
      },

      // ==================== CATCH-ALL ====================
      {
        path: '/:pathMatch(.*)*',
        redirect: '/',
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Export children for use in layout
export const mainRouteChildren = routes[0].children

export default router
