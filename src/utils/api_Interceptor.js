import axios from "axios";
import { toast } from "react-toastify";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

let isRefreshing = false;
let refreshSubscribers = [];

const onRefreshed = (callback) => {
  refreshSubscribers.push(callback);
};

const notifySubscribers = () => {
  refreshSubscribers.forEach((cb) => cb());
  refreshSubscribers = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          onRefreshed(() => resolve(api(originalRequest)));
        });
      }

      isRefreshing = true;

      try {
        console.log("🔁 Trying to refresh token");
        await axios.post(`${API_BASE_URL}/v1/users/refresh-token`, {}, {
        withCredentials: true,
        }); 
        notifySubscribers();
        return api(originalRequest);
      } catch (refreshError) {
        console.log("❌ Refresh token failed");
        // toast.error("Please Login"); 
        return Promise.reject(error); // Reject original error so catch() works
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
