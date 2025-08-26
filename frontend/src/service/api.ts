import axios from "axios";
import { useAuthStore } from "@/stores/auth";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
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
