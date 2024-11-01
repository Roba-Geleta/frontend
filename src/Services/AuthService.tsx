import axiosInstance from "./axiosInstance";
import { handleError } from "../Helpers/ErrorHandler";
import { UserProfile } from "../Models/User";

// Define response types based on backend responses
export type AuthResponse = {
  message: string;
  user: UserProfile;
};

// Login API
export const loginAPI = async (
  username: string,
  password: string
): Promise<AuthResponse | undefined> => {
  try {
    const response = await axiosInstance.post<AuthResponse>("/account/login", {
      userName: username,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    handleError(error);
  }
};

// Register API
export const registerAPI = async (
  email: string,
  username: string,
  password: string
): Promise<AuthResponse | undefined> => {
  try {
    const response = await axiosInstance.post<AuthResponse>(
      "account/register",
      {
        email: email,
        userName: username,
        password: password,
      }
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Verify Token API
export const verifyTokenAPI = async (): Promise<AuthResponse | undefined> => {
  try {
    const response = await axiosInstance.post<AuthResponse>(
      "account/verify-token"
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Logout API
export const logoutAPI = async (): Promise<{ message: string } | undefined> => {
  try {
    const response = await axiosInstance.post<{ message: string }>(
      "account/logout"
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
