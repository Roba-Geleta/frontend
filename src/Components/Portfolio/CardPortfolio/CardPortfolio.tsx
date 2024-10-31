import React from "react";
import DeletePortfolio from "../DeletePortfolio/DeletePortfolio";
import { Link } from "react-router-dom";
import { PortfolioGet } from "../../../Models/Portfolio";

interface Props {
  portfolioValue: PortfolioGet;
  onPortfolioDelete: (e: React.FormEvent<HTMLFormElement>) => void;
}

const CardPortfolio = ({ portfolioValue, onPortfolioDelete }: Props) => {
  return (
    <div
      className="relative flex flex-col p-4 bg-white rounded-lg shadow-md dark:bg-gray-800 transition-transform transform hover:scale-105 group"
      style={{ minHeight: "150px", width: "200px" }}
    >
      <div className="flex-grow">
        <Link
          to={`/company/${portfolioValue.symbol}/company-profile`}
          className="text-xl font-bold text-blue-600 dark:text-blue-400 hover:underline"
        >
          {portfolioValue.symbol}
        </Link>
        <p className="text-xs text-gray-700 dark:text-gray-500 mt-1 break-words">
          {portfolioValue.companyName}
        </p>
        <p className="text-sm text-gray-900 dark:text-gray-100 mt-1 ">
          Purchased at: ${portfolioValue.purchase}
        </p>

        {/* Remove button, shown only on hover */}
        <div className="absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <DeletePortfolio
            portfolioValue={portfolioValue.symbol}
            onPortfolioDelete={onPortfolioDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default CardPortfolio;
