import { useEffect, useState } from "react";
import { CompanyTenK } from "../../company";
import { getTenK } from "../../api";
import TenKFinderItem from "./TenKFinderItem/TenKFinderItem";
import { BarLoader } from "react-spinners";

type Props = {
  ticker: string;
};

const TenKFinder = ({ ticker }: Props) => {
  const [companyData, setCompanyData] = useState<CompanyTenK[]>();

  useEffect(() => {
    const getTenKData = async () => {
      const value = await getTenK(ticker);
      setCompanyData(value);
    };
    getTenKData();
  }, [ticker]);

  return (
    <div
      className={`w-full p-2 bg-white dark:bg-gray-800 shadow ${
        companyData?.length == 0 ? "hidden" : "hi"
      }`}
    >
      <div className="flex flex-row pl-6 text-xl font-semibold text-medium text-gray-900 dark:text-gray-100">
        SEC 10-k Filings
      </div>

      <div
        className={`flex flex-wrap items-center justify-center w-full p-2 ${
          companyData?.length == 0 ? "hidden" : "hi"
        }`}
      >
        {companyData ? (
          companyData.map((tenK) => (
            <TenKFinderItem
              tenk={tenK}
              key={`${tenK.symbol}-${tenK.fillingDate}`}
            />
          ))
        ) : (
          <BarLoader />
        )}
      </div>
    </div>
  );
};

export default TenKFinder;
