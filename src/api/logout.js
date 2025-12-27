// src/api/logout.js
import axios from '@/plugins/axios'

export async function logout () {
  const refreshToken = localStorage.getItem('refreshToken')
  try {
    await axios.post('/auth/logout', { refreshToken }, { withCredentials: true })
  } catch {
    // swallow; still clear client state
  } finally {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('username')
  }
}
