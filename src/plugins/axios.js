import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { logout } from '@/api/logout'
import development from '@/config/development'
import production from '@/config/production'
import router from '@/router'
import { lastError } from '@/stores/errorStore'

// const instance = axios.create({
//   baseURL: 'http://localhost:8080/api'
// });

const instance = (process.env.NODE_ENV === 'production') ? axios.create(production) : axios.create(development)

// Refresh token concurrency handling (aligned with reference implementation)
let isRefreshingToken = false
let refreshSubscribers = []

function onTokenRefreshed (token) {
  for (const cb of refreshSubscribers) {
    cb(token)
  }
  refreshSubscribers = []
}

function addRefreshSubscriber (cb) {
  refreshSubscribers.push(cb)
}

/**
 * Get the expiration time of the current access token
 * @returns {number|null} - Unix timestamp (seconds) or null if no valid token
 */
export function getTokenExp () {
  const token = localStorage.getItem('accessToken')
  if (!token) {
    return null
  }
  try {
    const { exp } = jwtDecode(token)
    return exp
  } catch {
    return null
  }
}

/**
 * Ensure we have a fresh (non-expired) token
 * If current token is close to expiry (< 3 min), refresh it
 * @param {boolean} forceRefresh - Force refresh even if token has time left
 * @returns {Promise<string|null>} - Fresh token or null
 */
export async function ensureFreshToken (forceRefresh = false) {
  const token = localStorage.getItem('accessToken')
  if (!token) {
    return null
  }

  // If not forcing refresh, check if token still has time left
  if (!forceRefresh) {
    try {
      const { exp } = jwtDecode(token)
      const now = Date.now() / 1000
      // If token has > 3 minutes left, reuse it
      if (exp - now >= 180) {
        return token
      }
    } catch {
      // invalid token -> attempt refresh below
    }
  }

  // Try to refresh the token
  const refreshToken = localStorage.getItem('refreshToken')
  if (!refreshToken) {
    throw new Error('No refresh token available')
  }

  // Handle concurrent refresh requests (aligned with reference implementation)
  if (isRefreshingToken) {
    return new Promise((resolve, reject) => {
      addRefreshSubscriber(newToken => newToken ? resolve(newToken) : reject(new Error('refresh failed')))
    })
  }

  isRefreshingToken = true
  try {
    // Use raw axios to bypass interceptors that would trigger forceLogout on 401
    const baseURL = instance.defaults.baseURL
    const res = await axios.post(`${baseURL}/auth/refresh`, { refreshToken })
    const newAccess = res.data.accessToken
    // Also store new refresh token if provided
    if (res.data.refreshToken) {
      localStorage.setItem('refreshToken', res.data.refreshToken)
    }
    localStorage.setItem('accessToken', newAccess)
    onTokenRefreshed(newAccess)
    return newAccess
  } catch (error) {
    // Refresh failed (likely server-side idle timeout) -> propagate to caller
    onTokenRefreshed(null)
    throw error
  } finally {
    isRefreshingToken = false
  }
}

function triggerError (msg) {
  // clear then set to force a reactive flip even for the same text
  lastError.value = ''
  lastError.value = msg
}

// Attach access token to every request
instance.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle responses
let isRefreshing = false
let pending = []

function onRefreshed (newToken) {
  for (const cb of pending) {
    cb(newToken)
  }
  pending = []
}

instance.interceptors.response.use(
  res => res,
  async err => {
    const original = err.config || {}
    const status = err?.response?.status
    const code = err?.response?.data?.code
    const refreshToken = localStorage.getItem('refreshToken')

    // Access token expired/invalid → try refresh once
    if (
      status === 401
      && (code === 'ACCESS_TOKEN_EXPIRED' || code === 'ACCESS_TOKEN_INVALID')
      && !original._retry
    ) {
      original._retry = true

      if (!refreshToken) {
        await forceLogout('Your session expired. Please sign in again.')
        throw err
      }

      if (isRefreshing) {
        return new Promise(resolve => {
          pending.push(newToken => {
            original.headers.Authorization = `Bearer ${newToken}`
            resolve(instance.request(original))
          })
        })
      }

      try {
        isRefreshing = true
        const res = await instance.post('/auth/refresh', { refreshToken })
        const newAccess = res.data.accessToken
        // Also store new refresh token if provided (aligned with reference)
        if (res.data.refreshToken) {
          localStorage.setItem('refreshToken', res.data.refreshToken)
        }
        localStorage.setItem('accessToken', newAccess)
        onRefreshed(newAccess)
        original.headers.Authorization = `Bearer ${newAccess}`
        return instance.request(original)
      } catch (error) {
        await forceLogout('Your session has ended. Please sign in again.')
        throw error
      } finally {
        isRefreshing = false
      }
    }

    // Any 401 when we cannot refresh → logout
    if (
      status === 401
      && (code === 'REFRESH_TOKEN_INVALID'
        || code === 'REFRESH_TOKEN_EXPIRED'
        || !refreshToken
        || !code) // fallback: no code at all
    ) {
      await forceLogout('Your session has ended. Please sign in again.')
      throw err
    }

    // True 403: authenticated but not allowed
    if (status === 403) {
      triggerError('You do not have permission to perform this action.')
    }

    throw err
  },
)

async function forceLogout (message) {
  try {
    await logout() // revoke server session + clear local storage
  } finally {
    triggerError(message || 'Signed out.')
    try {
      await router.push('/login')
    } catch {
      window.location.assign('/login')
    }
  }
}

export default instance
