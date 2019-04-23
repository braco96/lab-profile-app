// Service module wrapping all HTTP requests related to authentication

import axios from 'axios';

// Create an axios instance with the base URL of the server
const api = axios.create({
  baseURL: 'http://localhost:5005'
});

const signUp = (user) => api.post('/auth/signup', user);
const logIn = (credentials) => api.post('/auth/login', credentials);
// Helper function to get stored JWT token
const getToken = () => localStorage.getItem('authToken');

const verifyToken = (token) =>
  api.get('/auth/verify', { headers: { Authorization: `Bearer ${token}` } });

// Authenticated requests include the token in the headers
const uploadPhoto = (file) =>
  api.post('/api/upload', file, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
const getCurrentUser = () =>
  api.get('/api/users', { headers: { Authorization: `Bearer ${getToken()}` } });
const editUser = (user) =>
  api.put('/api/users', user, { headers: { Authorization: `Bearer ${getToken()}` } });

export default {
  signUp,
  logIn,
  verifyToken,
  uploadPhoto,
  getCurrentUser,
  editUser
};
