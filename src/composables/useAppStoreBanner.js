/**
 * App Store Banner Composable
 *
 * Provides reactive state and methods for the custom App Store promotional banner.
 * Handles platform detection, App Store API fetching, and dismissal persistence.
 */

import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useLocale } from '@/composables/useLocale'
import appStoreBannerConfig from '@/config/appStoreBanner'

/**
 * Detect user's platform and browser
 */
function detectPlatform () {
  const ua = navigator.userAgent
  const platform = navigator.platform || ''

  const isMac = /Mac/.test(platform) || /Mac/.test(ua)
  const isWindows = /Win/.test(platform) || /Windows/.test(ua)
  const isLinux = /Linux/.test(platform) && !/Android/.test(ua)
  const isIOS = /iPhone|iPad|iPod/.test(ua)
  const isAndroid = /Android/.test(ua)

  const isSafari = /Safari/.test(ua) && !/Chrome/.test(ua) && !/CriOS/.test(ua) && !/FxiOS/.test(ua)
  const isChrome = /Chrome/.test(ua) || /CriOS/.test(ua)
  const isFirefox = /Firefox/.test(ua) || /FxiOS/.test(ua)

  return {
    isMac,
    isWindows,
    isLinux,
    isIOS,
    isAndroid,
    isSafari,
    isChrome,
    isFirefox,
    isMacSafari: isMac && isSafari,
    isMacOtherBrowser: isMac && !isSafari,
    isIOSSafari: isIOS && isSafari,
    isIOSOtherBrowser: isIOS && !isSafari,
  }
}

/**
 * Check if banner should show based on platform settings
 */
function shouldShowOnPlatform (platform, config) {
  const { targetPlatforms } = config

  // Never show on iOS - native Smart App Banner handles this
  if (platform.isIOS) {
    return false
  }

  if (platform.isMacSafari && targetPlatforms.macSafari) {
    return true
  }
  if (platform.isMacOtherBrowser && targetPlatforms.macOtherBrowsers) {
    return true
  }
  if (platform.isWindows && targetPlatforms.windows) {
    return true
  }
  if (platform.isLinux && targetPlatforms.linux) {
    return true
  }

  return platform.isAndroid && targetPlatforms.android
}

/**
 * Check if banner should show on current route
 */
function shouldShowOnRoute (routePath, config) {
  const { excludedRoutes, includedRoutes } = config

  // If includedRoutes is specified and not empty, only show on those routes
  if (includedRoutes && includedRoutes.length > 0) {
    return includedRoutes.some(route => routePath.startsWith(route))
  }

  // Otherwise, show on all routes except excluded ones
  return !excludedRoutes.some(route => routePath === route || routePath.startsWith(route + '/'))
}

/**
 * Get current dismiss count from localStorage
 */
function getDismissCount (config) {
  try {
    const count = localStorage.getItem(config.dismissCountKey)
    return count ? Number.parseInt(count, 10) : 0
  } catch {
    return 0
  }
}

/**
 * Get dismissal duration based on dismiss count (progressive)
 */
function getDismissDuration (config, dismissCount) {
  const { dismissDurations } = config
  // Use the last duration for any dismissals beyond the array length
  const index = Math.min(dismissCount, dismissDurations.length - 1)
  return dismissDurations[index] || 7 // fallback to 7 days
}

/**
 * Check if banner was recently dismissed (with progressive duration)
 */
function isDismissed (config) {
  try {
    const dismissedAt = localStorage.getItem(config.dismissStorageKey)
    if (!dismissedAt) {
      return false
    }

    const dismissCount = getDismissCount(config)
    const dismissDuration = getDismissDuration(config, dismissCount - 1) // -1 because count was already incremented

    const dismissedDate = new Date(Number.parseInt(dismissedAt, 10))
    const now = new Date()
    const daysSinceDismissal = (now - dismissedDate) / (1000 * 60 * 60 * 24)

    return daysSinceDismissal < dismissDuration
  } catch {
    return false
  }
}

/**
 * Save dismissal timestamp and increment dismiss count
 */
function saveDismissal (config) {
  try {
    // Increment dismiss count
    const currentCount = getDismissCount(config)
    localStorage.setItem(config.dismissCountKey, (currentCount + 1).toString())

    // Save dismissal timestamp
    localStorage.setItem(config.dismissStorageKey, Date.now().toString())
  } catch {
    // Ignore localStorage errors
  }
}

/**
 * Resolve App Store country code from locale
 */
function getCountryCodeForLocale (localeValue, config) {
  const normalized = (localeValue || '').toLowerCase()
  if (normalized === 'zh-hk') {
    return 'hk'
  }
  if (normalized.startsWith('en')) {
    return 'us'
  }
  return config.countryCode
}

