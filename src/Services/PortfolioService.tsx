import axiosInstance from "./axiosInstance";
import { handleError } from "../Helpers/ErrorHandler";
import {
  PortfolioGet,
  PortfolioPost,
  PortfolioDelete,
  PortfolioPut,
} from "../Models/Portfolio";
import { CompanySearch } from "../company";

const api = "portfolio/";

export const portfolioAddAPI = async (symbol: string) => {
  try {
    const response = await axiosInstance.post<PortfolioPost>(
      `${api}?symbol=${symbol}`
    );
    return response;
  } catch (error) {
    console.log("Error", error);
    handleError(error);
  }
};

export const portfolioUpdateAPI = async (
  symbol: string,
  favourite?: boolean,
  purchasePrice?: number
): Promise<PortfolioPut | undefined> => {
  try {
    const payload: PortfolioPut = { symbol };

    if (favourite !== undefined) {
      payload.favourite = favourite;
    }

    if (purchasePrice !== undefined) {
      payload.purchasePrice = purchasePrice;
    }

    const response = await axiosInstance.put<PortfolioPut>(
      `${api}update`,
      payload
    );
    return response.data;
  } catch (error) {
    console.log("Error updating portfolio:", error);
    handleError(error);
  }
};

export const portfolioDeleteAPI = async (symbol: string) => {
  try {
    const response = await axiosInstance.delete<PortfolioDelete>(
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

export const searchCompanies = async (query: string) => {
  try {
    const response = await axiosInstance.get<CompanySearch[]>("stock/search", {
      params: { query },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    handleError(error);
    return [];
  }
};
