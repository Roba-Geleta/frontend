import axios from "axios";
import {
  CompanyBalanceSheet,
  CompanyCashFlow,
  CompanyIncomeStatement,
  CompanyKeyMetrics,
  CompanyProfile,
  CompanySearch,
  CompanyTenK,
} from "./company";
import { LocationGet } from "./Models/Location";

interface SentimentResult {
  score: number;
  confidence: number;
}

interface SearchResponse {
  data: CompanySearch[];
}

export interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

const FUNCTION_BASE_URL = import.meta.env.VITE_APP_FUNCTION_BASE_URL;
const SENTIMENTDEMO_FUNCTION_BASE_URL = import.meta.env
  .VITE_APP_SENTIMENTDEMO_FUNCTION_BASE_URL;

export const checkSentiment = async (
  text: string
): Promise<SentimentResult> => {
  if (!text.trim()) throw new Error("Text cannot be empty");

  try {
    const { data } = await axios.post<SentimentResult>(
      `${SENTIMENTDEMO_FUNCTION_BASE_URL}`,
      { review: text },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 403) {
        throw new Error(
          "Access denied. Please ensure you're calling from an allowed domain."
        );
      }
      console.error("Error fetching sentiment:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

export const searchCompanies = async (query: string) => {
  try {
    const { data } = await axios.get<SearchResponse>(
      `${FUNCTION_BASE_URL}/searchCompanies`,
      {
        params: { query },
      }
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error searching companies:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

export const getCompanyProfile = async (query: string) => {
  console.log(FUNCTION_BASE_URL);
  try {
    const { data } = await axios.get<CompanyProfile[]>(
      `${FUNCTION_BASE_URL}/getCompanyProfile`,
      {
        params: { query },
      }
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching company profile:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

export const getKeyMetrics = async (query: string) => {
  try {
    const { data } = await axios.get<CompanyKeyMetrics[]>(
      `${FUNCTION_BASE_URL}/getKeyMetrics`,
      {
        params: { query },
      }
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching key metrics:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

export const getIncomeStatement = async (query: string) => {
  try {
    const { data } = await axios.get<CompanyIncomeStatement[]>(
      `${FUNCTION_BASE_URL}/getIncomeStatement`,
      {
        params: { query },
      }
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching income statement:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

export const getBalanceSheet = async (query: string) => {
  try {
    const { data } = await axios.get<CompanyBalanceSheet[]>(
      `${FUNCTION_BASE_URL}/getBalanceSheet`,
      {
        params: { query },
      }
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching balance sheet:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

export const getCashflowStatement = async (query: string) => {
  try {
    const { data } = await axios.get<CompanyCashFlow[]>(
      `${FUNCTION_BASE_URL}/getCashflowStatement`,
      {
        params: { query },
      }
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching cashflow statement:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

export const getTenK = async (query: string) => {
  try {
    const { data } = await axios.get<CompanyTenK[]>(
      `${FUNCTION_BASE_URL}/getTenK`,
      {
        params: { query },
      }
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching Ten-K filings:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

export const getIPInfo = async (ip: string) => {
  try {
    const { data } = await axios.get<LocationGet>(
      `${FUNCTION_BASE_URL}/getIPInfo`,
      {
        params: { ip },
      }
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching IP info:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

// Function to send contact form data
export const sendContactForm = async (
  values: ContactFormValues
): Promise<{ message: string }> => {
  try {
    const { data } = await axios.post<{ message: string }>(
      `${FUNCTION_BASE_URL}/contact`,
      values,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error sending contact form:", error.message);
      // You can customize the error handling as needed
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};