function resolveTranslatedText (t, key) {
  const value = t(key)
  return value === key ? null : value
}

/**
 * Fetch app data from iTunes Lookup API
 */
async function fetchAppStoreData (config, countryCode) {
  if (!config.fetchFromAppStore) {
    return null
  }

  try {
    // Use iTunes Lookup API - this is a public Apple API
    const url = `${config.appStoreLookupUrl}?id=${config.appId}&country=${countryCode}`

    // Note: This API has CORS restrictions, so we use a simple fetch
    // In production, you might need a proxy or use the fallback data
    const response = await fetch(url)

    if (!response.ok) {
      console.warn('[AppStoreBanner] Failed to fetch from iTunes API:', response.status)
      return null
    }

    const data = await response.json()

    if (!data.results || data.results.length === 0) {
      console.warn('[AppStoreBanner] No results from iTunes API')
      return null
    }

    const app = data.results[0]

    return {
      appName: app.trackName || config.fallbackData.appName,
      appSubtitle: app.subtitle || null,
      appDescription: app.description?.slice(0, 100) + '...' || config.fallbackData.appDescription,
      appIcon: app.artworkUrl512 || app.artworkUrl100 || config.fallbackData.appIcon,
      appPrice: app.formattedPrice || (app.price === 0 ? 'Free' : `$${app.price}`),
      appRating: app.averageUserRating?.toFixed(1) || config.fallbackData.appRating,
      sellerName: app.sellerName || config.fallbackData.sellerName,
      ratingCount: app.userRatingCount || 0,
    }
  } catch (error) {
    console.warn('[AppStoreBanner] Error fetching App Store data:', error.message)
    return null
  }
}

/**
 * Main composable for App Store Banner
 */
export function useAppStoreBanner () {
  const route = useRoute()
  const config = appStoreBannerConfig
  const { locale, t } = useLocale()

  // Reactive state
  const isVisible = ref(false)
  const isLoading = ref(true)
  const appData = ref(null)
  const platform = ref(null)

  // Computed properties
  const shouldShow = computed(() => {
    if (!config.enabled) {
      return false
    }
    if (!platform.value) {
      return false
    }
    if (!shouldShowOnPlatform(platform.value, config)) {
      return false
    }
    if (!shouldShowOnRoute(route.path, config)) {
      return false
    }
    return !isDismissed(config)
  })

  const appearance = computed(() => config.appearance)
  const countryCode = computed(() => getCountryCodeForLocale(locale.value, config))
  const translatedSubtitle = computed(() => resolveTranslatedText(t, 'appStoreBanner.subtitle'))
  const translatedButtonText = computed(() => resolveTranslatedText(t, 'appStoreBanner.viewButton'))
  const translatedAvailableOnText = computed(() => resolveTranslatedText(t, 'appStoreBanner.availableOn'))

  const displayData = computed(() => {
    const data = appData.value || config.fallbackData
    const storeSubtitle = appData.value?.appSubtitle || null
    const descriptionFallback = appData.value?.appDescription || config.fallbackData.appDescription

    return {
      appName: config.textOverrides.appName || data.appName,
      description: config.textOverrides.description || storeSubtitle || translatedSubtitle.value || descriptionFallback,
      appIcon: data.appIcon,
      appPrice: data.appPrice,
      appRating: data.appRating,
      ratingCount: data.ratingCount || 0,
      buttonText: config.textOverrides.buttonText || translatedButtonText.value || 'View',
      availableOnText: config.textOverrides.availableOnText || translatedAvailableOnText.value || 'Available on the App Store',
      appStoreUrl: config.appStoreUrl,
    }
  })

  // Methods
  const dismiss = () => {
    isVisible.value = false
    saveDismissal(config)
  }

  const initialize = async () => {
    isLoading.value = true

    // Detect platform
    platform.value = detectPlatform()

    // Fetch app data (or use fallback)
    appData.value = await fetchAppStoreData(config, countryCode.value)

    // Show banner if conditions are met
    isVisible.value = shouldShow.value

    isLoading.value = false
  }

  // Initialize on mount
  onMounted(() => {
    // Small delay to not block initial render
    setTimeout(initialize, 500)
  })

  watch(locale, async () => {
    if (!config.fetchFromAppStore) {
      return
    }

    isLoading.value = true
    appData.value = await fetchAppStoreData(config, countryCode.value)
    isVisible.value = shouldShow.value
    isLoading.value = false
  })

  return {
    isVisible,
    isLoading,
    displayData,
    appearance,
    platform,
    dismiss,
    config,
  }
}
