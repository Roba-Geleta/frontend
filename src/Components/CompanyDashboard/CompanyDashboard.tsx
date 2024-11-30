import React from "react";
import { Outlet } from "react-router-dom";
import StockComment from "../StockComment/StockComment";

interface Props {
  children: React.ReactNode;
  ticker: string;
}

const CompanyDashboard = ({ children, ticker }: Props) => {
  return (
    <div className="bg-blueGray-100 w-full">
      <div className="pt-6 pb-8 bg-lightBlue-500">
        <div className="mx-auto">
          <div className="flex flex-wrap">
            {children}
            <Outlet context={ticker} />
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
