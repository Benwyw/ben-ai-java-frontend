import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import zhHK from '@/locales/zh-HK.json'

// Valid locales
const validLocales = ['en', 'zh-HK']

// Check URL query parameter for locale (for shared links)
function getLocaleFromUrl() {
  const urlParams = new URLSearchParams(window.location.search)
  const langParam = urlParams.get('lang')
  if (langParam && validLocales.includes(langParam)) {
    return langParam
  }
  return null
}

// Get locale priority: URL param > localStorage > default 'en'
function getInitialLocale() {
  const urlLocale = getLocaleFromUrl()
  if (urlLocale) {
    // If URL has lang param, save it to localStorage for persistence
    localStorage.setItem('locale', urlLocale)
    return urlLocale
  }
  return localStorage.getItem('locale') || 'en'
}

const savedLocale = getInitialLocale()

const i18n = createI18n({
  legacy: false, // Use Composition API mode
  locale: savedLocale,
  fallbackLocale: 'en',
  messages: {
    en,
    'zh-HK': zhHK,
  },
})

// Set lang attribute on document
document.documentElement.setAttribute('lang', savedLocale)

// Sync URL with current locale on initial load (if not already in URL)
// This ensures the URL reflects the user's language preference
if (!getLocaleFromUrl() && savedLocale !== 'en') {
  // Delay slightly to ensure the page is ready
  setTimeout(() => {
    const url = new URL(window.location.href)
    url.searchParams.set('lang', savedLocale)
    window.history.replaceState({}, '', url.toString())
  }, 0)
}

export default i18n

// Helper function to change locale and persist to localStorage
export function setLocale(locale) {
  i18n.global.locale.value = locale
  localStorage.setItem('locale', locale)
  document.documentElement.setAttribute('lang', locale)

  // Update URL with lang parameter (without page reload)
  updateUrlLocale(locale)
}

// Helper function to update URL with locale parameter
export function updateUrlLocale(locale) {
  const url = new URL(window.location.href)
  if (locale === 'en') {
    // Remove lang param for default English (cleaner URLs)
    url.searchParams.delete('lang')
  } else {
    url.searchParams.set('lang', locale)
  }
  window.history.replaceState({}, '', url.toString())
}

// Helper function to get shareable URL with current locale
export function getShareableUrl(locale = null) {
  const currentLocale = locale || i18n.global.locale.value
  const url = new URL(window.location.href)

  if (currentLocale === 'en') {
    url.searchParams.delete('lang')
  } else {
    url.searchParams.set('lang', currentLocale)
  }

  return url.toString()
}

// Helper function to get current locale
export function getLocale() {
  return i18n.global.locale.value
}

// Available locales for the language switcher
export const availableLocales = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'zh-HK', name: '繁體中文', flag: '🇭🇰' },
]
