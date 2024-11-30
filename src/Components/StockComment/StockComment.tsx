import { useEffect, useState, useCallback } from "react";
import StockCommentForm from "./StockCommentForm/StockCommentForm";
import {
  commentDeleteAPI,
  commentGetAPI,
  commentPostAPI,
} from "../../Services/CommentService";
import { toast } from "react-toastify";
import { CommentGet } from "../../Models/Comment";
import StockCommentList from "../StockCommentList/StockCommentList";
import ConnectionStatusFeedBack from "../ConnectionStatusFeedBack/ConnectionStatusFeedBack";
import { BarLoader } from "react-spinners";

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

  // Memoize getComments to prevent unnecessary re-creations
  const getComments = useCallback(async () => {
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
  }, [stockSymbol]);

  useEffect(() => {
    getComments();
  }, [getComments]);

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

  const handleDelete = async (commentId: number) => {
    try {
      const res = await commentDeleteAPI(commentId);
      if (res) {
        toast.success("Comment deleted successfully");
        // Refresh comments
        getComments();
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Failed to delete comment. Please try again.");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6  my-6">
      <div className="max-w-[30rem] mx-auto">
        <ConnectionStatusFeedBack />
      </div>
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        User Comments
      </h2>
      {loading ? (
        <div className="flex justify-center items-center h-3">
          <BarLoader />
        </div>
      ) : (
        <StockCommentList comments={comments!} handleDelete={handleDelete} />
      )}
      <StockCommentForm handleComment={handleComment} />
    </div>
  );
};

export default StockComment;
