import axios from 'axios';
import development from '@/config/development'
import production from '@/config/production'
import { lastError } from '@/stores/errorStore';
import { logout } from '@/api/logout';
import router from "@/router";

// const instance = axios.create({
//   baseURL: 'http://localhost:8080/api'
// });

const instance = (process.env.NODE_ENV === 'production') ? axios.create(production) : axios.create(development)

function triggerError(msg) {
  // clear then set to force a reactive flip even for the same text
  lastError.value = '';
  lastError.value = msg;
}

// Attach access token to every request
instance.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle responses
let isRefreshing = false;
let pending = [];

function onRefreshed(newToken) {
  pending.forEach(cb => cb(newToken));
  pending = [];
}

instance.interceptors.response.use(
  res => res,
  async err => {
    const original = err.config || {};
    const status = err?.response?.status;
    const code = err?.response?.data?.code;
    const refreshToken = localStorage.getItem('refreshToken');

    // Access token expired/invalid → try refresh once
    if (
      status === 401 &&
      (code === 'ACCESS_TOKEN_EXPIRED' || code === 'ACCESS_TOKEN_INVALID') &&
      !original._retry
    ) {
      original._retry = true;

      if (!refreshToken) {
        await forceLogout('Your session expired. Please sign in again.');
        return Promise.reject(err);
      }

      if (isRefreshing) {
        return new Promise(resolve => {
          pending.push(newToken => {
            original.headers.Authorization = `Bearer ${newToken}`;
            resolve(instance.request(original));
          });
        });
      }

      try {
        isRefreshing = true;
        const res = await instance.post('/auth/refresh', { refreshToken });
        const newAccess = res.data.accessToken;
        localStorage.setItem('accessToken', newAccess);
        onRefreshed(newAccess);
        original.headers.Authorization = `Bearer ${newAccess}`;
        return instance.request(original);
      } catch (e) {
        await forceLogout('Your session has ended. Please sign in again.');
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }

    // Any 401 when we cannot refresh → logout
    if (
      status === 401 &&
      (code === 'REFRESH_TOKEN_INVALID' ||
        code === 'REFRESH_TOKEN_EXPIRED' ||
        !refreshToken ||
        !code) // fallback: no code at all
    ) {
      await forceLogout('Your session has ended. Please sign in again.');
      return Promise.reject(err);
    }

    // True 403: authenticated but not allowed
    if (status === 403) {
      triggerError('You do not have permission to perform this action.');
    }

    return Promise.reject(err);
  }
);

async function forceLogout(message) {
  try {
    await logout(); // revoke server session + clear local storage
    syncAuthState(); // immediately flip UI store to logged-out
  } finally {
    triggerError(message || 'Signed out.');
    try {
      await router.push('/login');
    } catch {
      window.location.assign('/login');
    }
  }
}

export default instance;
