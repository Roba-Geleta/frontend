import React from "react";

interface Props {
  onPortfolioDelete: (e: React.FormEvent<HTMLFormElement>) => void;
  portfolioValue: string;
}

const DeletePortfolio = ({ onPortfolioDelete, portfolioValue }: Props) => {
  return (
    <form onSubmit={onPortfolioDelete}>
      <input
        name="portfolioValue"
        type="hidden"
        readOnly
        value={portfolioValue}
      />
      <button
        type="submit"
        className="px-2 py-1 text-white bg-red-500 rounded-tl-md rounded-br-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 dark:bg-red-600 dark:hover:bg-red-700"
      >
        X
      </button>
    </form>
  );
};

export default DeletePortfolio;
