import React from "react";
import {
  CompanyBalanceSheet,
  CompanyCashFlow,
  CompanyIncomeStatement,
  CompanyKeyMetrics,
} from "../../company";

export type RenderData =
  | CompanyCashFlow
  | CompanyIncomeStatement
  | CompanyBalanceSheet
  | CompanyKeyMetrics;

export type ConfigItem = {
  label: string | JSX.Element;
  subTitle?: string;
  render: (data: RenderData) => React.ReactNode;
};

type Props = {
  config: ConfigItem[];
  data: RenderData;
};

const RatioList = ({ config, data }: Props) => {
  const renderedRows = config.map((row, index) => {
    return (
      <li
        key={`ratio-${index}`}
        className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <p className="text-sm sm:text-base font-medium text-gray-800 dark:text-gray-100">
              {row.label}
            </p>
            {row.subTitle && (
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1">
                {row.subTitle}
              </p>
            )}
          </div>
          <div className="mt-2 md:mt-0">
            <span className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
              {row.render(data)}
            </span>
          </div>
        </div>
      </li>
    );
  });

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 sm:p-8">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Key Metrics
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {renderedRows}
      </ul>
    </div>
  );
};

export default RatioList;
