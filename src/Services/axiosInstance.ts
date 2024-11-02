import axios from "axios";

const APP_AZURE_BASE_URL = import.meta.env.VITE_APP_AZURE_BASE_URL;

const axiosInstance = axios.create({
  baseURL: APP_AZURE_BASE_URL,
  withCredentials: true, // Enables sending cookies with requests
});

// // Optional: Add interceptors for global error handling
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       // Handle unauthorized access globally (e.g., redirect to login)
//       //   window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
