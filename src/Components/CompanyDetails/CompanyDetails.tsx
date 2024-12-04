import React from "react";
import {
  FaExchangeAlt,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaGlobe,
  FaBuilding,
  FaIndustry,
  FaUser,
  FaFlag, // Added for Country icon
} from "react-icons/fa";
import { Typography } from "@mui/material";
import PortfolioMenu from "../PortfolioMenu/PortfolioMenu";
import FIPLogoIconDark from "../../assets/FIPLogoIconDark.svg";
import usePageMeta from "../../hooks/usePageMeta/usePageMeta";
import { CompanyProfile } from "../../company";

interface CompanyDetailsProps {
  company: CompanyProfile;
  isInPortfolio: boolean;
  isFavourite: boolean;
  handleFavourite: (fav: boolean) => void;
  onPortfolioCreate: (ticker: string) => void;
  handleDelete: () => void;
  ticker?: string;
}

const formatDecimal = (num: number) => {
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const CompanyDetails: React.FC<CompanyDetailsProps> = ({
  company,
  isInPortfolio,
  isFavourite,
  handleFavourite,
  onPortfolioCreate,
  handleDelete,
  ticker,
}) => {
  const companyImage = company.defaultImage ? FIPLogoIconDark : company.image;
  usePageMeta({
    title: "FIP - " + company.symbol,
  });

  // Calculate percentage change
  const percentageChange =
    company.price !== 0
      ? ((company.changes / company.price) * 100).toFixed(2)
      : "0.00";

  // Determine color based on change
  const isPositive = company.changes >= 0;
  const changeColor = isPositive ? "text-green-500" : "text-red-500";
  const changeSign = isPositive ? "+" : "";

  return (
    <div className="w-full mx-auto p-2 bg-white dark:bg-gray-800 rounded-t-lg shadow flex flex-col">
      {/* Top Section: Image and Main Info */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start">
        {/* Company Image with PortfolioMenu */}
        <div className="relative mb-4 sm:mb-0 sm:mr-4 outline outline-2 bg-slate-100 rounded-md">
          <img
            src={companyImage}
            alt={`${company.companyName} Logo`}
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              (e.target as HTMLImageElement).onerror = null;
              (e.target as HTMLImageElement).src = FIPLogoIconDark;
            }}
            className="w-20 h-20 object-contain"
          />
          {/* PortfolioMenu positioned at bottom-right of Image */}
          <div className="absolute bottom-0 right-0">
            <PortfolioMenu
              isInPortfolio={isInPortfolio}
              isFavourite={isFavourite}
              handleFavourite={handleFavourite}
              onPortfolioCreate={onPortfolioCreate}
              handleDelete={handleDelete}
              ticker={ticker}
            />
          </div>
        </div>
        {/* Exchange Shortname • Symbol and Price Info */}
        <div className="flex flex-col items-center sm:items-start">
          {/* Exchange Shortname • Symbol */}
          <Typography
            variant="subtitle1"
            className="text-gray-600 dark:text-gray-300 mb-1 text-center sm:text-left"
          >
            {company.exchangeShortName} • {company.symbol}
          </Typography>

          {/* Change, Percentage, Price, Currency in One Line */}
          <div className="flex items-center space-x-2">
            <Typography
              variant="body2"
              className={`${changeColor} font-medium text-sm`}
            >
              {changeSign}
              {formatDecimal(company.changes)} ({changeSign}
              {percentageChange}%)
            </Typography>
            <Typography
              variant="body2"
              className="font-semibold text-gray-900 dark:text-gray-100 text-sm"
            >
              {formatDecimal(company.price)} {company.currency}
            </Typography>
          </div>
        </div>
      </div>

      {/* Additional Details */}
      <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-1">
        {/* Exchange */}
        <div className="flex flex-col justify-center items-center">
          {/* Icon and Caption */}
          <div className="flex items-center justify-center">
            <FaExchangeAlt className="text-gray-500 dark:text-gray-400 text-sm" />
            <Typography
              variant="caption"
              className="text-gray-500 dark:text-gray-400 ml-1"
            >
              Exchange
            </Typography>
          </div>
          {/* Value */}
          <Typography
            variant="body2"
            className="font-semibold text-gray-900 dark:text-gray-100 text-xs"
          >
            {company.exchange}
          </Typography>
        </div>

        {/* Currency */}
        <div className="flex flex-col justify-center items-center">
          {/* Icon and Caption */}
          <div className="flex items-center justify-center">
            <FaMoneyBillWave className="text-gray-500 dark:text-gray-400 text-sm" />
            <Typography
              variant="caption"
              className="text-gray-500 dark:text-gray-400 ml-1"
            >
              Currency
            </Typography>
          </div>
          {/* Value */}
          <Typography
            variant="body2"
            className="font-semibold text-gray-900 dark:text-gray-100 text-xs"
          >
            {company.currency}
          </Typography>
        </div>

        {/* IPO Date */}
        <div className="flex flex-col justify-center items-center">
          {/* Icon and Caption */}
          <div className="flex items-center justify-center">
            <FaCalendarAlt className="text-gray-500 dark:text-gray-400 text-sm" />
            <Typography
              variant="caption"
              className="text-gray-500 dark:text-gray-400 ml-1"
            >
              IPO Date
            </Typography>
          </div>
          {/* Value */}
          <Typography
            variant="body2"
            className="font-semibold text-gray-900 dark:text-gray-100 text-xs"
          >
            {company.ipoDate}
          </Typography>
        </div>

        {/* Website */}
        <div className="flex flex-col justify-center items-center">
          {/* Icon and Caption */}
          <div className="flex items-center justify-center">
            <FaGlobe className="text-gray-500 dark:text-gray-400 text-sm" />
            <Typography
              variant="caption"
              className="text-gray-500 dark:text-gray-400 ml-1"
            >
              Website
            </Typography>
          </div>
          {/* Value */}
          <Typography
            variant="body2"
            className="font-semibold text-blue-500 dark:text-blue-400 text-xs"
          >
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Visit Site
            </a>
          </Typography>
        </div>

        {/* Industry */}
        <div className="flex flex-col justify-center items-center">
          {/* Icon and Caption */}
          <div className="flex items-center justify-center">
            <FaIndustry className="text-gray-500 dark:text-gray-400 text-sm" />
            <Typography
              variant="caption"
              className="text-gray-500 dark:text-gray-400 ml-1"
            >
              Industry
            </Typography>
          </div>
          {/* Value */}
          <Typography
            variant="body2"
            className="font-semibold text-gray-900 dark:text-gray-100 text-xs"
          >
            {company.industry}
          </Typography>
        </div>

        {/* Sector */}
        <div className="flex flex-col justify-center items-center">
          {/* Icon and Caption */}
          <div className="flex items-center justify-center">
            <FaBuilding className="text-gray-500 dark:text-gray-400 text-sm" />
            <Typography
              variant="caption"
              className="text-gray-500 dark:text-gray-400 ml-1"
            >
              Sector
            </Typography>
          </div>
          {/* Value */}
          <Typography
            variant="body2"
            className="font-semibold text-gray-900 dark:text-gray-100 text-xs"
          >
            {company.sector}
          </Typography>
        </div>

        {/* CEO */}
        <div className="flex flex-col justify-center items-center">
          {/* Icon and Caption */}
          <div className="flex items-center justify-center">
            <FaUser className="text-gray-500 dark:text-gray-400 text-sm" />
            <Typography
              variant="caption"
              className="text-gray-500 dark:text-gray-400 ml-1"
            >
              CEO
            </Typography>
          </div>
          {/* Value */}
          <Typography
            variant="body2"
            className="font-semibold text-gray-900 dark:text-gray-100 text-xs"
          >
            {company.ceo}
          </Typography>
        </div>

        {/* Country */}
        <div className="flex flex-col justify-center items-center">
          {/* Icon and Caption */}
          <div className="flex items-center justify-center">
            <FaFlag className="text-gray-500 dark:text-gray-400 text-sm" />
            <Typography
              variant="caption"
              className="text-gray-500 dark:text-gray-400 ml-1"
            >
              Country
            </Typography>
          </div>
          {/* Value */}
          <Typography
            variant="body2"
            className="font-semibold text-gray-900 dark:text-gray-100 text-xs"
          >
            {company.country}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
