import api from './api';

export const login = async (email, role) => {
  // Simulate login - store user info in localStorage
  const user = { email, role };
  localStorage.setItem('user', JSON.stringify(user));
  return user;
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};