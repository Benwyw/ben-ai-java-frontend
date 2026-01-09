// Composables
import { createRouter, createWebHistory } from 'vue-router'

/**
 * ============================================================================
 * Router Configuration with Navigation & Permission Metadata
 * ============================================================================
 *
 * This router configuration controls both routing and the sidebar navigation.
 * The navigation is dynamically generated from route meta properties.
 *
 * ============================================================================
 * NAVIGATION META PROPERTIES
 * ============================================================================
 *
 * @property {string} title - Display name in sidebar (REQUIRED for nav visibility)
 *   - Routes without a title will not appear in navigation
 *   - Example: title: 'Dashboard'
 *
 * @property {string} icon - MDI icon name for the nav item (optional)
 *   - Uses Material Design Icons: https://pictogrammers.com/library/mdi/
 *   - Example: icon: 'mdi-home', icon: 'mdi-cog'
 *
 * @property {string} navSection - Section grouping in sidebar (optional)
 *   - Values: 'main' | 'tools' | 'noteformat' | 'products' | 'legal'
 *   - Default: 'main'
 *   - Items are grouped into sections with dividers
 *
 * @property {number} navOrder - Sort order within section (optional)
 *   - Lower numbers appear first
 *   - Default: 100
 *   - Example: navOrder: 1 (appears first)
 *
 * @property {boolean} navHidden - Hide from sidebar navigation (optional)
 *   - Default: false
 *   - Set to true for routes that shouldn't appear in nav (e.g., login, error pages)
 *
 * @property {string} parent - Parent route name for nesting (optional)
 *   - Creates hierarchical nav structure with expand/collapse
 *   - Supports infinite nesting depth
 *   - Value must match the 'name' of another route
 *
 * @property {boolean} defaultExpanded - Auto-expand group on load (optional)
 *   - Only applies to parent items (items that have children)
 *   - Default: false (group is collapsed by default)
 *   - Set to true to have the group expanded when the page loads
 *   - Omit or set to false to keep the group collapsed by default
 *
 * ============================================================================
 * AUTHENTICATION & PERMISSION META PROPERTIES
 * ============================================================================
 *
 * @property {boolean} requiresAuth - Require user to be logged in (optional)
 *   - Default: false
 *   - If true and user is not logged in:
 *     - If hideNavIfNoAccess=false: Shows login prompt when accessing
 *     - If hideNavIfNoAccess=true: Route is hidden from navigation
 *
 * @property {string[]} requiredRoles - Array of roles that can access (optional)
 *   - Uses OR logic: user needs ANY ONE of the listed roles
 *   - Role values should match backend (e.g., 'USER', 'ADMIN', 'MODERATOR')
 *   - Example: requiredRoles: ['ADMIN'] - only admins
 *   - Example: requiredRoles: ['ADMIN', 'MODERATOR'] - admins OR moderators
 *   - If not specified with requiresAuth=true, any authenticated user can access
 *
 * @property {boolean} hideNavIfNoAccess - Control nav visibility when no permission (optional)
 *   - Default: false
 *   - When FALSE (default):
 *     - Nav item is ALWAYS visible to everyone
 *     - Shows a 🔒 lock icon if user lacks permission
 *     - Clicking shows error message and redirects to home
 *   - When TRUE:
 *     - Nav item is COMPLETELY HIDDEN if user lacks permission
 *     - Only users with access can see the nav item
 *
 * ============================================================================
 * PERMISSION BEHAVIOR MATRIX
 * ============================================================================
 *
 * | requiresAuth | requiredRoles | hideNavIfNoAccess | User State      | Nav Visibility | Access |
 * |--------------|---------------|-------------------|-----------------|----------------|--------|
 * | false        | -             | -                 | Any             | Visible        | ✅ Yes |
 * | true         | -             | false             | Not logged in   | Visible + 🔒   | ❌ No  |
 * | true         | -             | false             | Logged in       | Visible        | ✅ Yes |
 * | true         | -             | true              | Not logged in   | Hidden         | ❌ No  |
 * | true         | -             | true              | Logged in       | Visible        | ✅ Yes |
 * | true         | ['ADMIN']     | false             | User role       | Visible + 🔒   | ❌ No  |
 * | true         | ['ADMIN']     | false             | Admin role      | Visible        | ✅ Yes |
 * | true         | ['ADMIN']     | true              | User role       | Hidden         | ❌ No  |
 * | true         | ['ADMIN']     | true              | Admin role      | Visible        | ✅ Yes |
 *
 * ============================================================================
 * EXAMPLES
 * ============================================================================
 *
 * // Public page - visible and accessible to everyone
 * {
 *   path: '/about',
 *   name: 'About',
 *   meta: { title: 'About', icon: 'mdi-information' }
 * }
 *
 * // Login required - visible to all, but only logged-in users can access
 * // Shows 🔒 lock icon when not logged in
 * {
 *   path: '/dashboard',
 *   name: 'Dashboard',
 *   meta: {
 *     title: 'Dashboard',
 *     icon: 'mdi-view-dashboard',
 *     requiresAuth: true,
 *     hideNavIfNoAccess: false  // Shows with lock icon when logged out
 *   }
 * }
 *
 * // Login required - hidden from nav when not logged in
 * {
 *   path: '/profile',
 *   name: 'Profile',
 *   meta: {
 *     title: 'My Profile',
 *     icon: 'mdi-account',
 *     requiresAuth: true,
 *     hideNavIfNoAccess: true  // Completely hidden when logged out
 *   }
 * }
 *
 * // Admin only - hidden from non-admins
 * {
 *   path: '/admin',
 *   name: 'Admin',
 *   meta: {
 *     title: 'Admin Panel',
 *     icon: 'mdi-shield-crown',
 *     requiresAuth: true,
 *     requiredRoles: ['ADMIN'],
 *     hideNavIfNoAccess: true  // Only admins see this in nav
 *   }
 * }
 *
 * // Multiple roles - visible with lock to unauthorized users
 * {
 *   path: '/reports',
 *   name: 'Reports',
 *   meta: {
 *     title: 'Reports',
 *     icon: 'mdi-file-chart',
 *     requiresAuth: true,
 *     requiredRoles: ['ADMIN', 'MANAGER'],  // Either role can access
 *     hideNavIfNoAccess: false  // Visible to all, lock icon for others
 *   }
 * }
 *
 * // Nested routes example
 * {
 *   path: '/settings',
 *   name: 'Settings',
 *   meta: { title: 'Settings', icon: 'mdi-cog', defaultExpanded: true }
 * },
 * {
 *   path: '/settings/profile',
 *   name: 'ProfileSettings',
 *   meta: { title: 'Profile', parent: 'Settings' }  // Child of Settings
 * },
 * {
 *   path: '/settings/profile/avatar',
 *   name: 'AvatarSettings',
 *   meta: { title: 'Avatar', parent: 'ProfileSettings' }  // Grandchild
 * }
 *
 * ============================================================================
 */

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      // ==================== MAIN SECTION ====================
      // Public pages in the main navigation area
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: {
          title: 'Home',
          icon: 'mdi-home',
          navSection: 'main',
          navOrder: 1,
          seoTitle: 'Benwyw — Home',
          seoDescription: 'Welcome to Benwyw. Explore NoteFormat iOS App or Ben Kaneki Discord Bot.',
          canonicalPath: '/',
          // No auth required - public page
        },
      },
      {
        path: '/about',
        name: 'About',
        redirect: '/benkaneki/about',
        meta: {
          navHidden: true, // Redirect to Ben Kaneki section
        },
      },
      {
        path: '/guides',
        name: 'Guides',
        redirect: '/benkaneki',
        meta: {
          navHidden: true, // Redirect to Ben Kaneki section
        },
      },
      {
        path: '/messenger',
        name: 'Messenger',
        redirect: '/benkaneki/messenger',
        meta: {
          navHidden: true, // Redirect to Ben Kaneki section
        },
      },

      // ==================== TOOLS SECTION (LEGACY REDIRECTS) ====================
      // Redirect old tool paths to Ben Kaneki section
      {
        path: '/swagger',
        name: 'Swagger',
        redirect: '/benkaneki/swagger',
        meta: {
          navHidden: true, // Redirect to Ben Kaneki section
        },
      },
      {
        path: '/whityweight',
        name: 'Whity Weight',
        redirect: '/benkaneki/whityweight',
        meta: {
          navHidden: true, // Redirect to Ben Kaneki section
        },
      },
      {
        path: '/report',
        name: 'Report',
        redirect: '/benkaneki/report',
        meta: {
          navHidden: true, // Redirect to Ben Kaneki section
        },
      },

      // ==================== NOTEFORMAT SECTION ====================
      // Product-specific legal/help pages (public)
      {
        path: '/noteformat',
        name: 'Noteformat',
        component: () => import('@/views/noteformat/NoteformatLanding.vue'),
        meta: {
          title: 'NoteFormat',
          iconImage: new URL('@/assets/noteformat-128.png', import.meta.url).href,
          navSection: 'noteformat',
          navOrder: 1,
          defaultExpanded: true,
          seoTitle: 'NoteFormat — Benwyw',
          seoDescription: 'Landing page for NoteFormat with guides, tutorials, and documentation.',
          canonicalPath: '/noteformat',
        },
      },
      {
        path: '/noteformat/eula',
        name: 'Noteformat EULA',
        // External redirect to Apple's Standard EULA (no internal page)
        beforeEnter() {
          window.location.replace('https://www.apple.com/legal/internet-services/itunes/dev/stdeula/')
        },
        meta: {
          title: 'EULA',
          icon: 'mdi-file-document-outline',
          navSection: 'noteformat',
          navOrder: 1,
          parent: 'Noteformat',
          seoTitle: 'NoteFormat EULA — Benwyw',
          seoDescription: 'End User License Agreement for NoteFormat.',
          canonicalPath: '/noteformat/eula',
          robots: 'noindex,nofollow',
        },
      },
      {
        path: '/noteformat/privacy',
        name: 'Noteformat Privacy',
        component: () => import('@/views/noteformat/NoteformatPrivacy.vue'),
        meta: {
          title: 'Privacy',
          icon: 'mdi-shield-lock',
          navSection: 'noteformat',
          navOrder: 2,
          parent: 'Noteformat',
          seoTitle: 'NoteFormat Privacy — Benwyw',
          seoDescription: 'Privacy policy and data handling details for NoteFormat.',
          canonicalPath: '/noteformat/privacy',
        },
      },
      {
        path: '/noteformat/tutorials',
        name: 'Noteformat Tutorials',
        component: () => import('@/views/noteformat/NoteformatTutorials.vue'),
        meta: {
          title: 'Tutorials',
          icon: 'mdi-school',
          navSection: 'noteformat',
          navOrder: 3,
          parent: 'Noteformat',
          seoTitle: 'NoteFormat Tutorials — Benwyw',
          seoDescription: 'Tutorials and walkthroughs for NoteFormat.',
          canonicalPath: '/noteformat/tutorials',
        },
      },
      {
        path: '/noteformat/docs',
        name: 'Noteformat Docs',
        component: () => import('@/views/noteformat/NoteformatDocs.vue'),
        meta: {
          title: 'Docs & FAQ',
          icon: 'mdi-file-tree',
          navSection: 'noteformat',
          navOrder: 4,
          parent: 'Noteformat',
          seoTitle: 'NoteFormat Docs & FAQ — Benwyw',
          seoDescription: 'Documentation and frequently asked questions for NoteFormat.',
          canonicalPath: '/noteformat/docs',
        },
      },

      // ==================== BEN KANEKI SECTION ====================
      // Discord Bot - dashboard, tools, and legal pages
      {
        path: '/benkaneki',
        name: 'BenKaneki',
        component: () => import('@/views/benkaneki/BenKanekiLanding.vue'),
        meta: {
          title: 'Ben Kaneki',
          icon: 'mdi-robot',
          navSection: 'benkaneki',
          navOrder: 1,
          defaultExpanded: true,
          seoTitle: 'Ben Kaneki — Benwyw',
          seoDescription: 'Ben Kaneki Discord Bot - A multi-purpose bot with web dashboard for utilities and automation.',
          canonicalPath: '/benkaneki',
        },
      },
      {
        path: '/benkaneki/home',
        name: 'BenKaneki Home',
        component: () => import('@/views/benkaneki/BenKanekiHome.vue'),
        meta: {
          title: 'Home',
          icon: 'mdi-home',
          navSection: 'benkaneki',
          navOrder: 1,
          parent: 'BenKaneki',
          seoTitle: 'Ben Kaneki Home — Benwyw',
          seoDescription: 'Dashboard overview for Ben Kaneki Discord Bot.',
          canonicalPath: '/benkaneki/home',
          navHidden: true
        },
      },
      {
        path: '/benkaneki/about',
        name: 'BenKaneki About',
        component: () => import('@/views/benkaneki/BenKanekiAbout.vue'),
        meta: {
          title: 'About',
          icon: 'mdi-information',
          navSection: 'benkaneki',
          navOrder: 2,
          parent: 'BenKaneki',
          seoTitle: 'About Ben Kaneki — Benwyw',
          seoDescription: 'Learn more about Ben Kaneki Discord Bot and its features.',
          canonicalPath: '/benkaneki/about',
        },
      },
      {
        path: '/benkaneki/messenger',
        name: 'BenKaneki Messenger',
        component: () => import('@/views/benkaneki/BenKanekiMessenger.vue'),
        meta: {
          title: 'Messenger',
          icon: 'mdi-message',
          navSection: 'benkaneki',
          navOrder: 3,
          parent: 'BenKaneki',
          requiresAuth: true,
          robots: 'noindex,nofollow',
          seoTitle: 'Ben Kaneki Messenger — Benwyw',
          seoDescription: 'Send messages through Ben Kaneki Discord Bot.',
          canonicalPath: '/benkaneki/messenger',
        },
      },
      {
        path: '/benkaneki/swagger',
        name: 'BenKaneki Swagger',
        component: () => import('@/views/benkaneki/BenKanekiSwagger.vue'),
        meta: {
          title: 'Swagger',
          icon: 'mdi-api',
          navSection: 'benkaneki',
          navOrder: 4,
          parent: 'BenKaneki',
          requiresAuth: true,
          requiredRoles: ['USER', 'ADMIN'],
          hideNavIfNoAccess: true,
          robots: 'noindex,nofollow',
          seoTitle: 'Ben Kaneki API Docs — Benwyw',
          seoDescription: 'API documentation for Ben Kaneki Discord Bot.',
          canonicalPath: '/benkaneki/swagger',
        },
      },
      {
        path: '/benkaneki/whityweight',
        name: 'BenKaneki Whity Weight',
        component: () => import('@/views/benkaneki/BenKanekiWhityWeight.vue'),
        meta: {
          title: 'Whity Weight',
          icon: 'mdi-scale-bathroom',
          navSection: 'benkaneki',
          navOrder: 5,
          parent: 'BenKaneki',
          seoTitle: 'Whity Weight — Benwyw',
          seoDescription: 'Track and monitor weight data with Ben Kaneki.',
          canonicalPath: '/benkaneki/whityweight',
        },
      },
      {
        path: '/benkaneki/report',
        name: 'BenKaneki Report',
        component: () => import('@/views/benkaneki/BenKanekiReport.vue'),
        meta: {
          title: 'Report',
          icon: 'mdi-file-chart',
          navSection: 'benkaneki',
          navOrder: 6,
          parent: 'BenKaneki',
          requiresAuth: true,
          requiredRoles: ['USER', 'ADMIN'],
          hideNavIfNoAccess: false,
          robots: 'noindex,nofollow',
          seoTitle: 'Ben Kaneki Reports — Benwyw',
          seoDescription: 'View reports from Ben Kaneki Discord Bot.',
          canonicalPath: '/benkaneki/report',
        },
      },
      {
        path: '/benkaneki/termsofservice',
        name: 'BenKaneki Terms Of Service',
        component: () => import('@/views/benkaneki/BenKanekiTermsOfService.vue'),
        meta: {
          title: 'Terms of Service',
          icon: 'mdi-file-document',
          navSection: 'benkaneki',
          navOrder: 7,
          parent: 'BenKaneki',
          seoTitle: 'Ben Kaneki Terms of Service — Benwyw',
          seoDescription: 'Terms of service for using Ben Kaneki Discord Bot.',
          canonicalPath: '/benkaneki/termsofservice',
        },
      },
      {
        path: '/benkaneki/privacypolicy',
        name: 'BenKaneki Privacy Policy',
        component: () => import('@/views/benkaneki/BenKanekiPrivacyPolicy.vue'),
        meta: {
          title: 'Privacy Policy',
          icon: 'mdi-shield-lock',
          navSection: 'benkaneki',
          navOrder: 8,
          parent: 'BenKaneki',
          seoTitle: 'Ben Kaneki Privacy Policy — Benwyw',
          seoDescription: 'Privacy policy for Ben Kaneki Discord Bot.',
          canonicalPath: '/benkaneki/privacypolicy',
        },
      },

      // ==================== LEGAL SECTION (LEGACY REDIRECTS) ====================
      // Redirect old legal paths to Ben Kaneki section
      {
        path: '/termsofservice',
        name: 'Terms Of Service',
        redirect: '/benkaneki/termsofservice',
        meta: {
          navHidden: true, // Redirect to Ben Kaneki section
        },
      },
      {
        path: '/privacypolicy',
        name: 'Privacy Policy',
        redirect: '/benkaneki/privacypolicy',
        meta: {
          navHidden: true, // Redirect to Ben Kaneki section
        },
      },

      // ==================== AUTH ====================
      // Login is now a global dialog, this route redirects to home
      {
        path: '/login',
        name: 'Login',
        redirect: '/',
        meta: {
          title: 'Login',
          navHidden: true, // Hidden from sidebar navigation
        },
      },

      // ==================== CATCH-ALL ====================
      // Redirect unknown routes to home
      {
        path: '/:pathMatch(.*)*',
        redirect: '/',
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

const CANONICAL_ORIGIN = 'https://www.benwyw.com'

function upsertMeta (name, content) {
  if (!content) {
    return
  }
  let el = document.querySelector(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.append(el)
  }
  el.setAttribute('content', content)
}

function upsertLink (rel, href) {
  if (!href) {
    return
  }
  let el = document.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.append(el)
  }
  el.setAttribute('href', href)
}

router.afterEach(to => {
  document.title = to.meta?.seoTitle || to.meta?.title || 'Benwyw'

  const description = to.meta?.seoDescription
  upsertMeta('description', description || 'Benwyw personal website with projects, tools, and documentation.')

  const canonicalPath = to.meta?.canonicalPath || to.path
  upsertLink('canonical', `${CANONICAL_ORIGIN}${canonicalPath}`)

  const robots = to.meta?.robots
  // If not set, we don't force robots meta here (index.html can provide baseline).
  if (robots) {
    upsertMeta('robots', robots)
  }
})

// Export children for use in layout navigation
export const mainRouteChildren = routes[0].children

export default router
