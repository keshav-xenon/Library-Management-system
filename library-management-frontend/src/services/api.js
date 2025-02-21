import axios from "axios";

const API_BASE_URL = "http://localhost:8080"; // Backend base URL

// Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add Authorization header to every request
api.interceptors.request.use((config) => {
  const email = localStorage.getItem("userEmail"); // Retrieve email from localStorage
  if (email) {
    config.headers.Authorization = `Bearer ${email}`;
  }
  return config;
});

// Add a new book
export const addBook = async (bookData) => {
  try {
    const response = await api.post("/admin/add-book", bookData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Remove a book
export const removeBook = async (isbn) => {
  try {
    const response = await api.delete(`/admin/remove-book/${isbn}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Export the default Axios instance
export default api;