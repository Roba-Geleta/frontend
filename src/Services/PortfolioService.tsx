import axiosInstance from "./axiosInstance";
import { handleError } from "../Helpers/ErrorHandler";
import { PortfolioGet, PortfolioPost } from "../Models/Portfolio";

const api = "portfolio/";

export const portfolioAddAPI = async (symbol: string) => {
  try {
    const response = await axiosInstance.post<PortfolioPost>(
      `${api}?symbol=${symbol}`
    );
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const portfolioDeleteAPI = async (symbol: string) => {
  try {
    const response = await axiosInstance.delete<PortfolioPost>(
      `${api}?symbol=${symbol}`
    );
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const portfolioGetAPI = async () => {
  try {
    const response = await axiosInstance.get<PortfolioGet[]>(api);
    console.log(response);
    return response;
  } catch (error) {
    handleError(error);
  }
};
