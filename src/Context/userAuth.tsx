import React, { createContext, useEffect, useState } from "react";
import {
  loginAPI,
  registerAPI,
  verifyTokenAPI,
  logoutAPI,
} from "../Services/AuthService";
import { toast } from "react-toastify";
import { UserProfile } from "../Models/User";
import Spinner from "../Components/Spinner/Spinner";

type UserContextType = {
  user: UserProfile | null;
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
  registerUser: async () => false,
  loginUser: async () => false,
  logoutUser: async () => {},
  isLoggedIn: false,
});

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        const res = await verifyTokenAPI();
        if (res && res.user) {
          setUser(res.user);
        }
      } catch (error) {
        console.error("Token verification failed", error);
        setUser(null);
      } finally {
        setIsReady(true);
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

  const isLoggedIn = !!user;

  return (
    <UserContext.Provider
      value={{ user, registerUser, loginUser, logoutUser, isLoggedIn }}
    >
      {isReady ? (
        children
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner />
        </div>
      )}{" "}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => React.useContext(UserContext);
