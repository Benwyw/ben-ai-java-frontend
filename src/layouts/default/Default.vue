<template>
  <v-app>
    <!-- App Store Promotional Banner (for macOS Safari/Desktop users) -->
    <AppStoreBanner />

    <!-- Modern Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      :permanent="!mobile"
      :rail="!mobile && rail"
      :temporary="mobile"
    >
      <v-list-item
        nav
        :prepend-avatar="benwywIcon"
      >
        <template v-if="!rail">
          <v-list-item-title class="text-h6 font-weight-bold">
            Benwyw
          </v-list-item-title>
          <v-list-item-subtitle>{{ t('common.developmentWebsite') }}</v-list-item-subtitle>
        </template>
      </v-list-item>

      <v-divider />

      <!-- MAIN Section -->
      <v-list
        v-model:opened="openedGroups"
        density="compact"
        nav
        open-strategy="multiple"
      >
        <SidebarNavItem
          v-for="item in mainSectionItems"
          :key="item.name"
          :children="childrenMap.get(item.name) || []"
          :children-map="childrenMap"
          :depth="0"
          :is-locked-fn="isItemLocked"
          :is-open-fn="isOpen"
          :item="item"
          :on-chevron-click-fn="onChevronClick"
          :on-parent-click-fn="onParentClick"
          :rail="rail"
        />
      </v-list>

      <v-divider />

      <!-- TOOLS Section -->
      <!--      <v-list-->
      <!--        v-model:opened="openedGroups"-->
      <!--        density="compact"-->
      <!--        nav-->
      <!--        open-strategy="multiple"-->
      <!--      >-->
      <!--        <v-list-subheader v-if="!rail">TOOLS</v-list-subheader>-->
      <!--        <SidebarNavItem-->
      <!--          v-for="item in toolsSectionItems"-->
      <!--          :key="item.name"-->
      <!--          :children="childrenMap.get(item.name) || []"-->
      <!--          :children-map="childrenMap"-->
      <!--          :depth="0"-->
      <!--          :is-locked-fn="isItemLocked"-->
      <!--          :is-open-fn="isOpen"-->
      <!--          :item="item"-->
      <!--          :on-chevron-click-fn="onChevronClick"-->
      <!--          :on-parent-click-fn="onParentClick"-->
      <!--        />-->
      <!--      </v-list>-->

      <!--      <v-divider />-->

      <!-- LEGAL Section -->
      <!--      <v-list-->
      <!--        v-model:opened="openedGroups"-->
      <!--        density="compact"-->
      <!--        nav-->
      <!--        open-strategy="multiple"-->
      <!--      >-->
      <!--        <v-list-subheader v-if="!rail">LEGAL</v-list-subheader>-->
      <!--        <SidebarNavItem-->
      <!--          v-for="item in legalSectionItems"-->
      <!--          :key="item.name"-->
      <!--          :children="childrenMap.get(item.name) || []"-->
      <!--          :children-map="childrenMap"-->
      <!--          :depth="0"-->
      <!--          :is-locked-fn="isItemLocked"-->
      <!--          :is-open-fn="isOpen"-->
      <!--          :item="item"-->
      <!--          :on-chevron-click-fn="onChevronClick"-->
      <!--          :on-parent-click-fn="onParentClick"-->
      <!--        />-->
      <!--      </v-list>-->

      <!--      <v-divider />-->

      <!-- NOTEFORMAT Section -->
      <v-list
        v-model:opened="openedGroups"
        density="compact"
        nav
        open-strategy="multiple"
      >
        <v-list-subheader v-if="!rail">NOTEFORMAT</v-list-subheader>
        <SidebarNavItem
          v-for="item in noteformatSectionItems"
          :key="item.name"
          :children="childrenMap.get(item.name) || []"
          :children-map="childrenMap"
          :depth="0"
          :is-locked-fn="isItemLocked"
          :is-open-fn="isOpen"
          :item="item"
          :on-chevron-click-fn="onChevronClick"
          :on-parent-click-fn="onParentClick"
          :rail="rail"
        />
      </v-list>

      <v-divider />

      <!-- BEN KANEKI Section -->
      <v-list
        v-model:opened="openedGroups"
        density="compact"
        nav
        open-strategy="multiple"
      >
        <v-list-subheader v-if="!rail">BEN KANEKI</v-list-subheader>
        <SidebarNavItem
          v-for="item in benkanekiSectionItems"
          :key="item.name"
          :children="childrenMap.get(item.name) || []"
          :children-map="childrenMap"
          :depth="0"
          :is-locked-fn="isItemLocked"
          :is-open-fn="isOpen"
          :item="item"
          :on-chevron-click-fn="onChevronClick"
          :on-parent-click-fn="onParentClick"
          :rail="rail"
        />
      </v-list>

      <v-divider />

      <!-- MC.BENWYW.COM Section -->
      <v-list
        v-model:opened="openedGroups"
        density="compact"
        nav
        open-strategy="multiple"
      >
        <v-list-subheader v-if="!rail">BEN'S MINECRAFT SERVER</v-list-subheader>
        <SidebarNavItem
          v-for="item in mcbenwywcomSectionItems"
          :key="item.name"
          :children="childrenMap.get(item.name) || []"
          :children-map="childrenMap"
          :depth="0"
          :is-locked-fn="isItemLocked"
          :is-open-fn="isOpen"
          :item="item"
          :on-chevron-click-fn="onChevronClick"
          :on-parent-click-fn="onParentClick"
          :rail="rail"
        />
      </v-list>

      <!--      &lt;!&ndash; PRODUCTS Section (for future apps) &ndash;&gt;-->
      <!--      <v-list-->
      <!--        v-model:opened="openedGroups"-->
      <!--        density="compact"-->
      <!--        nav-->
      <!--        open-strategy="multiple"-->
      <!--      >-->
      <!--        <v-list-subheader v-if="!rail">PRODUCTS</v-list-subheader>-->
      <!--        <SidebarNavItem-->
      <!--          v-for="item in productsSectionItems"-->
      <!--          :key="item.name"-->
      <!--          :children="childrenMap.get(item.name) || []"-->
      <!--          :children-map="childrenMap"-->
      <!--          :depth="0"-->
      <!--          :is-locked-fn="isItemLocked"-->
      <!--          :is-open-fn="isOpen"-->
      <!--          :item="item"-->
      <!--          :on-chevron-click-fn="onChevronClick"-->
      <!--          :on-parent-click-fn="onParentClick"-->
      <!--        />-->
      <!--      </v-list>-->

      <!--      <v-divider />-->

      <template #append>
        <v-list v-if="!mobile" density="compact" nav>
          <v-list-item
            :prepend-icon="rail ? 'mdi-chevron-right' : 'mdi-chevron-left'"
            :title="t('nav.collapse')"
            @click.stop="rail = !rail"
          />
        </v-list>
      </template>
    </v-navigation-drawer>

    <!-- Modern App Bar -->
    <v-app-bar class="border-b" flat>
      <template #prepend>
        <v-app-bar-nav-icon @click.stop="mobile ? drawer = !drawer : rail = !rail" />
      </template>

      <v-app-bar-title class="text-truncate">
        <v-breadcrumbs
          class="pa-0"
          density="compact"
          :items="breadcrumbs"
        >
          <template #divider>
            <v-icon icon="mdi-chevron-right" size="small" />
          </template>
          <template #item="{ item }">
            <v-breadcrumbs-item
              class="text-truncate"
              :disabled="item.disabled"
              :to="item.to"
            >
              {{ item.title }}
            </v-breadcrumbs-item>
          </template>
        </v-breadcrumbs>
      </v-app-bar-title>

      <template #append>
        <v-btn
          href="https://www.hko.gov.hk/tc/"
          icon="mdi-weather-partly-cloudy"
          :size="mobile ? 'small' : 'default'"
          target="_blank"
          variant="text"
        />
        <v-btn
          :icon="isDark ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          :size="mobile ? 'small' : 'default'"
          variant="text"
          @click="toggleTheme"
        />
        <v-menu>
          <template #activator="{ props }">
            <v-btn
              v-bind="props"
              icon
              :size="mobile ? 'small' : 'default'"
              variant="text"
            >
              <v-icon>mdi-translate</v-icon>
            </v-btn>
          </template>
          <v-list density="compact">
            <v-list-item
              v-for="loc in availableLocales"
              :key="loc.code"
              :active="locale === loc.code"
              @click="changeLocale(loc.code)"
            >
              <template #prepend>
                <span class="mr-2">{{ loc.flag }}</span>
              </template>
              <v-list-item-title>{{ loc.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu>
          <template #activator="{ props }">
            <v-btn
              v-bind="props"
              :icon="!isLoggedIn"
              :size="mobile ? 'small' : 'default'"
              variant="text"
            >
              <v-icon v-if="!isLoggedIn">mdi-account-circle</v-icon>
              <template v-else>
                <v-icon class="mr-1">mdi-account-circle</v-icon>
                <span v-if="!mobile" class="text-truncate" style="max-width: 120px;">{{ username }}</span>
              </template>
            </v-btn>
          </template>
          <v-list>
            <template v-if="isLoggedIn">
              <v-list-item v-if="mobile">
                <v-list-item-title class="font-weight-medium">{{ username }}</v-list-item-title>
              </v-list-item>
              <v-divider v-if="mobile" />
              <v-list-item
                :disabled="isLoggingOut"
                prepend-icon="mdi-logout"
                :title="t('auth.logout')"
                @click="handleLogout"
              >
                <template #append>
                  <v-progress-circular
                    v-if="isLoggingOut"
                    indeterminate
                    size="16"
                    width="2"
                  />
                </template>
              </v-list-item>
            </template>
            <v-list-item
              v-else
              prepend-icon="mdi-login"
              :title="t('auth.login')"
              @click="openLoginDialog"
            />
          </v-list>
        </v-menu>
      </template>
    </v-app-bar>

    <!-- Main Content -->
    <v-main :class="isDark ? 'bg-grey-darken-4' : 'bg-grey-lighten-4'">
      <v-container :class="mobile ? 'pa-3' : 'pa-6'" fluid>
        <router-view />
      </v-container>
    </v-main>

    <!-- Modern Footer -->
    <v-footer app class="bg-surface border-t">
      <v-row justify="center" no-gutters>
        <v-col class="text-center" cols="12">
          <div class="mb-2">
            <v-btn class="mx-1" size="small" :to="{ path: '/about' }" variant="text">{{ t('nav.about') }}</v-btn>
            <v-btn class="mx-1" size="small" :to="{ path: '/guides' }" variant="text">{{ t('nav.guides') }}</v-btn>
            <v-btn class="mx-1" size="small" :to="{ path: '/privacy' }" variant="text">{{ t('nav.privacy') }}</v-btn>
            <v-btn
              append-icon="mdi-open-in-new"
              class="mx-1"
              size="small"
              variant="text"
              @click="openInNewTab('/noteformat/eula')"
            >{{ t('nav.terms') }}</v-btn>
            <v-btn
              append-icon="mdi-heart"
              class="mx-1"
              color="pink"
              href="https://www.paypal.com/ncp/payment/QA5VGCEU9VMKU"
              rel="noopener"
              size="small"
              target="_blank"
              variant="text"
            >
              {{ t('nav.support') }}
            </v-btn>
          </div>
          <span class="text-body-2 text-medium-emphasis">
            {{ t('common.copyright', { year: new Date().getFullYear() }) }}
          </span>
        </v-col>
      </v-row>
    </v-footer>

    <!-- Session Expiry Warning Dialog -->
    <v-dialog v-model="sessionWarning.show" persistent width="400">
      <v-card>
        <v-card-title class="text-h5 d-flex align-center justify-space-between">
          <div>
            <v-icon class="mr-2" color="warning">mdi-timer-alert</v-icon>
            {{ t('session.expiringTitle') }}
          </div>
          <v-btn icon size="small" variant="text" @click="minimizeSessionWarning">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="text-body-1">
          Your session will expire in <b>{{ sessionWarning.timeLeft }}</b> seconds.<br>
          Would you like to prolong your session?
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" :loading="sessionWarning.refreshing" variant="flat" @click="prolongSession">Prolong Session</v-btn>
          <v-btn color="secondary" variant="text" @click="handleSessionLogout">Logout</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Minimized Session Timer Indicator -->
    <v-fab-transition>
      <div v-if="sessionWarning.minimized && sessionWarning.timeLeft > 0" style="position: fixed; bottom: 24px; right: 24px; z-index: 9999;">
        <v-btn color="warning" elevation="8" @click="restoreSessionWarning">
          <v-icon class="mr-1">mdi-timer-alert</v-icon>
          {{ sessionWarning.timeLeft }}s
        </v-btn>
      </div>
    </v-fab-transition>

    <!-- Session Logout Notification Snackbar -->
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      location="top"
      multi-line
      :timeout="snackbar.timeout"
    >
      <div class="d-flex align-center">
        <v-icon class="mr-2">mdi-logout</v-icon>
        {{ snackbar.message }}
      </div>
      <template #actions>
        <v-btn
          variant="text"
          @click="snackbar.show = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <!-- Global Login Dialog -->
    <v-dialog v-model="loginDialog.show" persistent width="400">
      <v-card rounded="xl">
        <v-card-title class="text-h5 d-flex align-center pa-6 pb-2">
          <v-icon class="mr-2" color="primary">mdi-login</v-icon>
          Login
          <v-spacer />
          <v-btn icon size="small" variant="text" @click="closeLoginDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="pa-6 pt-4">
          <v-form @submit.prevent="handleLogin">
            <v-text-field
              v-model="loginDialog.username"
              autofocus
              class="mb-4"
              :disabled="loginDialog.isLoading"
              label="Username"
              prepend-inner-icon="mdi-account"
              required
              rounded="lg"
              variant="outlined"
            />
            <v-text-field
              v-model="loginDialog.password"
              class="mb-4"
              :disabled="loginDialog.isLoading"
              label="Password"
              prepend-inner-icon="mdi-lock"
              required
              rounded="lg"
              type="password"
              variant="outlined"
              @keyup.enter="handleLogin"
            />
            <v-alert
              v-if="loginDialog.errorMsg"
              class="mb-4"
              density="compact"
              rounded="lg"
              type="error"
            >
              {{ loginDialog.errorMsg }}
            </v-alert>
            <v-btn
              block
              color="primary"
              :loading="loginDialog.isLoading"
              rounded="lg"
              size="large"
              type="submit"
            >
              <v-icon class="mr-2">mdi-login</v-icon>
              Login
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup>
  import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useRoute, useRouter } from 'vue-router'
  import { useDisplay, useTheme } from 'vuetify'
  import { login as loginApi } from '@/api/login'
  import { logout as logoutApi } from '@/api/logout'
  import AppStoreBanner from '@/components/shared/AppStoreBanner.vue'
  import SidebarNavItem from '@/components/SidebarNavItem.vue'
  import { ensureFreshToken, getTokenExp } from '@/plugins/axios'
  import { availableLocales, setLocale } from '@/plugins/i18n'
  import { mainRouteChildren } from '@/router'
  import { authStore } from '@/stores/authStore'
  import benwywIcon from '/Benwyw-1024.png'

  // i18n
  const { locale, t } = useI18n()

  function changeLocale (newLocale) {
    setLocale(newLocale)
  }

  const route = useRoute()
  const router = useRouter()
  const theme = useTheme()
  const { mobile } = useDisplay()

  const drawer = ref(!mobile.value) // Start closed on mobile
  const rail = ref(false)
  const openedGroups = ref([])

  // Auth state
  const username = ref(null)
  const isLoggingOut = ref(false)

  const isLoggedIn = computed(() => !!username.value)

  // Login dialog state
  const loginDialog = reactive({
    show: false,
    username: '',
    password: '',
    errorMsg: '',
    isLoading: false,
  })

  // Session warning state
  const SESSION_WARNING_THRESHOLD = 120 // seconds before expiry to show warning
  const sessionWarning = reactive({
    show: false,
    timeLeft: 0,
    timer: null,
    refreshing: false,
    warnedForExp: null, // to avoid repeat warnings for same exp
    minimized: false, // for minimized state
  })

  // Snackbar notification state
  const snackbar = reactive({
    show: false,
    message: '',
    color: 'info',
    timeout: 4000,
  })

  let sessionWarningInterval = null

  // Check auth state on mount and when route changes
  function checkAuthState () {
    username.value = localStorage.getItem('username')
    authStore.syncAuthState() // Sync role from JWT token
  }

  /**
   * Check if current route requires authentication and/or specific roles
   * Uses route meta properties defined in router/index.js:
   * - requiresAuth: boolean - requires user to be logged in
   * - requiredRoles: string[] - requires user to have one of these roles
   *
   * If check fails, redirect to home and show appropriate message
   */
  function checkRouteProtection () {
    const meta = route.meta || {}
    const requiresAuth = meta.requiresAuth === true
    const requiredRoles = meta.requiredRoles

    // Check if authentication is required
    if (requiresAuth && !isLoggedIn.value) {
      snackbar.message = 'Please login to access this page.'
      snackbar.color = 'warning'
      snackbar.show = true
      router.push('/')
      // Show login dialog after redirect
      setTimeout(() => {
        loginDialog.show = true
      }, 100)
      return
    }

    // Check if specific roles are required
    if (requiredRoles && Array.isArray(requiredRoles) && requiredRoles.length > 0 && !authStore.hasAnyRole(requiredRoles)) {
      snackbar.message = 'You do not have permission to access this page.'
      snackbar.color = 'error'
      snackbar.show = true
      router.push('/')
    }
  }

  onMounted(() => {
    checkAuthState()
    checkRouteProtection()
    // Start session warning check interval (checks every second)
    sessionWarningInterval = setInterval(checkSessionWarning, 1000)
    // Set initial theme based on time of day
    setThemeBasedOnTime()
    // Check every minute if theme should change based on time
    autoThemeInterval = setInterval(setThemeBasedOnTime, 60_000)
  })

  // Cleanup on unmount
  onBeforeUnmount(() => {
    if (sessionWarningInterval) {
      clearInterval(sessionWarningInterval)
      sessionWarningInterval = null
    }
    if (sessionWarning.timer) {
      clearInterval(sessionWarning.timer)
      sessionWarning.timer = null
    }
    if (autoThemeInterval) {
      clearInterval(autoThemeInterval)
      autoThemeInterval = null
    }
  })

  watch(() => route.path, () => {
    checkAuthState()
    checkRouteProtection()
  })

  /**
   * Handle logout
   * @param {Object} options - Logout options
   * @param {boolean} options.silent - If true, stay on current page and show notification
   * @param {string} options.message - Custom message to show in notification
   */
  async function handleLogout (options = {}) {
    const { silent = false, message = 'You have been logged out.' } = options
    isLoggingOut.value = true
    try {
      await logoutApi()
      username.value = null
      authStore.clearAuthState() // Clear role state

      if (silent) {
        // Stay on current page and show notification
        snackbar.message = message
        snackbar.color = 'warning'
        snackbar.show = true
        // Check if current page requires auth and redirect if needed
        checkRouteProtection()
      } else {
        // Normal logout - redirect to home
        router.push('/')
      }
    } finally {
      isLoggingOut.value = false
    }
  }

  /**
   * Open a URL in a new tab
   */
  function openInNewTab (url) {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  /**
   * Open the login dialog
   */
  function openLoginDialog () {
    loginDialog.username = ''
    loginDialog.password = ''
    loginDialog.errorMsg = ''
    loginDialog.show = true
  }

  /**
   * Close the login dialog
   */
  function closeLoginDialog () {
    loginDialog.show = false
    loginDialog.errorMsg = ''
  }

  /**
   * Handle login form submission
   */
  async function handleLogin () {
    if (!loginDialog.username || !loginDialog.password) {
      loginDialog.errorMsg = 'Please enter username and password.'
      return
    }

    loginDialog.errorMsg = ''
    loginDialog.isLoading = true

    try {
      const res = await loginApi(loginDialog.username, loginDialog.password)
      localStorage.setItem('accessToken', res.accessToken)
      localStorage.setItem('refreshToken', res.refreshToken)
      localStorage.setItem('username', loginDialog.username)

      // Update auth state (includes role from JWT)
      username.value = loginDialog.username
      authStore.syncAuthState()

      // Close dialog and show success
      loginDialog.show = false
      snackbar.message = `Welcome back, ${loginDialog.username}!`
      snackbar.color = 'success'
      snackbar.show = true

      // Clear form
      loginDialog.username = ''
      loginDialog.password = ''
    } catch {
      loginDialog.errorMsg = 'Login failed. Please check your credentials.'
    } finally {
      loginDialog.isLoading = false
    }
  }

  const isDark = computed(() => theme.global.current.value.dark)

  // Key for localStorage theme preference
  const THEME_PREFERENCE_KEY = 'userThemePreference'

  /**
   * Check if current time is within dark mode hours (22:00 to 07:00)
   * @returns {boolean} - True if dark mode should be active
   */
  function shouldBeDarkMode () {
    const hour = new Date().getHours()
    // Dark mode: 22:00 PM to 07:00 AM (i.e., hour >= 22 or hour < 7)
    return hour >= 22 || hour < 7
  }

  /**
   * Set theme based on current time of day (only if no user preference is saved)
   * Dark mode: 22:00 PM to 07:00 AM
   * Light mode: 07:00 AM to 22:00 PM
   */
  function setThemeBasedOnTime () {
    // Check if user has a saved theme preference
    const savedTheme = localStorage.getItem(THEME_PREFERENCE_KEY)
    if (savedTheme) {
      // Use user's saved preference instead of auto theme
      theme.global.name.value = savedTheme
      return
    }
    // No saved preference - use time-based auto theme
    const shouldBeDark = shouldBeDarkMode()
    theme.global.name.value = shouldBeDark ? 'dark' : 'light'
  }

  /**
   * Toggle theme and save user preference to persist across sessions
   */
  function toggleTheme () {
    const newTheme = isDark.value ? 'light' : 'dark'
    theme.global.name.value = newTheme
    // Save user preference to localStorage
    localStorage.setItem(THEME_PREFERENCE_KEY, newTheme)
  }

  // Auto theme interval reference
  let autoThemeInterval = null

  // ========================================================================
  // Session Warning Functions
  // ========================================================================

  /**
   * Check if session is about to expire and show warning dialog
   * Runs every second via interval
   */
  function checkSessionWarning () {
    // Don't check if dialog is showing, minimized, user is not logged in, or on Login page
    if (sessionWarning.show || sessionWarning.minimized || !isLoggedIn.value) return

    // Don't show session warning on Login page (aligned with reference implementation)
    if (route.path === '/login' || route.name === 'Login') return

    const exp = getTokenExp()
    if (!exp) return

    const now = Math.floor(Date.now() / 1000)
    const timeLeft = exp - now

    // Show warning if token expires within threshold and we haven't warned for this token
    if (timeLeft <= SESSION_WARNING_THRESHOLD && timeLeft > 0 && sessionWarning.warnedForExp !== exp) {
      sessionWarning.show = true
      sessionWarning.timeLeft = timeLeft
      sessionWarning.warnedForExp = exp
      startSessionWarningCountdown()
    }
  }

  /**
   * Start countdown timer for session expiry warning
   */
  function startSessionWarningCountdown () {
    if (sessionWarning.timer) clearInterval(sessionWarning.timer)

    sessionWarning.timer = setInterval(() => {
      sessionWarning.timeLeft--
      if (sessionWarning.timeLeft <= 0) {
        clearInterval(sessionWarning.timer)
        sessionWarning.timer = null
        sessionWarning.show = false
        sessionWarning.minimized = false
        // Session timeout - stay on current page and show notification
        handleLogout({ silent: true, message: 'Your session has expired. You have been logged out.' })
      }
    }, 1000)
  }

  /**
   * Attempt to prolong the session by refreshing the token
   * Aligned with reference/Layout.vue implementation
   */
  async function prolongSession () {
    sessionWarning.refreshing = true
    // Implement refresh logic using ensureFreshToken
    // Force refresh (pass true) to ensure we get a new token even if current one is still valid
    await ensureFreshToken(true)
      .then(() => {
        sessionWarning.refreshing = false
        sessionWarning.show = false
        sessionWarning.minimized = false
        sessionWarning.warnedForExp = null // Reset so we can warn again for new token
        if (sessionWarning.timer) {
          clearInterval(sessionWarning.timer)
          sessionWarning.timer = null
        }
      })
      .catch(() => {
        sessionWarning.refreshing = false
        sessionWarning.show = false
        sessionWarning.minimized = false
        // Session prolong failed - stay on current page and show notification
        setTimeout(() => {
          handleLogout({ silent: true, message: 'Session could not be extended. You have been logged out.' })
        }, 500)
      })
  }

  /**
   * Minimize the session warning dialog (countdown continues in background)
   */
  function minimizeSessionWarning () {
    sessionWarning.show = false
    sessionWarning.minimized = true
  }

  /**
   * Restore the session warning dialog from minimized state
   */
  function restoreSessionWarning () {
    sessionWarning.show = true
    sessionWarning.minimized = false
  }

  /**
   * Handle logout from session warning dialog
   * Properly closes dialog and stops timer before logging out
   */
  async function handleSessionLogout () {
    // Stop the countdown timer
    if (sessionWarning.timer) {
      clearInterval(sessionWarning.timer)
      sessionWarning.timer = null
    }
    // Close the dialog
    sessionWarning.show = false
    sessionWarning.minimized = false
    // Perform logout (redirect to home since user explicitly clicked logout)
    await handleLogout()
  }

  // ========================================================================
  // Router-driven Navigation System
  //
  // Navigation is built entirely from router configuration.
  // To add/modify navigation, simply update the router/index.js file.
  //
  // Supported meta properties:
  // - title: Display name (required for visibility)
  // - icon: MDI icon name
  // - navSection: 'main' | 'tools' | 'noteformat' | 'products' | 'legal' (default: 'main')
  // - navOrder: Sort order within section (lower = higher)
  // - navHidden: Hide from sidebar
  // - parent: Parent route name for nesting
  // - defaultExpanded: Auto-expand group
  // - hideNavIfNoAccess: Hide from nav if user doesn't have permission
  // ========================================================================

  /**
   * Check if user has access to a route based on its meta properties
   * @param {Object} routeMeta - Route meta object
   * @returns {boolean} - True if user has access
   */
  function hasRouteAccess (routeMeta) {
    if (!routeMeta) return true

    // Check if authentication is required
    if (routeMeta.requiresAuth && !isLoggedIn.value) {
      return false
    }

    // Check if specific roles are required
    const requiredRoles = routeMeta.requiredRoles
    if (requiredRoles && Array.isArray(requiredRoles) && requiredRoles.length > 0) {
      return authStore.hasAnyRole(requiredRoles)
    }

    return true
  }

  /**
   * Check if a nav item should show a lock icon
   * Shows lock when: user doesn't have access AND hideNavIfNoAccess is false (item is still visible)
   * @param {Object} item - Route item object
   * @returns {boolean} - True if should show lock icon
   */
  function isItemLocked (item) {
    const meta = item?.meta
    if (!meta) return false

    // Only show lock if the item doesn't hide when no access
    // (if hideNavIfNoAccess is true, the item won't be visible anyway)
    if (meta.hideNavIfNoAccess) return false

    // Check if user lacks access
    return !hasRouteAccess(meta)
  }

  /** Filter visible routes (has title, not hidden, and passes permission check if hideNavIfNoAccess is set) */
  const visibleRoutes = computed(() => {
    return (mainRouteChildren || []).filter(r => {
      // Basic visibility checks
      if (!r.name || !r.meta?.title || r.meta?.navHidden) {
        return false
      }

      // If hideNavIfNoAccess is true, check permissions
      if (r.meta?.hideNavIfNoAccess) {
        return hasRouteAccess(r.meta)
      }

      // Otherwise, show the nav item (access will be checked on click)
      return true
    })
  })

  /** Map of route name -> route object for quick lookup */
  const routeByName = computed(() => {
    return new Map(visibleRoutes.value.map(r => [r.name, r]))
  })

  /**
   * Map of parent name -> array of child routes
   * Enables infinite-depth nesting based on meta.parent property
   */
  const childrenMap = computed(() => {
    const map = new Map()

    for (const r of visibleRoutes.value) {
      const parentName = r.meta?.parent
      if (parentName && routeByName.value.has(parentName)) {
        const list = map.get(parentName) || []
        list.push(r)
        map.set(parentName, list)
      }
    }

    // Sort children by navOrder
    for (const [parent, children] of map) {
      map.set(parent, children.toSorted((a, b) => (a.meta?.navOrder ?? 100) - (b.meta?.navOrder ?? 100)))
    }

    return map
  })

  /** Set of all route names that are children of some parent */
  const allChildNames = computed(() => {
    const set = new Set()
    for (const children of childrenMap.value.values()) {
      for (const child of children) {
        set.add(child.name)
      }
    }
    return set
  })

  /** Get root items for a specific section (items without parents) */
  function getRootItemsForSection (section) {
    return visibleRoutes.value
      .filter(r =>
        !allChildNames.value.has(r.name)
        && (r.meta?.navSection || 'main') === section,
      )
      .toSorted((a, b) => (a.meta?.navOrder ?? 100) - (b.meta?.navOrder ?? 100))
  }

  const mainSectionItems = computed(() => getRootItemsForSection('main'))
  const toolsSectionItems = computed(() => getRootItemsForSection('tools'))
  const noteformatSectionItems = computed(() => getRootItemsForSection('noteformat'))
  const benkanekiSectionItems = computed(() => getRootItemsForSection('benkaneki'))
  const mcbenwywcomSectionItems = computed(() => getRootItemsForSection('mcbenwywcom'))
  // const productsSectionItems = computed(() => getRootItemsForSection('products'))
  const legalSectionItems = computed(() => getRootItemsForSection('legal'))

  /** Get all group names (items that have children) */
  const allGroupNames = computed(() => new Set(childrenMap.value.keys()))

  /** Get groups that should be expanded by default */
  const defaultExpandedGroups = computed(() => {
    const expanded = []
    for (const groupName of allGroupNames.value) {
      const r = routeByName.value.get(groupName)
      if (r?.meta?.defaultExpanded) {
        expanded.push(groupName)
      }
    }
    return expanded
  })

  // Initialize default expanded groups
  watch(defaultExpandedGroups, groups => {
    for (const group of groups) {
      if (!openedGroups.value.includes(group)) {
        openedGroups.value.push(group)
      }
    }
  }, { immediate: true })

  /** Check if a group is open */
  const isOpen = name => openedGroups.value.includes(name)

  /** Handle clicking on a parent item (navigate if it has a path) */
  function onParentClick (name) {
    const r = routeByName.value.get(name)
    if (r?.path) {
      router.push(r.path)
    }
  }

  /** Handle clicking chevron to toggle group */
  function onChevronClick (name) {
    const index = openedGroups.value.indexOf(name)
    if (index === -1) {
      openedGroups.value.push(name)
    } else {
      openedGroups.value.splice(index, 1)
    }
  }

  /**
   * Find all ancestor group names for current route
   * Traverses up using meta.parent property
   */
  function getAncestorGroupNames (name) {
    if (!name) return []
    const ancestors = []
    let current = routeByName.value.get(name)

    while (current?.meta?.parent) {
      const parentName = current.meta.parent
      const parent = routeByName.value.get(parentName)
      if (!parent) break

      if (childrenMap.value.has(parentName)) {
        ancestors.push(parentName)
      }
      current = parent
    }
    return ancestors
  }

  /** Ensure ancestor groups are open when navigating to nested route */
  watch(() => route.name, newName => {
    if (newName) {
      const ancestors = getAncestorGroupNames(String(newName))
      for (const ancestor of ancestors) {
        if (!openedGroups.value.includes(ancestor)) {
          openedGroups.value.push(ancestor)
        }
      }
    }
  }, { immediate: true })

  /**
   * Build breadcrumb items from current route's parent chain
   * Traverses up using meta.parent to build full hierarchy path
   */
  const breadcrumbs = computed(() => {
    const items = []
    const currentName = route.name ? String(route.name) : ''
    let current = routeByName.value.get(currentName)

    // Build path from current to root by following parent chain
    while (current) {
      items.unshift({
        title: current.meta?.title || current.name,
        to: current.path || '/',
        disabled: current.name === currentName, // Current page is disabled
      })
      const parentName = current.meta?.parent
      if (!parentName) break
      current = routeByName.value.get(parentName)
    }

    // Add Home as first item if not already there
    if (items.length === 0 || items[0].title !== 'Home') {
      items.unshift({ title: 'Home', to: '/', disabled: false })
    }

    return items
  })
</script>

<style scoped>
/* Navigation drawer styling handled by Vuetify theme */
</style>
