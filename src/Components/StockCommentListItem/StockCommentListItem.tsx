import { CommentGet } from "../../Models/Comment";

type Props = {
  comment: CommentGet;
};

const StockCommentListItem = ({ comment }: Props) => {
  return (
    <div className="bg-white dark:bg-gray-700 shadow rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {comment.title}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            @{comment.createdBy}
          </p>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {new Date(comment.createdOn).toLocaleDateString()}
        </p>
      </div>
      <p className="mt-2 text-gray-700 dark:text-gray-200">{comment.content}</p>
    </div>
  );
};

export default StockCommentListItem;
