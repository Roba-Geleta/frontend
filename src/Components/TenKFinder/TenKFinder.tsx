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
    <div className="flex flex-wrap m-4">
      {companyData ? (
        companyData
          .slice(0, 5)
          .map((tenK) => (
            <TenKFinderItem
              tenk={tenK}
              key={`${tenK.symbol}-${tenK.fillingDate}`}
            />
          ))
      ) : (
        <BarLoader />
      )}
    </div>
  );
};

export default TenKFinder;
