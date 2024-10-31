import React, { createContext } from "react";
import { UserProfile } from "../Models/User";
import { useNavigate } from "react-router-dom";
import { loginAPI, registerAPI, verifyTokenAPI } from "../Services/AuthService";
import { toast } from "react-toastify";
import axios from "axios";

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (email: string, username: string, password: string) => void;
  loginUser: (username: string, password: string) => void;
  logoutUser: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = React.useState<string | null>(null);
  const [user, setUser] = React.useState<UserProfile | null>(null);
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken && !isReady) {
      const userObj = JSON.parse(storedUser);
      verifyTokenAPI(userObj.UserName, storedToken)
        .then(() => {
          setUser(userObj);
          setToken(storedToken);
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${storedToken}`;
        })
        .catch((error) => {
          console.error("Token verification failed", error);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        })
        .finally(() => {
          setIsReady(true);
        });
    } else {
      setIsReady(true);
    }
  }, []);

  const registerUser = async (
    email: string,
    username: string,
    password: string
  ) => {
    await registerAPI(email, username, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res?.data.token);
          const userObj = {
            userName: res?.data.userName,
            email: res?.data.email,
          };
          localStorage.setItem("user", JSON.stringify(userObj));

          setUser(userObj);
          setToken(res?.data.token);

          toast.success("User registered successfully");
        }
      })
      .catch((e) => toast.warning("Server error occurred"));
  };

  const loginUser = async (username: string, password: string) => {
    await loginAPI(username, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res?.data.token);
          const userObj = {
            userName: res?.data.userName,
            email: res?.data.email,
          };
          localStorage.setItem("user", JSON.stringify(userObj));

          setUser(userObj);
          setToken(res?.data.token);

          toast.success("Login successful");
        }
      })
      .catch((e) => toast.warning("Server error occurred"));
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logoutUser = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    navigate("/");
  };

  return (
    <UserContext.Provider
      value={{ user, token, registerUser, loginUser, logoutUser, isLoggedIn }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);
