import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth header interceptor
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.email) {
    config.headers.Authorization = `Bearer ${user.email}`;
  }
  return config;
});

const returnBook = async (issueId) => {
    try {
      const response = await api.post(`/admin/return-book/${issueId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  // Export the new method
  export { returnBook };

export default api;