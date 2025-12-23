import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { eventBus } from '@/service/eventBus.js'

const baseURL = import.meta.env.VITE_API_BASE_URL
const apiPort = import.meta.env.VITE_API_PORT

const instance = axios.create({
  baseURL: baseURL + ':' + apiPort + '/api',
  withCredentials: true,
})

let isRefreshing = false
let refreshSubscribers = []

function onRefreshed (token) {
  for (const cb of refreshSubscribers) {
    cb(token)
  }
  refreshSubscribers = []
}
function addRefreshSubscriber (cb) {
  refreshSubscribers.push(cb)
}
async function reloginFromStorage () {
  const sdk = sessionStorage.getItem('sdk')
  const uid = sessionStorage.getItem('uid')
  if (!sdk || !uid || sdk.trim() === '' || uid.trim() === '') {
    throw new Error('Invalid or missing SSO params — cannot relogin')
  }
  const res = await axios.post(`${baseURL}:${apiPort}/api/auth/login`, null, {
    params: { credential: sdk, uid },
    withCredentials: true,
  })
  const userData = res.data
  localStorage.setItem('token', userData.token)
  localStorage.setItem('username', userData.username)
  localStorage.setItem('authorities', JSON.stringify(userData.authorities))
  // Set default auth header for the shared instance
  instance.defaults.headers.common['Authorization'] = 'Bearer ' + userData.token
  return userData.token
}

async function ensureFreshToken () {
  const token = localStorage.getItem('token')
  if (!token) {
    return null
  }

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

  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      addRefreshSubscriber(newToken => newToken ? resolve(newToken) : reject(new Error('refresh failed')))
    })
  }

  isRefreshing = true
  try {
    const res = await axios.post(`${baseURL}:${apiPort}/api/auth/refresh`, {}, {
      withCredentials: true,
    })
    const newToken = res.data.token
    localStorage.setItem('token', newToken)
    onRefreshed(newToken)
    return newToken
  } catch (error) {
    // Refresh failed (likely server-side idle timeout) -> propagate to caller
    onRefreshed(null)
    throw error
  } finally {
    isRefreshing = false
  }
}

// Request interceptor: attach token, refresh if < 3 min
instance.interceptors.request.use(
  async config => {
    const token = localStorage.getItem('token')
    if (!token) {
      return config
    }

    try {
      const { exp } = jwtDecode(token)
      const now = Date.now() / 1000
      if (exp - now < 180) {
        const fresh = await ensureFreshToken().catch(() => null)
        if (fresh) {
          config.headers['Authorization'] = `Bearer ${fresh}`
        }
        return config
      }
      config.headers['Authorization'] = `Bearer ${token}`
      return config
    } catch {
      // If decode fails, try one refresh
      const fresh = await ensureFreshToken().catch(() => null)
      if (fresh) {
        config.headers['Authorization'] = `Bearer ${fresh}`
      }
      return config
    }
  },
  error => Promise.reject(error),
)

// Response interceptor: handle 401 -> try refresh -> try re-login -> redirect
instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    // If the 401 came from /auth/refresh itself, skip trying to refresh again
    const isRefreshCall = originalRequest?.url?.includes?.('/auth/refresh')

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        if (!isRefreshCall) {
          // 1) Try to refresh
          const fresh = await ensureFreshToken()
          if (fresh) {
            originalRequest.headers['Authorization'] = 'Bearer ' + fresh
            return instance(originalRequest)
          }
        }
      } catch {
        // ignore; will try relogin next
      }

      // Guard: if no valid SSO params, bail out and show dialog
      const sdk = sessionStorage.getItem('sdk')
      const uid = sessionStorage.getItem('uid')
      if (!sdk || !uid || sdk.trim() === '' || uid.trim() === '') {
        localStorage.clear()
        eventBus.sessionExpired = true
        eventBus.loginReason = 'Your session is invalid. Please login again.'
        eventBus.triggerAlertLoop = true
        throw error
      }

      // 2) Try silent re-login using stored SSO params
      try {
        const newToken = await reloginFromStorage()
        originalRequest.headers['Authorization'] = 'Bearer ' + newToken
        return instance(originalRequest)
      } catch {
        // 3) Show dialog instead of hard redirect
        localStorage.clear()
        eventBus.sessionExpired = true
        eventBus.loginReason = 'Your session has expired. Please login again.'
        eventBus.triggerAlertLoop = true
        throw error
      }
    }

    throw error
  },
)

export { ensureFreshToken }
export default instance
