import axios from '@/plugins/axios';

export async function login(username, password) {
  try {
    const response = await axios.post('/auth/login', {
      username,
      password
    }, {
      withCredentials: true
    });
    return response.data; // { accessToken, refreshToken }
  } catch (error) {
    throw error;
  }
}
