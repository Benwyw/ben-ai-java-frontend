import axios from '@/plugins/axios'

export async function login (username, password) {
  const { data } = await axios.post('/auth/login', { username, password }, { withCredentials: true })
  return data // { accessToken, refreshToken }
}
