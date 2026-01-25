import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import zhHK from '@/locales/zh-HK.json'

// Get saved locale from localStorage or default to 'en'
const savedLocale = localStorage.getItem('locale') || 'en'

const i18n = createI18n({
  legacy: false, // Use Composition API mode
  locale: savedLocale,
  fallbackLocale: 'en',
  messages: {
    en,
    'zh-HK': zhHK,
  },
})

export default i18n

// Helper function to change locale and persist to localStorage
export function setLocale(locale) {
  i18n.global.locale.value = locale
  localStorage.setItem('locale', locale)
  document.documentElement.setAttribute('lang', locale)
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
