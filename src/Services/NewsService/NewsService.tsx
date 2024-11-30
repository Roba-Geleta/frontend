import axiosInstance from "../axiosInstance";
import { handleError } from "../../Helpers/ErrorHandler";
import { NewsArticlesGet } from "../../Models/NewsArticle";

const api = "news/";

export const NewsGetAPI = async () => {
  try {
    const response = await axiosInstance.get<NewsArticlesGet[]>(api);
    console.log(response);
    return response;
  } catch (error) {
    handleError(error);
  }
};
