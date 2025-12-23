/**
 * ============================================================================
 * Auth Store - Authentication State & Role-Based Permission Management
 * ============================================================================
 *
 * This store manages user authentication state and provides role-based
 * permission checking utilities for the application.
 *
 * ============================================================================
 * FEATURES
 * ============================================================================
 *
 * - Reactive authentication state (username, role)
 * - Role extracted from JWT access token automatically
 * - Permission checking methods for role-based access control
 * - Auto-sync on storage changes (supports multi-tab scenarios)
 *
 * ============================================================================
 * USAGE IN COMPONENTS
 * ============================================================================
 *
 * Import:
 *   import { authStore } from '@/stores/authStore'
 *
 * Check if user is logged in:
 *   if (authStore.isLoggedIn) { ... }
 *   <div v-if="authStore.isLoggedIn">Welcome!</div>
 *
 * Get current user info:
 *   authStore.username  // e.g., 'john_doe'
 *   authStore.role      // e.g., 'ADMIN', 'USER', 'MODERATOR'
 *
 * Check specific role:
 *   authStore.hasRole('ADMIN')  // true if user is ADMIN
 *   <v-btn v-if="authStore.hasRole('ADMIN')">Admin Only</v-btn>
 *
 * Check multiple roles (OR logic):
 *   authStore.hasAnyRole(['ADMIN', 'MODERATOR'])  // true if either role
 *   <div v-if="authStore.hasAnyRole(['ADMIN', 'MOD'])">Mod Tools</div>
 *
 * Shorthand for admin check:
 *   authStore.isAdmin()  // equivalent to hasRole('ADMIN')
 *
 * ============================================================================
 * TEMPLATE EXAMPLES
 * ============================================================================
 *
 * Show element only for admins:
 *   <v-btn v-if="authStore.hasRole('ADMIN')" color="error">Delete</v-btn>
 *
 * Show element for multiple roles:
 *   <v-card v-if="authStore.hasAnyRole(['ADMIN', 'MANAGER'])">
 *     Manager Dashboard
 *   </v-card>
 *
 * Conditional content based on role:
 *   <v-chip v-if="authStore.isAdmin()" color="red">Admin</v-chip>
 *   <v-chip v-else-if="authStore.hasRole('MODERATOR')" color="orange">Mod</v-chip>
 *   <v-chip v-else color="blue">User</v-chip>
 *
 * Disable button if not authorized:
 *   <v-btn :disabled="!authStore.hasRole('ADMIN')">
 *     {{ authStore.hasRole('ADMIN') ? 'Edit' : 'View Only' }}
 *   </v-btn>
 *
 * ============================================================================
 * INTEGRATION WITH ROUTER
 * ============================================================================
 *
 * This store works with router meta properties:
 * - requiresAuth: Checks authStore.isLoggedIn
 * - requiredRoles: Checks authStore.hasAnyRole(requiredRoles)
 *
 * See router/index.js for route configuration details.
 *
 * ============================================================================
 * JWT TOKEN STRUCTURE (Expected)
 * ============================================================================
 *
 * The access token should contain a 'role' claim:
 * {
 *   "sub": "username",
 *   "role": "ADMIN",  // <-- This is extracted by syncAuthState()
 *   "iat": 1234567890,
 *   "exp": 1234567890
 * }
 *
 * ============================================================================
 */

import { reactive } from 'vue'
import { jwtDecode } from 'jwt-decode'

/**
 * Reactive state object - DO NOT export directly
 * Use the authStore methods/getters instead
 * @private
 */
const state = reactive({
  username: null,
  role: null,
})

/**
 * Sync auth state from localStorage and decode role from JWT
 * Called automatically on:
 * - Module initialization
 * - Login success
 * - Storage change events (multi-tab support)
 */
function syncAuthState() {
  state.username = localStorage.getItem('username')

  const accessToken = localStorage.getItem('accessToken')
  if (accessToken) {
    try {
      const decoded = jwtDecode(accessToken)
      state.role = decoded.role || null
    } catch {
      state.role = null
    }
  } else {
    state.role = null
  }
}

/**
 * Clear auth state (call on logout)
 * Resets username and role to null
 */
function clearAuthState() {
  state.username = null
  state.role = null
}

/**
 * Check if user has a specific role (case-insensitive)
 * @param {string} role - Role to check (e.g., 'ADMIN', 'USER')
 * @returns {boolean} True if user has the exact role
 * @example
 * authStore.hasRole('ADMIN')  // true if user role is 'ADMIN'
 */
function hasRole(role) {
  if (!state.role) return false
  return state.role.toUpperCase() === role.toUpperCase()
}

/**
 * Check if user has any of the specified roles (OR logic, case-insensitive)
 * @param {string[]} roles - Array of roles to check
 * @returns {boolean} True if user has ANY of the roles
 * @example
 * authStore.hasAnyRole(['ADMIN', 'MODERATOR'])  // true if user is ADMIN or MODERATOR
 */
function hasAnyRole(roles) {
  if (!state.role || !Array.isArray(roles)) return false
  const userRole = state.role.toUpperCase()
  return roles.some(r => r.toUpperCase() === userRole)
}

/**
 * Shorthand check for admin role
 * @returns {boolean} True if user is an admin
 * @example
 * authStore.isAdmin()  // equivalent to hasRole('ADMIN')
 */
function isAdmin() {
  return hasRole('ADMIN')
}

// ============================================================================
// INITIALIZATION
// ============================================================================

// Initialize state on module load
syncAuthState()

// Listen for storage changes (e.g., login/logout in another tab)
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === 'accessToken' || e.key === 'username' || e.key === null) {
      syncAuthState()
    }
  })
}

// ============================================================================
// EXPORTS
// ============================================================================

/**
 * Auth Store - Main export
 * Provides reactive getters and methods for authentication state
 */
export const authStore = {
  // ---- Reactive Getters (use in templates) ----
  /** Current username or null if not logged in */
  get username() { return state.username },
  /** Current role string (e.g., 'ADMIN', 'USER') or null */
  get role() { return state.role },
  /** True if user is logged in */
  get isLoggedIn() { return !!state.username },

  // ---- Methods ----
  /** Sync state from localStorage (call after login) */
  syncAuthState,
  /** Clear state (call on logout) */
  clearAuthState,
  /** Check if user has specific role */
  hasRole,
  /** Check if user has any of the roles */
  hasAnyRole,
  /** Shorthand for hasRole('ADMIN') */
  isAdmin,
}

export default authStore
