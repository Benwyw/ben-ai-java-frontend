<template>
  <div id="inspire" class="bg-grey-lighten-3 fill-height">
    <v-responsive v-if="isLoading">
      <div class="d-flex flex-column justify-center align-center text-center fill-height">
        <v-progress-circular color="primary" indeterminate />
        <p style="margin-top: 16px;">Authenticating...</p>
      </div>
    </v-responsive>

    <!-- Login Dialog (always mounted so it can show regardless of auth state) -->
    <v-dialog v-model="dialogState.show" persistent width="400">
      <v-card>
        <v-card-title class="text-h5">
          <v-icon class="mr-2" color="warning">mdi-alert-circle</v-icon>
          Login Required
        </v-card-title>
        <v-card-text class="text-body-1">
          {{ dialogState.reason || 'Please login again.' }}
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" variant="flat" @click="redirectToLogin">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
          <v-btn color="secondary" variant="text" @click="handleLogout">Logout</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Minimized Session Timer Indicator -->
    <v-fab-transition>
      <div v-if="sessionWarning.minimized && sessionWarning.timeLeft > 0" style="position: fixed; bottom: 24px; right: 24px; z-index: 9999;">
        <v-btn color="warning" dark elevation="8" @click="restoreSessionWarning">
          <v-icon left>mdi-timer-alert</v-icon>
          {{ sessionWarning.timeLeft }}s
        </v-btn>
      </div>
    </v-fab-transition>

    <!-- Authenticated content -->
    <v-responsive v-if="!isLoading && isAuthenticated">
      <v-app-bar app>
        <v-container class="mx-auto d-flex align-center justify-center" fluid>
          <v-img
            contain
            height="100%"
            max-width="160"
            src="@/assets/dsb_logo.svg"
            width="auto"
          />

          <!-- Dynamic top bar buttons from router meta -->
          <template v-for="m in topBarModules" :key="m.path">
            <v-btn
              :color="m.path === rootPath ? 'primary' : undefined"
              :text="true"
              :to="m.path"
              :variant="m.path === rootPath ? 'flat' : 'text'"
            >
              {{ m.label }}
            </v-btn>
          </template>

          <v-spacer />

          <v-menu offset-y>
            <template #activator="{ props }">
              <v-btn
                class="ma-2"
                color="grey-darken-1"
                text
                v-bind="props"
                :v-on="true"
                width="126"
              >
                {{ displayName }}
                <v-icon color="inherit" right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <template v-if="isAuthenticated">
                <v-list-item width="126">
                  <v-btn
                    class="ma-0"
                    color="secondary"
                    :loading="isLogoutLoading"
                    text
                    width="100%"
                    @click="handleLogout"
                  >Logout</v-btn>
                </v-list-item>
              </template>
              <template v-else>
                <v-list-item>
                  <v-btn text @click="redirectToLogin">Login</v-btn>
                </v-list-item>
              </template>
            </v-list>
          </v-menu>
        </v-container>
      </v-app-bar>

      <div role="main">
        <v-container fluid>
          <v-breadcrumbs class="px-0 py-2" density="compact" :items="breadcrumbItems">
            <template #divider>
              <v-icon color="grey-darken-1" icon="mdi-chevron-right" size="small" />
            </template>
            <!-- Custom item template to ensure all items (including current) are clickable -->
            <template #item="{ item, index }">
              <router-link
                class="breadcrumb-link"
                :class="index === breadcrumbItems.length - 1 ? 'breadcrumb-current' : 'breadcrumb-ancestor'"
                :to="item.to"
              >
                {{ item.title }}
              </router-link>
            </template>
          </v-breadcrumbs>
          <v-row>
            <v-col cols="2">
              <v-sheet rounded="lg">
                <v-list
                  v-model:opened="openedGroups"
                  v-model:selected="selectedNavList"
                  open-strategy="multiple"
                  rounded="lg"
                  select-strategy="single-leaf"
                  @update:opened="onOpenedUpdate"
                >
                  <!--
                    Sidebar Navigation Tree

                    Uses recursive SidebarNavItem component to support infinite nesting.
                    Tree structure is determined by 'parent' property in route meta.

                    To add nested items in router files:
                    { name: 'Parent', meta: { title: 'Parent' } }
                    { name: 'Child', meta: { title: 'Child', parent: 'Parent' } }
                    { name: 'Grandchild', meta: { title: 'Grandchild', parent: 'Child' } }
                  -->

                  <!-- Root level items (items without a parent, rendered recursively) -->
                  <SidebarNavItem
                    v-for="item in sideBarRootItems"
                    :key="item.name"
                    :children="childrenMap.get(item.name) || []"
                    :children-map="childrenMap"
                    :depth="0"
                    :is-open-fn="isOpen"
                    :item="item"
                    :on-chevron-click-fn="onChevronClick"
                    :on-parent-click-fn="onParentClick"
                  />

                  <v-divider class="my-2" />

                  <v-list-item
                    color="grey-lighten-4"
                    link
                    title="Refresh"
                    @click="onRefreshNav()"
                  />
                </v-list>
              </v-sheet>
            </v-col>

            <v-col>
              <v-sheet class="pa-4 border" min-height="70vh" rounded="lg">
                <router-view v-if="!permissionDenied" />
                <div v-else class="d-flex flex-column align-center justify-center text-center" style="min-height: 60vh;">
                  <v-icon color="warning" size="64">mdi-alert</v-icon>
                  <div class="text-h6 mt-2">Access denied</div>
                  <div class="text-body-2 mb-4">You don’t have permission to view this page.</div>
                  <v-btn color="primary" :to="rootPath">{{ moduleDisplay }}</v-btn>
                </div>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-responsive>

    <!-- Fallback when not authenticated (prevents blank page) -->
    <v-responsive v-if="!isLoading && !isAuthenticated">
      <v-container class="fill-height d-flex align-center justify-center">
        <div class="text-center">
          <v-icon color="warning" size="64">mdi-alert</v-icon>
          <div class="text-h6 mt-2">Access denied</div>
          <div class="text-body-2 mb-4">Please login to continue.</div>
          <!--          <v-btn color="primary" @click="redirectToLogin">Login</v-btn>-->
        </div>
      </v-container>
    </v-responsive>
  </div>
