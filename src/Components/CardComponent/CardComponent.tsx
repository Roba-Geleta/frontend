import React from "react";
import { CompanySearch } from "../../company";
import AddPortfolio from "../Portfolio/AddPortfolio/AddPortfolio";
import { Link } from "react-router-dom";

interface Props {
  id: string;
  searchResult: CompanySearch;
  onPortfolioCreate: (e: React.FormEvent<HTMLFormElement>) => void;
}

const CardComponent: React.FC<Props> = ({
  id,
  searchResult,
  onPortfolioCreate,
}): JSX.Element => {
  return (
    <div
      className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
      key={id}
      id={id}
    >
      <div>
        <Link
          to={`/company/${searchResult.symbol}/company-profile`}
          className="text-base font-medium text-blue-600 dark:text-blue-400 hover:underline"
        >
          {searchResult.name} ({searchResult.symbol})
        </Link>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {searchResult.exchangeShortName} - {searchResult.stockExchange}
        </p>
      </div>
      <AddPortfolio
        onPortfolioCreate={onPortfolioCreate}
        symbol={searchResult.symbol}
      />
    </div>
  );
};

export default CardComponent;
