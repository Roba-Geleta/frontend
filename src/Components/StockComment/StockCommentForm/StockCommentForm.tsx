import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

type Props = {
  handleComment: (e: CommentFormInputs) => void;
};

type CommentFormInputs = {
  title: string;
  content: string;
};

const validation = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
});

const StockCommentForm = ({ handleComment }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CommentFormInputs>({
    resolver: yupResolver(validation),
  });

  const onSubmit = async (data: CommentFormInputs) => {
    await handleComment(data);
    reset();
  };

  return (
    <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-2">
        Add a Comment
      </h3>
      <div className="mb-4">
        <input
          type="text"
          id="title"
          className={`w-full p-3 rounded-md border ${
            errors.title
              ? "border-red-500"
              : "border-gray-300 dark:border-gray-600"
          } bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder="Title"
          {...register("title")}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>
      <div className="mb-4">
        <textarea
          id="content"
          rows={4}
          className={`w-full p-3 rounded-md border ${
            errors.content
              ? "border-red-500"
              : "border-gray-300 dark:border-gray-600"
          } bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder="Write your comment..."
          {...register("content")}
        ></textarea>
        {errors.content && (
          <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
        )}
      </div>
      <button
        type="submit"
        className={`w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Posting..." : "Post Comment"}
      </button>
    </form>
  );
};

export default StockCommentForm;
