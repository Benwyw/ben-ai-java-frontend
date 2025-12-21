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
              to="/login"
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
  </v-app>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTheme, useDisplay } from 'vuetify'
import logoSrc from '@/assets/logo.png'
import SidebarNavItem from '@/components/SidebarNavItem.vue'
import { mainRouteChildren } from '@/router'
import { logout as logoutApi } from '@/api/logout'

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

// Check auth state on mount and when route changes
const checkAuthState = () => {
  username.value = localStorage.getItem('username')
}

onMounted(checkAuthState)
watch(() => route.path, checkAuthState)

// Handle logout
const handleLogout = async () => {
  isLoggingOut.value = true
  try {
    await logoutApi()
    username.value = null
    router.push('/')
  } finally {
    isLoggingOut.value = false
  }
}

const isDark = computed(() => theme.global.current.value.dark)

const toggleTheme = () => {
  theme.global.name.value = isDark.value ? 'light' : 'dark'
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
