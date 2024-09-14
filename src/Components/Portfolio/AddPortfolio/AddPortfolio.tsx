import React from "react";

interface Props {
  onPortfolioCreate: (e: React.FormEvent<HTMLFormElement>) => void;
  symbol: string;
}

const AddPortfolio = ({ onPortfolioCreate, symbol }: Props) => {
  return (
    <form onSubmit={onPortfolioCreate}>
      <input name="symbol" readOnly hidden value={symbol} />
      <button type="submit">Add to Portfolio</button>
    </form>
  );
};

export default AddPortfolio;