</template>

<script setup>
  import { jwtDecode } from 'jwt-decode'
  import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import SidebarNavItem from '@/components/SidebarNavItem.vue'
  import { ensureFreshToken } from '@/plugins/axios.js'
  import { drawioChildren } from '@/router/drawio.routes.js'
  import { egChildren } from '@/router/eg.routes.js'
  import { swaggeruiChildren } from '@/router/swaggerui.routes.js'
  import authService from '@/service/AuthService'
  import { eventBus } from '@/service/eventBus.js'

  const { currentUserId, cipaBaseUrl, credential } = defineProps({
    page: { type: Number, default: 0 },
    credential: { type: String, default: '' },
    currentUserId: { type: String, default: '' },
    reference: { type: String, default: '' },
    bankId: { type: String, default: '' },
    sessionId: { type: String, default: '' },
    cipaBaseUrl: { type: String, default: '' },
  })

  const route = useRoute()
  const router = useRouter()

  const isLoading = ref(true)
  const isAuthenticated = ref(false)
  const displayName = ref('')
  const isLogoutLoading = ref(false)

  let stopped = false
  const dialogState = reactive({ show: false, reason: '' })
  const permissionDenied = ref(false)

  const openedGroups = ref([])

  // Token validation interval (check every 30 seconds)
  let tokenCheckInterval = null
  const TOKEN_CHECK_INTERVAL_MS = 30_000

  const SESSION_WARNING_THRESHOLD = 120 // seconds before expiry to show warning
  const sessionWarning = reactive({
    show: false,
    timeLeft: 0,
    timer: null,
    refreshing: false,
    warnedForExp: null, // to avoid repeat warnings for same exp
    minimized: false, // new property for minimized state
  })

  function redirectToLogin () {
    // Reset eventBus flags before redirecting
    eventBus.triggerAlertLoop = false
    eventBus.sessionExpired = false
    eventBus.loginReason = ''
    window.location.href = sessionStorage.getItem('cipaBaseUrl') || cipaBaseUrl || import.meta.env.VITE_CIPA_BASE_URL
  }

  /**
   * Check if the current token is valid and not expired
   * Returns true if token is valid, false otherwise
   */
  function isTokenValid () {
    const token = localStorage.getItem('token')
    if (!token) return false

    try {
      const { exp } = jwtDecode(token)
      const now = Date.now() / 1000
      // Token is valid if it has more than 0 seconds left
      return exp > now
    } catch {
      return false
    }
  }

  /**
   * Periodic token validation
   * Shows login dialog if token is expired or invalid
   */
  function checkTokenValidity () {
    if (stopped) return
    if (!isTokenValid()) {
      // Token expired or invalid - show dialog
      localStorage.clear()
      eventBus.sessionExpired = true
      showLoginDialog('Your session has expired. Please login again.')
    }
  }

  /**
   * Show login dialog with a specific reason
   * @param {string} reason - The reason for requiring re-login
   */
  function showLoginDialog (reason = 'Please login again.') {
    if (stopped) return
    dialogState.reason = reason
    dialogState.show = true
  }

  /**
   * Legacy alert loop function - now just shows dialog once
   * Kept for backward compatibility with eventBus.triggerAlertLoop
   * @param {string} reason - The reason for requiring re-login
   */
  function showAlertLoop (reason = 'Please login again.') {
    if (stopped) return
    dialogState.reason = reason
    dialogState.show = true
  }

  // Build top bar modules from router routes meta
  const topBarModules = computed(() => {
    return router
      .getRoutes()
      .filter(r => Boolean(r.meta?.topBarLabel) && r.path?.startsWith('/') && !r.meta?.topBarHidden && (!r.meta?.topBarRequiredFunction || authService.hasFunction(r.meta.topBarRequiredFunction)))
      .map(r => ({ path: r.path, label: r.meta.topBarLabel, order: r.meta.topBarOrder ?? 999 }))
      .toSorted((a, b) => a.order - b.order)
  })

  // Detect current top-level module route based on router meta (data-driven, no hardcoded paths)
  const currentTopModule = computed(() => {
    const modules = router.getRoutes().filter(r => r.meta?.topBarLabel && r.path?.startsWith('/'))
    return modules.find(m => route.path.startsWith(m.path)) || null
  })

  const rootPath = computed(() => currentTopModule.value?.path || '/')
  const moduleDisplay = computed(() => currentTopModule.value?.meta?.topBarLabel || '')

  // Map module root to its children arrays declared in router
  const moduleChildrenMap = {
    '/eg': egChildren,
    '/drawio': drawioChildren,
    '/swaggerui': swaggeruiChildren,
  }

  const currentChildren = computed(() => {
    const children = currentTopModule.value?.children
    return Array.isArray(children) && children.length > 0
      ? children
      : moduleChildrenMap[rootPath.value] || []
  })

  // Visibility and children helpers for sidebar
  function hasAccess (r) {
    const req = r?.meta?.requiredFunction
    return !req || authService.hasFunction(req)
  }
  function isVisible (r) {
    return Boolean(r?.name && r?.meta?.title && !r?.meta?.sideBarHidden && hasAccess(r))
  }

  // ========================================================================
  // Infinite-depth sidebar tree structure
  //
  // The tree is built using the 'parent' property in route meta:
  // - Routes without a parent (or parent not found) become root items
  // - Routes with parent property become children of that parent
  // - This supports unlimited nesting depth
  // ========================================================================

  /** Filtered routes that should be visible in sidebar */
  const visibleRoutes = computed(() => (currentChildren.value || []).filter(r => isVisible(r)))

  /**
   * Map of route name -> route object for quick lookup
   * Used to verify parent references and build tree structure
   */
  const routeByName = computed(() => new Map(visibleRoutes.value.map(r => [r.name, r])))

  /**
   * Map of parent name -> array of direct children
   * Core data structure for building infinite-depth tree
   *
   * Example: If routes define:
   *   { name: 'A', meta: { title: 'A' } }
   *   { name: 'B', meta: { title: 'B', parent: 'A' } }
   *   { name: 'C', meta: { title: 'C', parent: 'B' } }
   *
   * Then childrenMap will be:
   *   'A' -> [routeB]
   *   'B' -> [routeC]
   */
  const childrenMap = computed(() => {
    const map = new Map()
    const order = new Map((currentChildren.value || []).map((r, i) => [r.name, i]))

    for (const r of visibleRoutes.value) {
      const parentName = r.meta?.parent
      // Only include if parent exists in visible routes
      if (parentName && routeByName.value.has(parentName)) {
        const list = map.get(parentName) || []
        list.push(r)
        map.set(parentName, list)
      }
    }

    // Sort children by original order in currentChildren and return new map
    const sortedMap = new Map()
    for (const [parentName, children] of map) {
      sortedMap.set(
        parentName,
        children.toSorted((a, b) => (order.get(a.name) ?? 0) - (order.get(b.name) ?? 0)),
      )
    }
    return sortedMap
  })

  /**
   * Set of all route names that are children of some parent
   * Used to identify which items should NOT appear at root level
   */
  const allChildNames = computed(() => {
    const set = new Set()
    for (const children of childrenMap.value.values()) {
      for (const child of children) {
        set.add(child.name)
      }
    }
    return set
  })

  /**
   * Root level sidebar items (items that have no parent or whose parent doesn't exist)
   * These are rendered at the top level of the sidebar tree
   */
  const sideBarRootItems = computed(() => {
    const order = new Map((currentChildren.value || []).map((r, i) => [r.name, i]))
    return visibleRoutes.value
      .filter(r => !allChildNames.value.has(r.name))
      .toSorted((a, b) => (order.get(a.name) ?? 0) - (order.get(b.name) ?? 0))
  })

  /**
   * Get all group names (items that have children) for opened state management
   * Includes groups at any depth level
   */
  const allGroupNames = computed(() => new Set(childrenMap.value.keys()))

  /**
   * Build breadcrumb items from current route's parent chain
   * Traverses up using meta.parent to build full hierarchy path
   *
   * Example: For route with parent chain A -> B -> C -> Current
   * Returns: [moduleDisplay, 'A', 'B', 'C', 'Current']
   */
  const breadcrumbItems = computed(() => {
    const items = []
    const currentName = route.name ? String(route.name) : ''
    let current = routeByName.value.get(currentName)

    // Build path from current to root by following parent chain
    while (current) {
      items.unshift({
        title: current.meta?.title || current.name,
        to: { name: current.name },
      })
      const parentName = current.meta?.parent
      if (!parentName) break
      current = routeByName.value.get(parentName)
    }

    // Add module display as first item (clickable, navigates to module root)
    if (moduleDisplay.value) {
      items.unshift({ title: moduleDisplay.value, to: rootPath.value })
    }

    return items
  })

  /**
   * Get group names that should be expanded by default
   * Based on meta.defaultExpanded property in route config
   *
   * Usage in router files:
   *   { name: 'Parent', meta: { title: 'Parent', defaultExpanded: true } }
   */
  const defaultExpandedGroups = computed(() => {
    const expanded = []
    for (const groupName of allGroupNames.value) {
      const route = routeByName.value.get(groupName)
      if (route?.meta?.defaultExpanded) {
        expanded.push(groupName)
      }
    }
    return expanded
  })

  const selectedNav = computed(() => (route.name ? String(route.name) : ''))
  const selectedNavList = computed({
    get () {
      return selectedNav.value ? [selectedNav.value] : []
    },
    set (val) {
      const name = Array.isArray(val) ? (val[0] ?? null) : val
      if (name && name !== route.name) router.push({ name })
    },
  })

  function onRefreshNav () {
    // Notify current sheet to refresh/clear via eventBus
    eventBus.refreshNavTick = Date.now()
  }

  async function syncAuthState () {
    await authService.checkAuth()
    isAuthenticated.value = authService.isAuthenticated
    displayName.value = authService.currentUser?.username || ''
  }

  function getRequiredFunction (toRoute) {
    // Look from child to parent for the nearest requiredFunction without mutating arrays
    const matched = Array.isArray(toRoute.matched) ? toRoute.matched : []
    for (let i = matched.length - 1; i >= 0; i -= 1) {
      const req = matched[i]?.meta?.requiredFunction
      if (req) return req
    }
    return undefined
  }

  function checkPermissionForRoute (toRoute) {
    const requiredFunction = getRequiredFunction(toRoute)
    const denied = Boolean(requiredFunction && !authService.hasFunction(requiredFunction))
    permissionDenied.value = denied
    if (denied) {
      console.error(`User doesn't have required function: ${requiredFunction}`)
      showAlertLoop()
      return false
    }
    return true
  }
  /**
   * Find all ancestor group names for a given route name
   * Traverses up the tree using meta.parent property
   *
   * @param {string} name - Route name to find ancestors for
   * @returns {string[]} - Array of ancestor group names (from immediate parent to root)
   */
  function getAncestorGroupNames (name) {
    if (!name) return []
    const ancestors = []
    let current = routeByName.value.get(name)

    // Traverse up the tree following parent references
    while (current?.meta?.parent) {
      const parentName = current.meta.parent
      const parent = routeByName.value.get(parentName)
      if (!parent) break

      // Only include if parent is a group (has children)
      if (childrenMap.value.has(parentName)) {
        ancestors.push(parentName)
      }
      current = parent
    }
    return ancestors
  }

  /**
   * Filter opened groups to only include valid groups in current module
   * Also applies defaultExpanded groups when switching modules
   * Called when switching between top-level modules
   */
  function filterOpenedToCurrentModule () {
    const valid = allGroupNames.value
    const before = Array.isArray(openedGroups.value) ? openedGroups.value : []
    // Keep only valid groups from current state
    const validFromBefore = before.filter(n => valid.has(n))
    // Add default expanded groups that aren't already open
    const defaults = defaultExpandedGroups.value.filter(n => !validFromBefore.includes(n))
    const next = [...validFromBefore, ...defaults]
    // Only update when changed
    if (next.length !== before.length || next.some((n, i) => n !== before[i])) {
      openedGroups.value = next
    }
  }

  /**
   * Ensure all ancestor groups of current route are expanded
   * This opens the full path from root to current item at any depth
   */
  function ensureCurrentGroupOpen () {
    const currentName = route.name ? String(route.name) : ''
    const ancestors = getAncestorGroupNames(currentName)
    if (ancestors.length === 0) return

    const before = Array.isArray(openedGroups.value) ? openedGroups.value : []
    const toAdd = ancestors.filter(a => !before.includes(a))
    if (toAdd.length > 0) {
      openedGroups.value = [...before, ...toAdd]
    }
  }

  onMounted(async () => {
    try {
      isLoading.value = true
      // Persist SSO values for axios silent re-login flow
      if (credential) sessionStorage.setItem('sdk', credential)
      if (currentUserId) sessionStorage.setItem('uid', currentUserId)
      if (cipaBaseUrl) sessionStorage.setItem('cipaBaseUrl', cipaBaseUrl)

      await syncAuthState()

      // permission check on initial route
      checkPermissionForRoute(route)

      // If not authenticated, proactively prompt login (covers routes without requiredFunction)
      if (!isAuthenticated.value) {
        showAlertLoop()
      }

      filterOpenedToCurrentModule()
      ensureCurrentGroupOpen()

      // Start periodic token validation (checks every 30 seconds)
      // This ensures users can't stay on the page with an expired token
      tokenCheckInterval = setInterval(checkTokenValidity, TOKEN_CHECK_INTERVAL_MS)
      // Add session warning check interval
      setInterval(checkSessionWarning, 1000)
    } catch (error) {
      console.error('Authentication error:', error)
      showAlertLoop()
    } finally {
      isLoading.value = false
    }
  })

  watch(
    () => route.name,
    () => {
      checkPermissionForRoute(route)
      if (!isAuthenticated.value) {
        showAlertLoop()
      }
      // Do not collapse any groups here; only ensure current group is open
      ensureCurrentGroupOpen()
    },
  )

  watch(
    () => currentTopModule.value?.name,
    () => {
      // When switching modules, drop invalid groups and open the current one in the new module
      filterOpenedToCurrentModule()
      ensureCurrentGroupOpen()
    },
  )

  watch(
    () => eventBus.triggerAlertLoop,
    newVal => {
      if (newVal) showAlertLoop(eventBus.loginReason || 'Please login again.')
    },
  )

  onBeforeUnmount(() => {
    stopped = true
    // Clean up the token check interval
    if (tokenCheckInterval) {
      clearInterval(tokenCheckInterval)
      tokenCheckInterval = null
    }
    if (sessionWarning.timer) clearInterval(sessionWarning.timer)
  })

  async function handleLogout () {
    isLogoutLoading.value = true
    try {
      await authService.logout()
      await syncAuthState()
      await router.push('/')
    } finally {
      isLogoutLoading.value = false
    }
  }

  function toggleGroup (name) {
    const before = Array.isArray(openedGroups.value) ? openedGroups.value : []
    openedGroups.value = before.includes(name)
      ? before.filter(n => n !== name)
      : [...before, name]
  }

  function isOpen (name) {
    return Array.isArray(openedGroups.value) && openedGroups.value.includes(name)
  }
  function ensureOpen (name) {
    const before = Array.isArray(openedGroups.value) ? openedGroups.value : []
    if (!before.includes(name)) openedGroups.value = [...before, name]
  }

  function onParentClick (name) {
    ensureOpen(name)
    if (route.name !== name) router.push({ name })
  }

  const lastChevronToggle = ref(null)

  function onChevronClick (name) {
    lastChevronToggle.value = name
    toggleGroup(name)
  }

  function onOpenedUpdate (newOpened) {
    const before = Array.isArray(openedGroups.value) ? openedGroups.value : []
    const removed = before.filter(n => !newOpened.includes(n))

    // If a group was closed but not by our chevron toggle, ignore and keep it open
    openedGroups.value = removed.length > 0 && (!lastChevronToggle.value || !removed.includes(lastChevronToggle.value)) ? before : newOpened

    lastChevronToggle.value = null
  }

  function getTokenExp () {
    const token = localStorage.getItem('token')
    if (!token) return null
    try {
      const { exp } = jwtDecode(token)
      return exp
    } catch {
      return null
    }
  }

  function checkSessionWarning () {
    if (sessionWarning.show || sessionWarning.minimized || !isAuthenticated.value) return
    const exp = getTokenExp()
    if (!exp) return
    const now = Math.floor(Date.now() / 1000)
    const timeLeft = exp - now
    if (timeLeft <= SESSION_WARNING_THRESHOLD && timeLeft > 0 && sessionWarning.warnedForExp !== exp) {
      sessionWarning.show = true
      sessionWarning.timeLeft = timeLeft
      sessionWarning.warnedForExp = exp
      startSessionWarningCountdown()
    }
  }

  function startSessionWarningCountdown () {
    if (sessionWarning.timer) clearInterval(sessionWarning.timer)
    sessionWarning.timer = setInterval(() => {
      sessionWarning.timeLeft--
      if (sessionWarning.timeLeft <= 0) {
        clearInterval(sessionWarning.timer)
        sessionWarning.timer = null
        sessionWarning.show = false
        sessionWarning.minimized = false
        handleLogout()
      }
    }, 1000)
  }

  async function prolongSession () {
    sessionWarning.refreshing = true
    // Implement refresh logic here. If you have a refresh endpoint, call it. Otherwise, re-login or reload.
    // For now, just reload the page to simulate refresh.
    // You can replace this with an API call if available.
    await ensureFreshToken().then(() => {
      sessionWarning.refreshing = false
      sessionWarning.show = false
      sessionWarning.minimized = false
      if (sessionWarning.timer) {
        clearInterval(sessionWarning.timer)
        sessionWarning.timer = null
      }
    }).catch(error => {
      sessionWarning.refreshing = false
      sessionWarning.show = false
      sessionWarning.minimized = false
      dialogState.reason = 'Session prolong failed. You will be logged out.'
      dialogState.show = true
      setTimeout(() => {
        handleLogout()
      }, 2000)
    })
    // window.location.reload()
  }

  function minimizeSessionWarning () {
    sessionWarning.show = false
    sessionWarning.minimized = true
  }

  function restoreSessionWarning () {
    sessionWarning.show = true
    sessionWarning.minimized = false
  }
</script>

<style scoped>
/* Breadcrumb link styles */
.breadcrumb-link {
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.15s ease;
}

/* Ancestor items (not the current page) */
.breadcrumb-ancestor {
  color: #757575;
}

.breadcrumb-ancestor:hover {
  color: #1976d2;
  text-decoration: underline;
}

/*
 * Current page (last item) - CLICKABLE version
 *
 * To make the current page NON-CLICKABLE, add:
 *   pointer-events: none;
 *   cursor: default;
 * And remove the .breadcrumb-current:hover block below.
 */
.breadcrumb-current {
  color: #212121;
  font-weight: 500;
}

/* Hover effect for clickable current page - Remove this block to disable click */
.breadcrumb-current:hover {
  color: #1976d2;
  text-decoration: underline;
}
</style>
