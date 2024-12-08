import axios from "axios";
import {
  getHasDatabaseRetriesExceeded,
  getIsDatabaseResuming,
  setHasDatabaseRetriesExceeded,
  setIsDatabaseResuming,
} from "./databaseStatusManager";
import {
  getHasNetworkErrorRetriesExceeded,
  getIsBackendReachable,
  setHasNetworkErrorRetriesExceeded,
  setIsBackendReachable,
} from "./networkStatusManager";
import { handleError } from "../Helpers/ErrorHandler";

const APP_BACKEND_BASE_URL = import.meta.env.VITE_APP_BACKEND_BASE_URL;

const axiosInstance = axios.create({
  baseURL: APP_BACKEND_BASE_URL,
  withCredentials: true, // Enables sending cookies with requests
});

// Variables to track retries and messages
const MAX_NETWORK_RETRIES = 5;
const MAX_503_RETRIES = 5;

const resetNetworkAndDatabaseFlags = () => {
  if (!getIsBackendReachable()) {
    setIsBackendReachable(true);
  }
  if (getIsDatabaseResuming()) {
    setIsDatabaseResuming(false);
  }
  if (getHasNetworkErrorRetriesExceeded()) {
    setHasNetworkErrorRetriesExceeded(false);
  }
  if (getHasDatabaseRetriesExceeded()) {
    setHasDatabaseRetriesExceeded(false);
  }
};

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Reset message flag on successful response
    resetNetworkAndDatabaseFlags();
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if error.response is defined, indicating that we received a response from the server
    if (error.response) {
      // Reset flags because the backend is reachable
      resetNetworkAndDatabaseFlags();
      const statusCode = error.response.status;

      const errorMessage = error.response.data?.message || "";

      if (
        statusCode === 503 ||
        (statusCode === 403 && errorMessage.includes("Site Disabled"))
      ) {
        // Handle 503 Service Unavailable errors
        originalRequest._retryCount = originalRequest._retryCount || 0;

        if (originalRequest._retryCount < MAX_503_RETRIES) {
          originalRequest._retryCount += 1;
          handleError(error);

          // Wait for a delay before retrying
          const retryDelay = 5000;
          await new Promise((resolve) => setTimeout(resolve, retryDelay));

          // Retry the request
          return axiosInstance(originalRequest);
        } else {
          // Max retries reached
          console.error("503 Error: Max retries reached.");
          setIsDatabaseResuming(false);
          setHasDatabaseRetriesExceeded(true);

          return Promise.reject(error);
        }
      } else {
        // For other HTTP errors (e.g., 401, 404), pass the error to the existing error handler
        return Promise.reject(error);
      }
    } else {
      // Network error (error.response is undefined)
      originalRequest._retryCount = originalRequest._retryCount || 0;

      if (originalRequest._retryCount < MAX_NETWORK_RETRIES) {
        originalRequest._retryCount += 1;
        handleError(error);
        setIsBackendReachable(false);

        const retryDelay = 5000;
        await new Promise((resolve) => setTimeout(resolve, retryDelay));

        // Retry the request
        return axiosInstance(originalRequest);
      } else {
        // Max retries reached
        console.error("Network Error: Max retries reached.");
        setIsBackendReachable(false);
        setHasNetworkErrorRetriesExceeded(true);

        return Promise.reject(error);
      }
    }
  }
);

export default axiosInstance;
