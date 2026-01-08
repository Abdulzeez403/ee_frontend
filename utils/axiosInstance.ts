// src/utils/axiosInstance.ts
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = `${process.env.NEXT_PUBLIC_AUTH}/api`;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // ✅ allow cookies (refresh token lives in cookie)
});

// Request interceptor → attach access token
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("tokens");
      const accessToken = stored ? JSON.parse(stored).accessToken : null;
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor → refresh flow
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Global error toast
    if (error.response && error.response.data?.message) {
      toast.error(error.response.data.message, { autoClose: 3000 });
    }

    // Handle expired access token → refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await axiosInstance.post("/auth/refresh");

        localStorage.setItem(
          "tokens",
          JSON.stringify({ accessToken: data.accessToken })
        );

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("tokens");
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
