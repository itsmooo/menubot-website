import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 10000,
});

// Add response handling interceptor
api.interceptors.response.use(
  (response) => {
    // Don't transform the orders data
    if (response.config.url?.includes('/api/orders')) {
      return response;
    }
    
    // Transform only chat responses
    if (response.data && response.config.url?.includes('/api/chatbot')) {
      return {
        ...response,
        data: {
          message: response.data.translation || '',
          response: response.data.response || '',
          timestamp: response.data.timestamp || new Date().toISOString()
        }
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