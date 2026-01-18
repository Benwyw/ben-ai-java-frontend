/**
 * App Store Smart Banner Configuration
 *
 * This file controls the custom promotional banner for macOS Safari users.
 * The native `apple-itunes-app` meta tag only works on iOS Safari.
 *
 * MAINTENANCE:
 * - Set `enabled` to false to disable the banner entirely
 * - Modify `fallbackData` if App Store API fetch fails
 * - Adjust `fetchFromAppStore` to toggle live data fetching
 * - `dismissDurationDays` controls how long the banner stays hidden after dismissal
 */

export const appStoreBannerConfig = {
  /**
   * Master toggle - set to false to completely disable the banner
   * Disabled because macOS Safari now shows the native Smart App Banner
   */
  enabled: true,

  /**
   * App Store App ID (same as in your apple-itunes-app meta tag)
   */
  appId: '6756885265',

  /**
   * App Store URL
   */
  appStoreUrl: 'https://apps.apple.com/app/noteformat/id6756885265',

  /**
   * Deep link / app-argument URL (used when app is installed)
   */
  appArgument: 'https://www.benwyw.com/noteformat',

  /**
   * Whether to attempt fetching live data from App Store API
   * Set to false to always use fallbackData (more reliable, less maintenance)
   */
  fetchFromAppStore: true,

  /**
   * iTunes Lookup API endpoint (Apple's public API)
   * This fetches app metadata including name, description, icon, etc.
   */
  appStoreLookupUrl: 'https://itunes.apple.com/lookup',

  /**
   * Country code for App Store lookup (affects pricing, availability)
   */
  countryCode: 'us',

  /**
   * Progressive dismissal durations (in days)
   * Each subsequent dismiss hides the banner for longer
   * - 1st dismiss: 3 days
   * - 2nd dismiss: 14 days
   * - 3rd+ dismiss: 30 days
   *
   * To manually reset dismissal for testing, run in browser console:
   *   localStorage.removeItem('appStoreBanner_dismissed')
   *   localStorage.removeItem('appStoreBanner_dismissCount')
   */
  dismissDurations: [3, 14, 30],

  /**
   * LocalStorage keys for storing dismissal data
   */
  dismissStorageKey: 'appStoreBanner_dismissed',
  dismissCountKey: 'appStoreBanner_dismissCount',

  /**
   * Fallback data used when:
   * - App Store API fetch fails
   * - fetchFromAppStore is set to false
   * - Network is unavailable
   *
   * UPDATE THIS when your app details change significantly
   */
  fallbackData: {
    appName: 'NoteFormat',
    appSubtitle: 'Expense Formatter',
    appDescription: 'Flexible Expense Import/Export. Track spending, budgets and reports.',
    appIcon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/9a/3d/3a/9a3d3a1d-8b8b-6e7a-3a3a-8b8b6e7a3a3a/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg',
    appPrice: 'Free',
    appRating: '5.0',
    sellerName: 'WU Yat Wing',
  },

  /**
   * Banner appearance settings
   */
  appearance: {
    /**
     * Background gradient colors (Vuetify classes or custom)
     */
    backgroundColor: 'surface-variant',

    /**
     * Primary action button color
     */
    buttonColor: 'primary',

    /**
     * Show app rating stars
     */
    showRating: true,

    /**
     * Show price badge
     */
    showPrice: true,

    /**
     * Icon size in pixels
     */
    iconSize: 48,
  },

  /**
   * Custom text overrides (set to null to use App Store data)
   * Use these to customize the banner text without changing App Store listing
   */
  textOverrides: {
    /**
     * Override the app name displayed in banner
     * Set to null to use App Store data
     */
    appName: null,

    /**
     * Override the description/subtitle
     * Set to null to use App Store data
     */
    description: null,

    /**
     * Custom call-to-action button text
     */
    buttonText: 'View',

    /**
     * Custom "Available on" text
     */
    availableOnText: 'Available on the App Store',
  },

  /**
   * Target platforms - which platforms should show the banner
   * The banner automatically detects the platform
   *
   * NOTE: iOS is always excluded - the native Smart App Banner meta tag handles iOS
   */
  targetPlatforms: {
    /**
     * Show on macOS Safari (main use case since native banner doesn't work)
     */
    macSafari: true,

    /**
     * Show on macOS Chrome/Firefox/other browsers
     */
    macOtherBrowsers: true,

    /**
     * Show on Windows browsers (for users who might have iPhone)
     */
    windows: false,

    /**
     * Show on Linux browsers
     */
    linux: false,


    /**
     * Show on Android (for users who might be interested)
     */
    android: false,
  },

  /**
   * Routes where the banner should NOT appear
   * Add paths here to hide banner on specific pages
   */
  excludedRoutes: [
    '/login',
    '/noteformat', // Already has prominent App Store links
    '/noteformat/eula',
    '/noteformat/privacy',
    '/noteformat/tutorials',
    '/noteformat/docs',
  ],

  /**
   * Routes where the banner SHOULD appear (if empty, appears on all non-excluded routes)
   * Leave empty [] to show on all routes except excludedRoutes
   */
  includedRoutes: [],
}

export default appStoreBannerConfig
