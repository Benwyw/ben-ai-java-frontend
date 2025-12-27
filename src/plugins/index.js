/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

import router from '../router'
import vuetify from './vuetify'
// Plugins
import { loadFonts } from './webfontloader'

export function registerPlugins (app) {
  loadFonts()
  app
    .use(vuetify)
    .use(router)
}
