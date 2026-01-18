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
      - rail: Boolean indicating if sidebar is in collapsed/rail mode
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
      - externalLink: External URL to open in new tab (shows mdi-open-in-new icon)
      - requiresAuth: Set to true to require authentication (optional)
      - requiredRoles: Array of roles that can access (optional)
      - hideNavIfNoAccess: Hide from nav if no access (optional, default: false)
  -->

  <!-- Has children: render as expandable group (only when not in rail mode) -->
  <v-list-group v-if="children && children.length > 0 && !rail" :value="item.name">
    <template #activator="{ props: activatorProps }">
      <v-list-item
        v-bind="activatorProps"
        :class="{ 'v-list-item--active text-primary': isParentActive }"
        color="primary"
        :prepend-icon="item.meta?.iconImage ? undefined : item.meta?.icon"
        rounded="xl"
        :title="item.meta?.title || item.name"
        :value="item.name"
        @click="onParentClickFn(item.name)"
      >
        <!-- Custom image icon -->
        <template v-if="item.meta?.iconImage" #prepend>
          <v-avatar class="nav-icon-avatar" rounded="0" size="24">
            <v-img :src="item.meta.iconImage" />
          </v-avatar>
        </template>
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
      :rail="rail"
    />
  </v-list-group>

  <!-- Rail mode: render parent as icon, then flatten children below -->
  <template v-else-if="children && children.length > 0 && rail">
    <!-- Parent item as icon -->
    <v-list-item
      :class="{ 'v-list-item--active text-primary': isParentActive, ...glowEffectClass }"
      color="primary"
      :prepend-icon="item.meta?.iconImage ? undefined : item.meta?.icon"
      rounded="xl"
      :title="item.meta?.title || item.name"
      :to="item.path || '/'"
      :value="item.name"
    >
      <!-- Custom image icon -->
      <template v-if="item.meta?.iconImage" #prepend>
        <v-avatar class="nav-icon-avatar" rounded="0" size="24">
          <v-img :src="item.meta.iconImage" />
        </v-avatar>
      </template>
    </v-list-item>
    <!-- Flattened children as icons -->
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
      :rail="rail"
    />
  </template>

  <!-- No children: render as simple leaf item -->
  <!-- External link: opens in new tab -->
  <v-list-item
    v-else-if="item.meta?.externalLink"
    :class="glowEffectClass"
    color="primary"
    :href="item.meta.externalLink"
    :prepend-icon="item.meta?.iconImage ? undefined : item.meta?.icon"
    rounded="xl"
    target="_blank"
    rel="noopener noreferrer"
    :title="item.meta?.title || item.name"
    :value="item.name"
  >
    <!-- Custom image icon -->
    <template v-if="item.meta?.iconImage" #prepend>
      <v-avatar class="nav-icon-avatar" rounded="0" size="24">
        <v-img :src="item.meta.iconImage" />
      </v-avatar>
    </template>
    <!-- Show external link icon (hide in rail mode) -->
    <template v-if="!rail" #append>
      <v-icon color="grey" size="small">mdi-open-in-new</v-icon>
    </template>
  </v-list-item>

  <!-- Internal link: uses vue-router -->
  <v-list-item
    v-else
    :class="glowEffectClass"
    color="primary"
    :exact="item.path === '' || item.path === '/'"
    :prepend-icon="item.meta?.iconImage ? undefined : item.meta?.icon"
    rounded="xl"
    :title="item.meta?.title || item.name"
    :to="item.path || '/'"
    :value="item.name"
  >
    <!-- Custom image icon -->
    <template v-if="item.meta?.iconImage" #prepend>
      <v-avatar class="nav-icon-avatar" rounded="0" size="24">
        <v-img :src="item.meta.iconImage" />
      </v-avatar>
    </template>
    <!-- Show lock icon if user doesn't have access (hide in rail mode) -->
    <template v-if="!rail && isLockedFn && isLockedFn(item)" #append>
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
    rail: {
      type: Boolean,
      default: false,
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

  /**
   * Glow effect class based on meta.glowEffect value
   *
   * Usage in router meta:
   *   glowEffect: 'angel'       - Soft lavender glow with background (memorial/special)
   *   glowEffect: 'angel-soft'  - Subtle outer halo only, no background (more distinct from active state)
   *   glowEffect: 'pulse'       - Blinking promotional glow
   *   glowEffect: true          - Defaults to 'angel'
   *   glowEffect: false         - No glow (or omit the property)
   */
  const glowEffectClass = computed(() => {
    const effect = props.item?.meta?.glowEffect
    if (!effect) return {}

    if (effect === 'pulse') {
      return { 'nav-glow-pulse': true }
    }
    if (effect === 'angel-soft') {
      return { 'nav-glow-angel-soft': true }
    }
    // Default to angel for true or 'angel'
    return { 'nav-glow-angel': true }
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

/* Custom image icon styling to align with MDI icons */
.nav-icon-avatar {
  margin-right: 16px;
  background: transparent !important;
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

/**
 * Glow Effects - Reusable glow animations for special nav items
 *
 * Usage: Add `glowEffect: 'angel' | 'pulse' | true` to route meta
 *
 * Options:
 *   glowEffect: 'angel'  - Soft, steady golden glow (memorial/special pages)
 *   glowEffect: 'pulse'  - Blinking promotional glow (announcements/promos)
 *   glowEffect: true     - Defaults to 'angel'
 *
 * Example:
 *   meta: {
 *     title: 'Whity',
 *     icon: 'mdi-cat',
 *     glowEffect: 'angel',  // Steady angelic glow
 *   }
 */

/* ==========================================================================
   ANGEL GLOW - Soft lavender glow with subtle background fill
   For memorial/special pages - visible but gentle
   ========================================================================== */
.nav-glow-angel {
  position: relative;
  box-shadow:
    0 0 12px rgba(200, 180, 230, 0.35),
    0 0 24px rgba(220, 200, 240, 0.2);
  background: linear-gradient(
    135deg,
    rgba(210, 195, 235, 0.1) 0%,
    rgba(255, 255, 255, 0.06) 50%,
    rgba(245, 210, 225, 0.1) 100%
  );
  border: none;
}

.nav-glow-angel::before {
  content: '';
  position: absolute;
  top: -3px;
  left: -3px;
  right: -3px;
  bottom: -3px;
  border-radius: inherit;
  background: linear-gradient(
    135deg,
    rgba(200, 180, 230, 0.2) 0%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(245, 210, 225, 0.2) 100%
  );
  opacity: 0.4;
  z-index: -1;
  filter: blur(8px);
  pointer-events: none;
}

/* Dark mode for angel */
@media (prefers-color-scheme: dark) {
  .nav-glow-angel {
    box-shadow:
      0 0 10px rgba(230, 220, 255, 0.3),
      0 0 20px rgba(255, 240, 250, 0.15);
    background: linear-gradient(
      135deg,
      rgba(230, 220, 255, 0.06) 0%,
      rgba(255, 255, 255, 0.03) 50%,
      rgba(255, 240, 250, 0.06) 100%
    );
  }

  .nav-glow-angel::before {
    opacity: 0.25;
    filter: blur(10px);
  }
}

/* ==========================================================================
   ANGEL-SOFT GLOW - Subtle outer halo only, no background
   More distinct from active state selection
   ========================================================================== */
.nav-glow-angel-soft {
  position: relative;
}

.nav-glow-angel-soft::before {
  content: '';
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  border-radius: 16px;
  background: transparent;
  box-shadow:
    0 0 8px rgba(200, 185, 230, 0.4),
    0 0 16px rgba(220, 200, 240, 0.25),
    0 0 24px rgba(240, 220, 250, 0.15);
  z-index: -1;
  pointer-events: none;
}

/* Dark mode for angel-soft */
@media (prefers-color-scheme: dark) {
  .nav-glow-angel-soft::before {
    box-shadow:
      0 0 6px rgba(220, 210, 255, 0.3),
      0 0 14px rgba(235, 225, 255, 0.2),
      0 0 22px rgba(250, 240, 255, 0.1);
  }
}

/* ==========================================================================
   PULSE GLOW - Blinking, attention-grabbing (for promotions/announcements)
   ========================================================================== */
.nav-glow-pulse {
  position: relative;
  animation: pulse-glow-animation 3s ease-in-out infinite;
}

.nav-glow-pulse::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: inherit;
  background: linear-gradient(
    135deg,
    rgba(255, 215, 0, 0.1) 0%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 215, 0, 0.1) 100%
  );
  opacity: 0;
  animation: pulse-bg-animation 3s ease-in-out infinite;
  pointer-events: none;
}

@keyframes pulse-glow-animation {
  0%, 100% {
    box-shadow:
      0 0 4px rgba(255, 215, 0, 0.2),
      0 0 8px rgba(255, 255, 255, 0.1);
  }
  50% {
    box-shadow:
      0 0 8px rgba(255, 215, 0, 0.4),
      0 0 16px rgba(255, 255, 255, 0.2),
      0 0 24px rgba(255, 215, 0, 0.15);
  }
}

@keyframes pulse-bg-animation {
  0%, 100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
</style>
