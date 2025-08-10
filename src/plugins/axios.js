import axios from 'axios';
import development from '@/config/development'
import production from '@/config/production'

// const instance = axios.create({
//   baseURL: 'http://localhost:8080/api'
// });

const instance = (process.env.NODE_ENV === 'production') ? axios.create(production) : axios.create(development)

// Attach access token to every request
instance.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 errors and refresh token automatically
instance.interceptors.response.use(
  response => response,
  async error => {
    if (error.response && error.response.status === 401) {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const res = await instance.post('/auth/refresh', { refreshToken });
          localStorage.setItem('accessToken', res.data.accessToken);
          error.config.headers.Authorization = `Bearer ${res.data.accessToken}`;
          return instance.request(error.config);
        } catch (refreshError) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        }
      }
    }
    return Promise.reject(error); // ensure chain continues
  }
);

export default instance;
