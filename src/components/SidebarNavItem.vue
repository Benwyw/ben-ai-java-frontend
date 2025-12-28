<template>
  <!--
    SidebarNavItem.vue - Recursive sidebar navigation component

    This component renders a navigation item that can have infinite nested children.
    It recursively renders itself for each child, creating a tree structure.

    Props:
      - item: The route item to render (contains name, path, meta.title, etc.)
      - children: Array of child route items
      - childrenMap: Map of route name -> children array for recursive lookup
      - depth: Current nesting depth (for styling/indentation if needed)
      - isOpenFn: Function to check if a group is open
      - onParentClickFn: Handler for clicking parent items
      - onChevronClickFn: Handler for clicking chevron toggle
      - isLockedFn: Function to check if item should show lock icon (no access)

    Usage in router files:
      Define parent-child relationships using meta.parent property:
      {
        path: '/parent-item',
        name: 'ParentItem',
        meta: {
          title: 'Parent',
          icon: 'mdi-folder',
          navSection: 'main',
          defaultExpanded: true  // <-- Set to true to expand by default
        }
      },
      {
        path: '/child-item',
        name: 'ChildItem',
        meta: { title: 'Child', parent: 'ParentItem' }  // <-- parent property links to parent's name
      },
      {
        path: '/grandchild-item',
        name: 'GrandchildItem',
        meta: { title: 'Grandchild', parent: 'ChildItem' }  // <-- can nest infinitely
      }

    Available meta options for sidebar:
      - title: Display name in sidebar (required)
      - icon: MDI icon name (optional, e.g., 'mdi-home')
      - parent: Parent route name for nesting (optional)
      - navSection: Section grouping - 'main', 'tools', 'legal' (optional)
      - navOrder: Order within section (optional, lower = higher priority)
      - navHidden: Set to true to hide from sidebar (optional)
      - defaultExpanded: Set to true to expand group by default (optional)
      - requiresAuth: Set to true to require authentication (optional)
      - requiredRoles: Array of roles that can access (optional)
      - hideNavIfNoAccess: Hide from nav if no access (optional, default: false)
  -->

  <!-- Has children: render as expandable group -->
  <v-list-group v-if="children && children.length > 0" :value="item.name">
    <template #activator="{ props: activatorProps }">
      <v-list-item
        v-bind="activatorProps"
        :class="{ 'v-list-item--active text-primary': isParentActive }"
        color="primary"
        :prepend-icon="item.meta?.icon"
        rounded="xl"
        :title="item.meta?.title || item.name"
        :value="item.name"
        @click="onParentClickFn(item.name)"
      >
        <!-- Custom chevron toggle button -->
        <template #append>
          <v-icon v-if="isLockedFn && isLockedFn(item)" class="mr-1" color="grey" size="small">mdi-lock</v-icon>
          <v-btn
            aria-label="Toggle group"
            density="comfortable"
            icon
            size="small"
            variant="text"
            @click.stop="onChevronClickFn(item.name)"
          >
            <v-icon :class="isOpenFn(item.name) ? 'rotate-90' : ''">mdi-chevron-right</v-icon>
          </v-btn>
        </template>
      </v-list-item>
    </template>

    <!-- Recursively render children -->
    <SidebarNavItem
      v-for="child in children"
      :key="child.name"
      :children="childrenMap.get(child.name) || []"
      :children-map="childrenMap"
      :depth="depth + 1"
      :is-locked-fn="isLockedFn"
      :is-open-fn="isOpenFn"
      :item="child"
      :on-chevron-click-fn="onChevronClickFn"
      :on-parent-click-fn="onParentClickFn"
    />
  </v-list-group>

  <!-- No children: render as simple leaf item -->
  <v-list-item
    v-else
    color="primary"
    :exact="item.path === '' || item.path === '/'"
    :prepend-icon="item.meta?.icon"
    rounded="xl"
    :title="item.meta?.title || item.name"
    :to="item.path || '/'"
    :value="item.name"
  >
    <!-- Show lock icon if user doesn't have access -->
    <template v-if="isLockedFn && isLockedFn(item)" #append>
      <v-icon color="grey" size="small">mdi-lock</v-icon>
    </template>
  </v-list-item>
</template>

<script setup>
/**
 * SidebarNavItem - Recursive component for infinite-depth sidebar navigation
 *
 * This component uses Vue's recursive component feature to render nested
 * navigation trees of any depth. The tree structure is determined by the
 * 'parent' property in route meta configurations.
 */

  import { computed } from 'vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()

  const props = defineProps({
    item: {
      type: Object,
      required: true,
    },
    children: {
      type: Array,
      default: () => [],
    },
    childrenMap: {
      type: Map,
      required: true,
    },
    depth: {
      type: Number,
      default: 0,
    },
    isOpenFn: {
      type: Function,
      required: true,
    },
    isLockedFn: {
      type: Function,
      default: null,
    },
    onParentClickFn: {
      type: Function,
      required: true,
    },
    onChevronClickFn: {
      type: Function,
      required: true,
    },
  })

  /**
   * Check if this parent item is active (current route matches item's path)
   */
  const isParentActive = computed(() => {
    if (!props.item?.path) return false
    // Exact match for the parent item's path
    return route.path === props.item.path
  })
</script>

<style scoped>
.rotate-90 {
  transform: rotate(90deg);
  transition: transform 0.2s ease-in-out;
}

:deep(.v-icon) {
  transition: transform 0.2s ease-in-out;
}

/* Match Vuetify's default active state tonal background for parent items */
/* noinspection CssUnresolvedCustomProperty */
.v-list-item--active {
  background-color: rgba(var(--v-theme-primary, 24, 103, 192), 0.12) !important;
}

/* noinspection CssUnresolvedCustomProperty */
.v-list-item--active :deep(.v-list-item__prepend > .v-icon) {
  color: rgb(var(--v-theme-primary, 24, 103, 192)) !important;
}
</style>
