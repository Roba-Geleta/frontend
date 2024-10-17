import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { UserProfileToken } from "../Models/User";
import { Token } from "../Models/Token";

const api = "http://localhost:5121/api/";

export const loginAPI = async (username: string, password: string) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "account/login", {
      username: username,
      password: password,
    });

    return data;
  } catch (error) {
    handleError(error);
  }
};

export const registerAPI = async (
  email: string,
  username: string,
  password: string
) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "account/register", {
      email: email,
      username: username,
      password: password,
    });

    return data;
  } catch (error) {
    handleError(error);
  }
};

export const verifyTokenAPI = async (username: string, token: string) => {
  try {
    const data = await axios.post<Token>(api + "account/verify-token", {
      userName: username,
      token: token,
    });

    return data;
  } catch (error) {
    handleError(error);
  }
};
