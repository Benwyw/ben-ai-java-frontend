// src/stores/authStore.js
import { reactive } from 'vue'
import { jwtDecode } from 'jwt-decode'

/**
 * Auth Store - Manages authentication state and role-based permissions
 *
 * Usage in components:
 *
 * import { authStore } from '@/stores/authStore'
 *
 * // Check if user is logged in
 * authStore.isLoggedIn
 *
 * // Get current user's role
 * authStore.role  // 'USER', 'ADMIN', etc.
 *
 * // Check if user has specific role
 * authStore.hasRole('ADMIN')
 *
 * // Check if user has any of the specified roles
 * authStore.hasAnyRole(['ADMIN', 'MODERATOR'])
 *
 * // Use in v-if for conditional rendering
 * <v-btn v-if="authStore.hasRole('ADMIN')">Admin Only</v-btn>
 * <div v-if="authStore.hasAnyRole(['ADMIN', 'MODERATOR'])">Moderators Section</div>
 */

const state = reactive({
  username: null,
  role: null,
})

/**
 * Sync auth state from localStorage and decode role from JWT
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
 */
function clearAuthState() {
  state.username = null
  state.role = null
}

/**
 * Check if user has a specific role
 * @param {string} role - Role to check (e.g., 'ADMIN', 'USER')
 * @returns {boolean}
 */
function hasRole(role) {
  if (!state.role) return false
  return state.role.toUpperCase() === role.toUpperCase()
}

/**
 * Check if user has any of the specified roles
 * @param {string[]} roles - Array of roles to check
 * @returns {boolean}
 */
function hasAnyRole(roles) {
  if (!state.role || !Array.isArray(roles)) return false
  const userRole = state.role.toUpperCase()
  return roles.some(r => r.toUpperCase() === userRole)
}

/**
 * Check if user is an admin
 * @returns {boolean}
 */
function isAdmin() {
  return hasRole('ADMIN')
}

// Initialize on module load
syncAuthState()

// Listen for storage changes (e.g., login/logout in another tab)
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === 'accessToken' || e.key === 'username' || e.key === null) {
      syncAuthState()
    }
  })
}

export const authStore = {
  // Reactive state (use these in templates)
  get username() { return state.username },
  get role() { return state.role },
  get isLoggedIn() { return !!state.username },

  // Methods
  syncAuthState,
  clearAuthState,
  hasRole,
  hasAnyRole,
  isAdmin,
}

export default authStore

