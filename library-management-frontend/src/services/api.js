// import axios from 'axios';

// const BASE_URL = 'http://localhost:8080';

// // Create axios instance with default config
// const api = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add auth header interceptor
// api.interceptors.request.use((config) => {
//   const user = JSON.parse(localStorage.getItem('user'));
//   if (user?.email) {
//     config.headers.Authorization = `Bearer ${user.email}`;
//   }
//   return config;
// });

// const returnBook = async (issueId) => {
//     try {
//       const response = await api.post(`/admin/return-book/${issueId}`);
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   };
  
//   // Export the new method
//   export { returnBook };

// export default api;

import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

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
}, (error) => {
    return Promise.reject(error);
});

// Add response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Handle specific error cases
            switch (error.response.status) {
                case 401:
                    // Handle unauthorized
                    localStorage.removeItem('user');
                    // Redirect to login if needed
                    break;
                case 403:
                    // Handle forbidden
                    break;
                default:
                    // Handle other errors
                    break;
            }
        }
        return Promise.reject(error);
    }
);

// API methods
export const authAPI = {
    login: (credentials) => api.post('/login', credentials),
    register: (userData) => api.post('/create-user', userData),
};

export const bookAPI = {
    searchBooks: (params) => api.get('/reader/search-book', { params }),
    addBook: (bookData) => api.post('/admin/add-book', bookData),
    removeBook: (isbn) => api.delete(`/admin/remove-book/${isbn}`),
    updateBook: (isbn, bookData) => api.put(`/admin/update-book/${isbn}`, bookData),
};

export const requestAPI = {
    raiseRequest: (requestData) => api.post('/reader/raise-issue-request', requestData),
    listRequests: () => api.get('/admin/list-issue-requests'),
    approveRequest: (reqId) => api.post(`/admin/approve-request/${reqId}`),
    rejectRequest: (reqId) => api.post(`/admin/reject-request/${reqId}`),
    returnBook: (issueId) => api.post(`/admin/return-book/${issueId}`),
};

export default api;