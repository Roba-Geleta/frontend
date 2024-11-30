import { useState } from "react";
import { CommentGet } from "../../Models/Comment";

import { FaEllipsisV } from "react-icons/fa";
import { useAuth } from "../../Context/userAuth";

type Props = {
  comment: CommentGet;
  handleDelete: (commentId: number) => void;
};

const StockCommentListItem = ({ comment, handleDelete }: Props) => {
  const { user } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  // Check if the current user is the author of the comment
  const isAuthor = user?.userName === comment.createdBy;

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const confirmDelete = () => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      handleDelete(comment.id);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-700 shadow rounded-lg p-4 relative">
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

      {/* Triple-dot dropdown menu */}
      {isAuthor && (
        <div className="absolute top-2 right-2">
          <button
            onClick={toggleMenu}
            className="text-gray-600 dark:text-gray-300 focus:outline-none"
          >
            <FaEllipsisV />
          </button>
          {showMenu && (
            <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border rounded shadow-lg z-10">
              <button
                onClick={confirmDelete}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StockCommentListItem;
