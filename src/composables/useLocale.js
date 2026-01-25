import { useI18n } from 'vue-i18n'
import { setLocale, availableLocales, getLocale } from '@/plugins/i18n'

/**
 * Composable for easy i18n usage throughout the app
 * Provides translation function, locale management, and available locales
 *
 * @example
 * ```vue
 * <script setup>
 * import { useLocale } from '@/composables/useLocale'
 *
 * const { t, locale, changeLocale, availableLocales } = useLocale()
 * </script>
 *
 * <template>
 *   <p>{{ t('nav.home') }}</p>
 *   <button @click="changeLocale('zh-HK')">Switch to Chinese</button>
 * </template>
 * ```
 */
export function useLocale() {
  const { t, locale } = useI18n()

  function changeLocale(newLocale) {
    setLocale(newLocale)
  }

  return {
    t,
    locale,
    changeLocale,
    getLocale,
    availableLocales,
  }
}
