<template>
  <v-app>
    <!-- Modern Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      :rail="!mobile && rail"
      :permanent="!mobile"
      :temporary="mobile"
      @click="mobile ? null : rail = false"
    >
      <v-list-item
        :prepend-avatar="logoSrc"
        nav
      >
        <template v-if="!rail">
          <v-list-item-title class="text-h6 font-weight-bold">
            Ben Kaneki
          </v-list-item-title>
          <v-list-item-subtitle>AI Platform</v-list-item-subtitle>
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
          :item="item"
          :children="childrenMap.get(item.name) || []"
          :children-map="childrenMap"
          :depth="0"
          :is-open-fn="isOpen"
          :on-parent-click-fn="onParentClick"
          :on-chevron-click-fn="onChevronClick"
        />
      </v-list>

      <v-divider />

      <!-- TOOLS Section -->
      <v-list
        v-model:opened="openedGroups"
        density="compact"
        nav
        open-strategy="multiple"
      >
        <v-list-subheader v-if="!rail">TOOLS</v-list-subheader>
        <SidebarNavItem
          v-for="item in toolsSectionItems"
          :key="item.name"
          :item="item"
          :children="childrenMap.get(item.name) || []"
          :children-map="childrenMap"
          :depth="0"
          :is-open-fn="isOpen"
          :on-parent-click-fn="onParentClick"
          :on-chevron-click-fn="onChevronClick"
        />
      </v-list>

      <v-divider />

      <!-- LEGAL Section -->
      <v-list
        v-model:opened="openedGroups"
        density="compact"
        nav
        open-strategy="multiple"
      >
        <v-list-subheader v-if="!rail">LEGAL</v-list-subheader>
        <SidebarNavItem
          v-for="item in legalSectionItems"
          :key="item.name"
          :item="item"
          :children="childrenMap.get(item.name) || []"
          :children-map="childrenMap"
          :depth="0"
          :is-open-fn="isOpen"
          :on-parent-click-fn="onParentClick"
          :on-chevron-click-fn="onChevronClick"
        />
      </v-list>

      <template #append>
        <v-list v-if="!mobile" density="compact" nav>
          <v-list-item
            :prepend-icon="rail ? 'mdi-chevron-right' : 'mdi-chevron-left'"
            title="Collapse"
            @click.stop="rail = !rail"
          />
        </v-list>
      </template>
    </v-navigation-drawer>

    <!-- Modern App Bar -->
    <v-app-bar flat class="border-b">
      <template #prepend>
        <v-app-bar-nav-icon @click.stop="mobile ? drawer = !drawer : rail = !rail" />
      </template>

      <v-app-bar-title class="text-truncate">
        <v-breadcrumbs
          :items="breadcrumbs"
          density="compact"
          class="pa-0"
        >
          <template #divider>
            <v-icon icon="mdi-chevron-right" size="small" />
          </template>
          <template #item="{ item }">
            <v-breadcrumbs-item
              :to="item.to"
              :disabled="item.disabled"
              class="text-truncate"
            >
              {{ item.title }}
            </v-breadcrumbs-item>
          </template>
        </v-breadcrumbs>
      </v-app-bar-title>

      <template #append>
        <v-btn
          icon="mdi-weather-partly-cloudy"
          variant="text"
          href="https://www.hko.gov.hk/tc/"
          target="_blank"
          :size="mobile ? 'small' : 'default'"
        />
        <v-btn
          :icon="isDark ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          variant="text"
          @click="toggleTheme"
          :size="mobile ? 'small' : 'default'"
        />
        <v-menu>
          <template #activator="{ props }">
            <v-btn
              v-bind="props"
              :icon="!isLoggedIn"
              variant="text"
              :size="mobile ? 'small' : 'default'"
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
                prepend-icon="mdi-logout"
                title="Logout"
                :disabled="isLoggingOut"
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
              title="Login"
              @click="openLoginDialog"
            />
          </v-list>
        </v-menu>
      </template>
    </v-app-bar>

    <!-- Main Content -->
    <v-main class="bg-grey-lighten-4">
      <v-container fluid :class="mobile ? 'pa-3' : 'pa-6'">
        <router-view />
      </v-container>
    </v-main>

    <!-- Modern Footer -->
    <v-footer app class="bg-surface border-t">
      <v-row justify="center" no-gutters>
        <v-col class="text-center" cols="12">
          <span class="text-body-2 text-medium-emphasis">
            &copy; {{ new Date().getFullYear() }} Ben Kaneki. All rights reserved.
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
            Session Expiring Soon
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
      :timeout="snackbar.timeout"
      location="top"
      multi-line
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
    <v-dialog v-model="loginDialog.show" width="400" persistent>
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
              label="Username"
              prepend-inner-icon="mdi-account"
              variant="outlined"
              rounded="lg"
              class="mb-4"
              required
              :disabled="loginDialog.isLoading"
              autofocus
            />
            <v-text-field
              v-model="loginDialog.password"
              label="Password"
              type="password"
              prepend-inner-icon="mdi-lock"
              variant="outlined"
              rounded="lg"
              class="mb-4"
              required
              :disabled="loginDialog.isLoading"
              @keyup.enter="handleLogin"
            />
            <v-alert
              v-if="loginDialog.errorMsg"
              type="error"
              rounded="lg"
              class="mb-4"
              density="compact"
            >
              {{ loginDialog.errorMsg }}
            </v-alert>
            <v-btn
              type="submit"
              color="primary"
              :loading="loginDialog.isLoading"
              block
              size="large"
              rounded="lg"
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
import { ref, computed, watch, onMounted, onBeforeUnmount, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTheme, useDisplay } from 'vuetify'
import logoSrc from '@/assets/logo.png'
import SidebarNavItem from '@/components/SidebarNavItem.vue'
import { mainRouteChildren } from '@/router'
import { logout as logoutApi } from '@/api/logout'
import { login as loginApi } from '@/api/login'
import { ensureFreshToken, getTokenExp } from '@/plugins/axios'
import { authStore } from '@/stores/authStore'

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
const checkAuthState = () => {
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
const checkRouteProtection = () => {
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
  if (requiredRoles && Array.isArray(requiredRoles) && requiredRoles.length > 0) {
    if (!authStore.hasAnyRole(requiredRoles)) {
      snackbar.message = 'You do not have permission to access this page.'
      snackbar.color = 'error'
      snackbar.show = true
      router.push('/')
    }
  }
}

onMounted(() => {
  checkAuthState()
  checkRouteProtection()
  // Start session warning check interval (checks every second)
  sessionWarningInterval = setInterval(checkSessionWarning, 1000)
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
const handleLogout = async (options = {}) => {
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
 * Open the login dialog
 */
const openLoginDialog = () => {
  loginDialog.username = ''
  loginDialog.password = ''
  loginDialog.errorMsg = ''
  loginDialog.show = true
}

/**
 * Close the login dialog
 */
const closeLoginDialog = () => {
  loginDialog.show = false
  loginDialog.errorMsg = ''
}

/**
 * Handle login form submission
 */
const handleLogin = async () => {
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
  } catch (err) {
    loginDialog.errorMsg = 'Login failed. Please check your credentials.'
  } finally {
    loginDialog.isLoading = false
  }
}

const isDark = computed(() => theme.global.current.value.dark)

const toggleTheme = () => {
  theme.global.name.value = isDark.value ? 'light' : 'dark'
}

// ========================================================================
// Session Warning Functions
// ========================================================================

/**
 * Check if session is about to expire and show warning dialog
 * Runs every second via interval
 */
function checkSessionWarning() {
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
function startSessionWarningCountdown() {
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
async function prolongSession() {
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
function minimizeSessionWarning() {
  sessionWarning.show = false
  sessionWarning.minimized = true
}

/**
 * Restore the session warning dialog from minimized state
 */
function restoreSessionWarning() {
  sessionWarning.show = true
  sessionWarning.minimized = false
}

/**
 * Handle logout from session warning dialog
 * Properly closes dialog and stops timer before logging out
 */
async function handleSessionLogout() {
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
// - navSection: 'main' | 'tools' | 'legal' (default: 'main')
// - navOrder: Sort order within section (lower = higher)
// - navHidden: Hide from sidebar
// - parent: Parent route name for nesting
// - defaultExpanded: Auto-expand group
// ========================================================================

/** Filter visible routes (has title, not hidden) */
const visibleRoutes = computed(() => {
  return (mainRouteChildren || []).filter(r =>
    r.name &&
    r.meta?.title &&
    !r.meta?.navHidden
  )
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
  for (const [parentName, children] of map) {
    children.sort((a, b) => (a.meta?.navOrder ?? 100) - (b.meta?.navOrder ?? 100))
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
const getRootItemsForSection = (section) => {
  return visibleRoutes.value
    .filter(r =>
      !allChildNames.value.has(r.name) &&
      (r.meta?.navSection || 'main') === section
    )
    .sort((a, b) => (a.meta?.navOrder ?? 100) - (b.meta?.navOrder ?? 100))
}

const mainSectionItems = computed(() => getRootItemsForSection('main'))
const toolsSectionItems = computed(() => getRootItemsForSection('tools'))
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
watch(defaultExpandedGroups, (groups) => {
  for (const group of groups) {
    if (!openedGroups.value.includes(group)) {
      openedGroups.value.push(group)
    }
  }
}, { immediate: true })

/** Check if a group is open */
const isOpen = (name) => openedGroups.value.includes(name)

/** Handle clicking on a parent item (navigate if it has a path) */
const onParentClick = (name) => {
  const r = routeByName.value.get(name)
  if (r?.path) {
    router.push(r.path)
  }
}

/** Handle clicking chevron to toggle group */
const onChevronClick = (name) => {
  const index = openedGroups.value.indexOf(name)
  if (index >= 0) {
    openedGroups.value.splice(index, 1)
  } else {
    openedGroups.value.push(name)
  }
}

/**
 * Find all ancestor group names for current route
 * Traverses up using meta.parent property
 */
const getAncestorGroupNames = (name) => {
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
watch(() => route.name, (newName) => {
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
