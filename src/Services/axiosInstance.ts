import axios from "axios";
import {
  getIsDatabaseResuming,
  setHasDatabaseRetriesExceeded,
  setIsDatabaseResuming,
} from "./databaseStatusManager";
import {
  getIsBackendReachable,
  setHasNetworkErrorRetriesExceeded,
  setIsBackendReachable,
} from "./networkStatusManager";
import { handleError } from "../Helpers/ErrorHandler";

const APP_AZURE_BASE_URL = import.meta.env.VITE_APP_AZURE_BASE_URL;

const axiosInstance = axios.create({
  baseURL: APP_AZURE_BASE_URL,
  withCredentials: true, // Enables sending cookies with requests
});

// Variables to track retries and messages
const MAX_NETWORK_RETRIES = 5;
const MAX_503_RETRIES = 5;

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Reset message flag on successful response
    if (getIsDatabaseResuming()) {
      setIsDatabaseResuming(false);
    }
    if (!getIsBackendReachable()) {
      setIsBackendReachable(true);
    }
    return response;
  },
  async (error) => {
    console.log("False Error");
    const originalRequest = error.config;

    // Check if error.response is undefined, which indicates a network error
    console.log("Error Response", error);
    if (!error.response) {
      originalRequest._retryCount = originalRequest._retryCount || 0;

      if (originalRequest._retryCount < MAX_NETWORK_RETRIES) {
        // Increment retry count
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

    // Inside the interceptor
    if (error.response.status === 503) {
      // Initialize retry count if not set
      originalRequest._retryCount = originalRequest._retryCount || 0;

      if (originalRequest._retryCount < MAX_503_RETRIES) {
        // Increment retry count
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
    }

    // Pass other errors to the existing error handler
    return Promise.reject(error);
  }
);

export default axiosInstance;
