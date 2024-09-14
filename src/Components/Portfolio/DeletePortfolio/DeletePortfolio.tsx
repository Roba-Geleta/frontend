import React from "react";

interface Props {
  onPortfolioDelete: (e: React.FormEvent<HTMLFormElement>) => void;
  portfolioValue: string;
}

const DeletePortfolio = ({ onPortfolioDelete, portfolioValue }: Props) => {
  return (
    <div>
      <form onSubmit={onPortfolioDelete}>
        <input
          name="portfolioValue"
          type="hidden"
          readOnly
          value={portfolioValue}
        />
        <button type="submit">X</button>
      </form>
    </div>
  );
};

export default DeletePortfolio;
