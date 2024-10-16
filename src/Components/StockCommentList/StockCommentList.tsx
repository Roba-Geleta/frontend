import React from "react";
import { CommentGet } from "../../Models/Comment";
import StockCommentListItem from "../StockCommentListItem/StockCommentListItem";

type Props = {
  comments: CommentGet[];
};

const StockCommentList = ({ comments }: Props) => {
  return (
    <>
      {comments ? (
        comments.map((comment, index) => {
          // Create a composite key using title, createdBy, and index
          const key = `${comment.title}-${comment.createdBy}-${index}`;
          return <StockCommentListItem comment={comment} key={key} />;
        })
      ) : (
        <p>No comments available.</p>
      )}
    </>
  );
};

export default StockCommentList;
