import axios from '@/plugins/axios';
import router from "@/router";
export async function logout() {
  const refreshToken = localStorage.getItem('refreshToken');
  try {
    await axios.post('/auth/logout', { refreshToken });
  } finally {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    await router.push('/login');
  }
}
