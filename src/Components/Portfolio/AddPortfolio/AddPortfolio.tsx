import React from "react";

interface Props {
  onPortfolioCreate: (e: React.FormEvent<HTMLFormElement>) => void;
  symbol: string;
}

const AddPortfolio = ({ onPortfolioCreate, symbol }: Props) => {
  return (
    <form onSubmit={onPortfolioCreate}>
      <input name="symbol" readOnly hidden value={symbol} />
      <button
        type="submit"
        className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-green-700 dark:hover:bg-green-800"
      >
        Add
      </button>
    </form>
  );
};

export default AddPortfolio;
