import axiosInstance from "./axiosInstance";
import { CommentGet, CommentPost } from "../Models/Comment";
import { handleError } from "../Helpers/ErrorHandler";

// Use relative path since baseURL is set
const api = "comment/";

export const commentPostAPI = async (
  title: string,
  content: string,
  symbol: string
) => {
  try {
    const response = await axiosInstance.post<CommentPost>(`${api}${symbol}`, {
      title: title,
      content: content,
    });
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const commentGetAPI = async (symbol: string) => {
  try {
    const response = await axiosInstance.get<CommentGet[]>(
      `${api}?Symbol=${symbol}`
    );
    console.log(response);
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const commentDeleteAPI = async (commentId: number) => {
  try {
    const response = await axiosInstance.delete(`${api}${commentId}`);
    return response;
  } catch (error) {
    handleError(error);
  }
};
