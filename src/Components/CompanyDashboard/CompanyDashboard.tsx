import React from "react";
import { Outlet, useLocation } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  ticker: string;
}

const CompanyDashboard = ({ children, ticker }: Props) => {
  const location = useLocation();

  // Extract the last segment of the path to determine the current section
  const pathSegments = location.pathname.split("/");
  const section = pathSegments[pathSegments.length - 1];

  // Mapping of route segments to their respective titles
  const titleMap: { [key: string]: string } = {
    "company-profile": "Company Profile",
    "income-statement": "Income Statement",
    "balance-sheet": "Balance Sheet",
    "cashflow-statement": "Cashflow Statement",
  };

  // Default title if the section is not found in the map
  const title = titleMap[section] || "Company Profile";

  return (
    <div className="bg-blueGray-100 w-full">
      <div className="pt-6 pb-8 bg-lightBlue-500">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">{children}</div>
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 flex items-center">
              {title}
            </h2>
            <Outlet context={ticker} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
