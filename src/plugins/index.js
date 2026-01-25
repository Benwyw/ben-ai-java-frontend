/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

import router from '../router'
import vuetify from './vuetify'
import i18n from './i18n'
// Plugins
import { loadFonts } from './webfontloader'

export function registerPlugins (app) {
  loadFonts()
  app
    .use(vuetify)
    .use(router)
    .use(i18n)
}
