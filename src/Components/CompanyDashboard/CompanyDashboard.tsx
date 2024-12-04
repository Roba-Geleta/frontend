import React from "react";
import { Outlet } from "react-router-dom";
import StockComment from "../StockComment/StockComment";
import Header from "../Header/Header";
import { Divider } from "@mui/material";

interface Props {
  children: React.ReactNode;
  ticker: string;
}

const CompanyDashboard = ({ children, ticker }: Props) => {
  return (
    <div className="bg-blueGray-100 w-full">
      <div className="pt-6 pb-8 bg-lightBlue-500">
        <div className="mx-auto">
          <div className="flex flex-wrap space-y-2">
            {children}
            <div className="w-full">
              <Divider className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" />
              <Header />
              <Divider className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" />
              <Outlet context={ticker} />
            </div>
          </div>
          <div className="flex-grow">
            <StockComment stockSymbol={ticker} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
