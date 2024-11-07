import React, { useState } from "react";
import CardPortfolio from "../CardPortfolio/CardPortfolio";
import { PortfolioGet } from "../../../Models/Portfolio";
import { FaBriefcase, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Grid2 as Grid, Tooltip, Button } from "@mui/material";
import ConnectionStatusFeedBack from "../../ConnectionStatusFeedBack/ConnectionStatusFeedBack";

interface Props {
  portfolioValues: PortfolioGet[];
  onPortfolioDelete: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ListPortfolio = ({ portfolioValues, onPortfolioDelete }: Props) => {
  const [isExpanded, setIsExpanded] = useState(true); // Expanded by default
  const [visibleCount, setVisibleCount] = useState(10); // Number of items to show

  const portfolioCount = portfolioValues.length;

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
    if (!isExpanded) setVisibleCount(10);
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  // Determine items to display based on visibleCount
  const displayedValues = isExpanded
    ? portfolioValues.slice(0, visibleCount)
    : [];

  // Calculate remaining items if not all are visible
  const remainingCount = portfolioCount - displayedValues.length;

  return (
    <section id="portfolio" className="w-full my-8">
      <div
        className="flex items-center justify-center mb-6 cursor-pointer"
        onClick={handleToggle}
      >
        <FaBriefcase className="text-3xl text-blue-600 dark:text-blue-400 mr-2" />
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 flex items-center">
          My Portfolio
          <Tooltip title={`${portfolioCount} stocks in portfolio`} arrow>
            <span className="ml-2 text-xl text-gray-600 dark:text-gray-300">
              ({portfolioCount})
            </span>
          </Tooltip>
          {portfolioCount > 0 && (
            <span className="ml-2 text-gray-600 dark:text-gray-300">
              {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          )}
        </h2>
      </div>
      <div className="max-w-[30rem] mx-auto">
        <ConnectionStatusFeedBack />
      </div>
      {portfolioCount > 0 && isExpanded ? (
        <>
          <Grid container spacing={3}>
            {displayedValues.map((portfolioValue, index) => (
              <Grid
                sx={{ xs: 12, sm: 6, md: 4 }}
                key={portfolioValue.id || index}
              >
                <CardPortfolio
                  portfolioValue={portfolioValue}
                  onPortfolioDelete={onPortfolioDelete}
                />
              </Grid>
            ))}
          </Grid>
          {remainingCount > 0 && (
            <div className="flex justify-center mt-4">
              <Button variant="contained" onClick={handleShowMore}>
                Show {remainingCount >= 10 ? 10 : remainingCount} more
              </Button>
            </div>
          )}
        </>
      ) : portfolioCount > 0 && !isExpanded ? null : (
        <h2 className="text-xl font-semibold text-center text-gray-600 dark:text-gray-300">
          Your portfolio is empty.
        </h2>
      )}
    </section>
  );
};

export default ListPortfolio;
