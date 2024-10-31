import { CommentGet } from "../../Models/Comment";
import StockCommentListItem from "../StockCommentListItem/StockCommentListItem";

type Props = {
  comments: CommentGet[];
};

const StockCommentList = ({ comments }: Props) => {
  return (
    <div className="space-y-4">
      {comments.length > 0 ? (
        comments.map((comment, index) => {
          // Create a composite key using id, title, or another unique identifier
          const key = `${comment.createdBy}-${index}`;
          return <StockCommentListItem comment={comment} key={key} />;
        })
      ) : (
        <p className="text-gray-600 dark:text-gray-300">
          No comments available.
        </p>
      )}
    </div>
  );
};

export default StockCommentList;
