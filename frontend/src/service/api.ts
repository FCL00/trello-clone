import axios from "axios";
import { useAuthStore } from "@/stores/auth";

const BASE_URL = import.meta.env.VITE_BASE_URL

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // always send cookies
});

// Attach access token automatically
api.interceptors.request.use((config) => {
  const auth = useAuthStore();
  if (auth.accessToken) {
    config.headers.Authorization = `Bearer ${auth.accessToken}`;
  }
  return config;
});

export default api;
