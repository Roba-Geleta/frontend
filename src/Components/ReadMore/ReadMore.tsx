import React, { useState } from "react";

interface Props {
  text: string;
  maxCharacters?: number;
  className?: string;
}

const ReadMore = ({ text, maxCharacters = 200, className = "" }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded((prev) => !prev);
  };

  if (text.length <= maxCharacters) {
    return <p className={className}>{text}</p>;
  }

  return (
    <p className={className}>
      {isExpanded ? text : `${text.substring(0, maxCharacters)}... `}
      <button
        onClick={toggleReadMore}
        className="text-blue-600 hover:text-blue-800 focus:outline-none"
      >
        {isExpanded ? "Show less" : "Show more"}
      </button>
    </p>
  );
};

export default ReadMore;
