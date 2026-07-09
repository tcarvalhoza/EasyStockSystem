import axios from 'axios';

export const api = axios.create({
  baseURL: '/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('easystock_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('easystock_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
