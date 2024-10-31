import React, { useEffect } from "react";
import CardComponent from "../CardComponent/CardComponent";
import { CompanySearch } from "../../company";
import { CircularProgress, Tooltip } from "@mui/material";

interface Props {
  searchResults: CompanySearch[];
  onPortfolioCreate: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
}

const CardList: React.FC<Props> = ({
  searchResults,
  onPortfolioCreate,
  loading,
}): JSX.Element => {
  const resultCount = searchResults.length;

  useEffect(() => {
    console.log("loading", loading);
  }, [loading]);

  return (
    <section id="search-results" className="w-full my-8">
      <div className="flex items-center justify-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 flex items-center">
          Results
          <Tooltip title={`${resultCount} results found`} arrow>
            <span className="ml-2 text-xl text-gray-600 dark:text-gray-300">
              ({resultCount})
            </span>
          </Tooltip>
        </h2>
      </div>
      {loading ? (
        <div className="flex items-center justify-center ">
          <CircularProgress size={"5rem"} />
        </div>
      ) : resultCount > 0 ? (
        <div className="space-y-2">
          {searchResults.map((result) => {
            return (
              <CardComponent
                id={result.symbol}
                key={result.symbol}
                searchResult={result}
                onPortfolioCreate={onPortfolioCreate}
              />
            );
          })}
        </div>
      ) : (
        <p className="text-xl font-semibold text-center text-gray-600 dark:text-gray-300">
          No results!
        </p>
      )}
    </section>
  );
};

export default CardList;
