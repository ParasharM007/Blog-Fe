import axios from "axios";
const axios_Interceptor=()=>{
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    let isRefreshing = false;
let refreshSubscribers = [];

const onRefreshed = (callback) => {
  refreshSubscribers.push(callback);
};

const notifySubscribers = () => {
  refreshSubscribers.forEach((cb) => cb());
  refreshSubscribers = [];
};

// Response Interceptor
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If accessToken expired (401) and not retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        // Wait for token refresh to complete
        return new Promise((resolve) => {
          onRefreshed(() => resolve(axios(originalRequest)));
        });
      }

      isRefreshing = true;

      try {
        // Attempt to refresh the token
        // await axios.post(`${API_BASE_URL}/v1/users/refresh-token`,{},
        await axios.post(`${API_BASE_URL}/v1/users/refresh-token`,{},
        {
          withCredentials: true,
        });

        notifySubscribers(); // Retry all queued requests
        return axios(originalRequest); // Retry the original failed request
      } catch (refreshError) {
        return Promise.reject(refreshError); // Refresh failed
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error); // Not a token issue
  }
);


    
    

}
export { axios_Interceptor }