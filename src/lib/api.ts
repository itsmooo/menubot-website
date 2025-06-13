import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 10000,
});

// Add a request interceptor to include authentication token in all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response handling interceptor
api.interceptors.response.use(
  (response) => {
    // Don't transform the orders data
    if (response.config.url?.includes('/api/orders')) {
      return response;
    }
    
    // Transform only chat responses
    if (response.data && response.config.url?.includes('/api/chat')) {
      return {
        ...response,
        data: response.data
      };
    }
    return response;
  },
  (error) => {
    if (!error.response) {
      console.error('Network error:', error);
      throw new Error('Network error - Please check if the server is running');
    }
    return Promise.reject(error);
  }
);