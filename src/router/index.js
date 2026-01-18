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
 * @property {string} externalLink - External URL to open in new tab (optional)
 *   - When set, clicking the nav item opens this URL in a new browser tab
 *   - Shows an external link icon (mdi-open-in-new) as indicator
 *   - No component needed for the route when using this
 *   - Example: externalLink: 'https://example.com/page'
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
          iconImage: new URL('@/assets/NoteFormat-120-transparent.png', import.meta.url).href,
          navSection: 'noteformat',
          navOrder: 1,
          defaultExpanded: true,
          seoTitle: 'NoteFormat - Expense Formatter | Flexible Import/Export for iOS',
          seoDescription: 'NoteFormat – Your Smart Note & Expense Companion. Flexible expense import/export with custom templates. Track spending, budgets, and reports. Free on the App Store with iCloud sync.',
          seoKeywords: 'NoteFormat, expense formatter, flexible import export, iOS app, expense tracker, note taking, budget tracker, iCloud sync, CSV export, Siri shortcuts, Game Center, free iOS app',
          seoImage: 'https://www.benwyw.com/assets/NoteFormat-seo.png',
          canonicalPath: '/noteformat',
          ogType: 'website',
          structuredData: {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'NoteFormat iOS App',
            description: 'NoteFormat – Your Smart Note & Expense Companion for iOS. Capture expenses, format them with templates, and import/export easily. Track spending, budgets and reports.',
            url: 'https://www.benwyw.com/noteformat',
            mainEntity: {
              '@type': 'SoftwareApplication',
              name: 'NoteFormat',
              operatingSystem: 'iOS',
              applicationCategory: 'FinanceApplication',
              downloadUrl: 'https://apps.apple.com/app/noteformat/id6756885265',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              featureList: [
                'Notes & Expense Tracking with categories and tags',
                'Budget Management (daily, weekly, monthly, yearly)',
                'Flexible Import & Export with custom templates',
                'CSV Reports and spending analytics',
                'Siri Shortcuts integration',
                'iCloud Sync across devices',
                'Face ID / Touch ID app lock (Pro)',
                'Game Center achievements and leaderboards',
              ],
            },
          },
        },
      },
      {
        path: '/noteformat/eula',
        name: 'Noteformat EULA',
        // No component needed - external link handled by sidebar
        meta: {
          title: 'EULA',
          icon: 'mdi-file-document-outline',
          externalLink: 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/',
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
          seoTitle: 'NoteFormat Privacy Policy — Your Data Stays on Your Device',
          seoDescription: 'NoteFormat privacy policy. Your data stays on your device with optional iCloud sync. Face ID/Touch ID app lock available with Pro. Simple, private, and secure expense tracking.',
          seoKeywords: 'NoteFormat privacy, iOS app privacy policy, iCloud sync privacy, data protection, Face ID lock, Touch ID, secure expense tracker',
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
          seoTitle: 'NoteFormat Tutorials — Learn to Track Expenses & Create Budgets',
          seoDescription: 'Step-by-step tutorials for NoteFormat iOS app. Learn to add notes with amounts, create budgets with alerts, use custom templates, import/export data, set up Siri shortcuts, and generate spending reports.',
          seoKeywords: 'NoteFormat tutorial, expense tracking guide, budget setup tutorial, iOS note app help, CSV export guide, Siri shortcuts setup, template customization',
          canonicalPath: '/noteformat/tutorials',
          structuredData: {
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Use NoteFormat iOS App',
            description: 'Learn to track expenses, create budgets, and generate reports with NoteFormat.',
            step: [
              { '@type': 'HowToStep', position: 1, name: 'Add Notes', text: 'Add notes with optional amounts (expense or income), organize with categories and tags, use quick add mode for rapid entry.' },
              { '@type': 'HowToStep', position: 2, name: 'Create Budgets', text: 'Create daily, weekly, monthly, or yearly budgets. Set spending alerts at custom thresholds and track progress visually.' },
              { '@type': 'HowToStep', position: 3, name: 'Use Templates', text: 'Choose built-in templates (Simple, Full Notes, Detailed, CSV, Markdown) or create custom templates with placeholders.' },
              { '@type': 'HowToStep', position: 4, name: 'Export Data', text: 'Export formatted text, save to Apple Notes, share via system share sheet, or export CSV reports.' },
            ],
          },
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
          seoTitle: 'NoteFormat Docs & FAQ — Help for iOS Expense & Note App',
          seoDescription: 'NoteFormat documentation and FAQ. Learn about iCloud sync, budget alerts, Siri shortcuts, custom templates, CSV exports, Game Center achievements, Pro features, and more.',
          seoKeywords: 'NoteFormat FAQ, NoteFormat help, iOS expense tracker FAQ, budget alerts help, Siri shortcuts, CSV export, Pro features, Face ID lock',
          canonicalPath: '/noteformat/docs',
          structuredData: {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              { '@type': 'Question', name: 'What is NoteFormat?', acceptedAnswer: { '@type': 'Answer', text: 'NoteFormat is your Smart Note & Expense Companion for iOS. Capture expenses, format them with templates, and import/export easily. Track spending, budgets and reports—simple, private, and beautiful.' } },
              { '@type': 'Question', name: 'Is my data synced across devices?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! Enable iCloud sync in Settings to sync your notes, categories, templates, and budgets across all your Apple devices signed into the same iCloud account.' } },
              { '@type': 'Question', name: 'Does NoteFormat support Siri?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! Use Siri Shortcuts like "Add a note" for quick entry or "Get my report" for instant spending summaries. Works with Shortcuts app automations.' } },
              { '@type': 'Question', name: 'What export formats are available?', acceptedAnswer: { '@type': 'Answer', text: 'NoteFormat offers built-in templates: Simple, Full Notes, Detailed, CSV, and Markdown. You can also create custom templates with placeholders like {date}, {category}, {content}, {amount}, {tags}, and {currency}.' } },
              { '@type': 'Question', name: 'Is NoteFormat free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, core features are free with ads. Watch rewarded ads to export entries (1 CSV export/day free). Upgrade to Pro for ad-free experience, unlimited exports, custom themes, biometric lock, and detailed reports.' } },
            ],
          },
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
          iconImage: new URL('@/assets/BenKaneki-120.png', import.meta.url).href,
          navSection: 'benkaneki',
          navOrder: 1,
          defaultExpanded: true,
          seoTitle: 'Ben Kaneki Discord Bot — Benwyw',
          seoDescription: 'Ben Kaneki Discord Bot - A multi-purpose bot with web dashboard for utilities and automation.',
          seoImage: 'https://www.benwyw.com/assets/BenKaneki-seo.png',
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

      // ==================== Ben's Minecraft Server SECTION ====================
      // Ben's Minecraft Server (Deprecated) - preserved history and information
      {
        path: '/mcbenwywcom',
        name: 'McBenwywCom',
        component: () => import('@/views/mcbenwywcom/McBenwywComLanding.vue'),
        meta: {
          title: 'Ben\'s Minecraft Server',
          iconImage: new URL('@/assets/mcbenwywcom/mcbenwywcom_fullsize-1000.webp', import.meta.url).href,
          navSection: 'mcbenwywcom',
          navOrder: 1,
          defaultExpanded: true,
          seoTitle: 'Ben\'s Minecraft Server — Benwyw',
          seoDescription: "Ben's Minecraft Server - A deprecated Minecraft Java Edition server preserved for historical purposes.",
          seoImage: 'https://www.benwyw.com/assets/mcbenwywcom/mcbenwywcom_logo.png',
          canonicalPath: '/mcbenwywcom',
        },
      },
      {
        path: '/mcbenwywcom/about',
        name: 'McBenwywCom About',
        component: () => import('@/views/mcbenwywcom/McBenwywComAbout.vue'),
        meta: {
          title: 'About',
          icon: 'mdi-information',
          navSection: 'mcbenwywcom',
          navOrder: 1,
          parent: 'McBenwywCom',
          seoTitle: 'Ben\'s Minecraft Server About — Benwyw',
          seoDescription: "About page for Ben's Minecraft Server with server information and gallery.",
          canonicalPath: '/mcbenwywcom/about',
        },
      },
      {
        path: '/mcbenwywcom/staff',
        name: 'McBenwywCom Staff',
        component: () => import('@/views/mcbenwywcom/McBenwywComStaff.vue'),
        meta: {
          title: 'Staff List',
          icon: 'mdi-account-group',
          navSection: 'mcbenwywcom',
          navOrder: 2,
          parent: 'McBenwywCom',
          seoTitle: 'Ben\'s Minecraft Server Staff List — Benwyw',
          seoDescription: "Staff list for Ben's Minecraft Server - meet the team behind Ben\'s Minecraft Server.",
          canonicalPath: '/mcbenwywcom/staff',
        },
      },
      {
        path: '/mcbenwywcom/buildings',
        name: 'McBenwywCom Buildings',
        component: () => import('@/views/mcbenwywcom/McBenwywComBuildings.vue'),
        meta: {
          title: 'Buildings',
          icon: 'mdi-domain',
          navSection: 'mcbenwywcom',
          navOrder: 3,
          parent: 'McBenwywCom',
          navHidden: true, // Hidden for future development
          seoTitle: 'Ben\'s Minecraft Server Buildings — Benwyw',
          seoDescription: "Great buildings showcase from Ben's Minecraft Server.",
          canonicalPath: '/mcbenwywcom/buildings',
        },
      },
      {
        path: '/mcbenwywcom/events',
        name: 'McBenwywCom Events',
        component: () => import('@/views/mcbenwywcom/McBenwywComEvents.vue'),
        meta: {
          title: 'Events',
          icon: 'mdi-calendar-star',
          navSection: 'mcbenwywcom',
          navOrder: 4,
          parent: 'McBenwywCom',
          navHidden: true, // Hidden for future development
          seoTitle: 'Ben\'s Minecraft Server Events — Benwyw',
          seoDescription: "Past events from Ben's Minecraft Server history.",
          canonicalPath: '/mcbenwywcom/events',
        },
      },

      // ==================== WHITY (CAT MEMORIAL) ====================
      // A loving tribute to Whity / 小白 (12 Jul 2019 - 29 Dec 2024)
      {
        path: '/whity',
        name: 'Whity',
        component: () => import('@/views/cat/CatLanding.vue'),
        meta: {
          title: 'Whity 🕊️',
          iconImage: new URL('@/assets/cat/Whity_icon_64.webp', import.meta.url).href,
          navSection: 'main',
          navOrder: 2,
          glowEffect: 'angel', // Options: 'angel' | 'angel-soft' | 'pulse' | false
          seoTitle: 'Whity — In Loving Memory (2019-2024)',
          seoDescription: 'A tribute to Whity (小白), my beloved cat (12 Jul 2019 - 29 Dec 2024). Forever loved, forever missed. View photos, memories, and a heartfelt memorial.',
          seoImage: 'https://www.benwyw.com/assets/cat/Whity_hero.webp',
          seoKeywords: 'Whity, cat memorial, 小白, pet tribute, in loving memory, beloved cat',
          canonicalPath: '/whity',
          ogType: 'article',
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

// Import SEO composable
import { updateSeoMeta, generateBreadcrumbData, generateFaqData } from '@/composables/useSeoMeta'

router.afterEach(to => {
  // Use the enhanced SEO meta composable with matched routes for image inheritance
  updateSeoMeta(to.meta, to.path, to.matched)
})

// Export children for use in layout navigation
export const mainRouteChildren = routes[0].children

export default router
