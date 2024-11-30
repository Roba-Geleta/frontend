import React, { createContext, useEffect, useState } from "react";
import {
  loginAPI,
  registerAPI,
  verifyTokenAPI,
  logoutAPI,
} from "../Services/AuthService";
import { toast } from "react-toastify";
import { UserProfile } from "../Models/User";

type UserContextType = {
  user: UserProfile | null | undefined;
  authLoading: boolean;
  registerUser: (
    email: string,
    username: string,
    password: string
  ) => Promise<boolean>;
  loginUser: (username: string, password: string) => Promise<boolean>;
  logoutUser: () => Promise<void>;
  isLoggedIn: boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({
  user: null,
  authLoading: true,
  registerUser: async () => false,
  loginUser: async () => false,
  logoutUser: async () => {},
  isLoggedIn: false,
});

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserProfile | null | undefined>(undefined);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        const res = await verifyTokenAPI();
        if (res && res.user) {
          setUser(res.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Token verification failed", error);
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    };

    initializeUser();
  }, []);

  const registerUser = async (
    email: string,
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      const res = await registerAPI(email, username, password);
      if (res && res.user) {
        setUser(res.user);
        toast.success("User registered successfully");
        return true;
      }
      return false;
    } catch {
      toast.warning("Server error occurred during registration");
      return false;
    }
  };

  const loginUser = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      const res = await loginAPI(username, password);
      if (res && res.user) {
        setUser(res.user);
        toast.success("Login successful");
        return true;
      }
      return false;
    } catch {
      toast.warning("Invalid credentials or server error");
      return false;
    }
  };

  const logoutUser = async () => {
    try {
      await logoutAPI();
      setUser(null);
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Logout failed");
    }
  };

  const [isLoggedIn, setIsLoggedIn] = useState(!!user);

  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        authLoading,
        registerUser,
        loginUser,
        logoutUser,
        isLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => React.useContext(UserContext);
