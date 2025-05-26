import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// Interceptor to add the token to the request headers
api.interceptors.request.use((config) => {
  // Get token from local storage
  const token = localStorage.getItem("UPTASK_TOKEN");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
