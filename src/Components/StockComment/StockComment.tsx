import React, { useEffect, useState } from "react";
import StockCommentForm from "./StockCommentForm/StockCommentForm";
import { commentGetAPI, commentPostAPI } from "../../Services/CommentService";
import { toast } from "react-toastify";
import { CommentGet } from "../../Models/Comment";
import Spinner from "../Spinner/Spinner";
import StockCommentList from "../StockCommentList/StockCommentList";

type Props = {
  stockSymbol: string;
};

type CommentFormInputs = {
  title: string;
  content: string;
};

const StockComment = ({ stockSymbol }: Props) => {
  const [comments, setComments] = useState<CommentGet[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getComments();
  }, []);

  const handleComment = async (e: CommentFormInputs) => {
    try {
      const res = await commentPostAPI(e.title, e.content, stockSymbol);
      if (res) {
        toast.success("Comment created successfully");
        getComments();
      }
    } catch (error) {
      console.error("Error posting comment:", error);
      toast.error("Failed to post comment. Please try again.");
    }
  };

  const getComments = async () => {
    setLoading(true);
    try {
      const res = await commentGetAPI(stockSymbol);
      setComments(res?.data ?? []);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mx-4 my-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        User Comments
      </h2>
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <Spinner />
        </div>
      ) : (
        <StockCommentList comments={comments!} />
      )}
      <StockCommentForm handleComment={handleComment} />
    </div>
  );
};

export default StockComment;
