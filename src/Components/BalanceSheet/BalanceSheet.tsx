import { useEffect, useState } from "react";
import { CompanyBalanceSheet } from "../../company";
import { useOutletContext } from "react-router-dom";
import { getBalanceSheet } from "../../api";
import RatioList, { ConfigItem, RenderData } from "../RatioList/RatioList";
import { formatLargeMonetaryNumber } from "../../Helpers/NumberFormating";
import { BarLoader } from "react-spinners";

const configs: ConfigItem[] = [
  {
    label: <div className="font-bold">Total Assets</div>,
    render: (data: RenderData) => {
      const company = data as CompanyBalanceSheet;
      return formatLargeMonetaryNumber(company.totalAssets);
    },
  },
  {
    label: "Current Assets",
    render: (data: RenderData) => {
      const company = data as CompanyBalanceSheet;
      return formatLargeMonetaryNumber(company.totalCurrentAssets);
    },
  },
  {
    label: "Total Cash",
    render: (data: RenderData) => {
      const company = data as CompanyBalanceSheet;
      return formatLargeMonetaryNumber(company.cashAndCashEquivalents);
    },
  },
  {
    label: "Property & Equipment",
    render: (data: RenderData) => {
      const company = data as CompanyBalanceSheet;
      return formatLargeMonetaryNumber(company.propertyPlantEquipmentNet);
    },
  },
  {
    label: "Intangible Assets",
    render: (data: RenderData) => {
      const company = data as CompanyBalanceSheet;
      return formatLargeMonetaryNumber(company.intangibleAssets);
    },
  },
  {
    label: "Long Term Debt",
    render: (data: RenderData) => {
      const company = data as CompanyBalanceSheet;
      return formatLargeMonetaryNumber(company.longTermDebt);
    },
  },
  {
    label: "Total Liabilities",
    render: (data: RenderData) => {
      const company = data as CompanyBalanceSheet;
      return formatLargeMonetaryNumber(company.totalLiabilities);
    },
  },
  {
    label: "Current Liabilities",
    render: (data: RenderData) => {
      const company = data as CompanyBalanceSheet;
      return formatLargeMonetaryNumber(company.totalCurrentLiabilities);
    },
  },
  {
    label: "Long-Term Debt",
    render: (data: RenderData) => {
      const company = data as CompanyBalanceSheet;
      return formatLargeMonetaryNumber(company.longTermDebt);
    },
  },
  {
    label: "Long-Term Income Taxes",
    render: (data: RenderData) => {
      const company = data as CompanyBalanceSheet;
      return formatLargeMonetaryNumber(company.otherLiabilities);
    },
  },
  {
    label: "Stakeholder's Equity",
    render: (data: RenderData) => {
      const company = data as CompanyBalanceSheet;
      return formatLargeMonetaryNumber(company.totalStockholdersEquity);
    },
  },
  {
    label: "Retained Earnings",
    render: (data: RenderData) => {
      const company = data as CompanyBalanceSheet;
      return formatLargeMonetaryNumber(company.retainedEarnings);
    },
  },
];

const BalanceSheet = () => {
  const ticker = useOutletContext<string>();
  const [balanceSheet, setBalanceSheet] =
    useState<CompanyBalanceSheet | null>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBalanceSheet = async () => {
      try {
        const result = await getBalanceSheet(ticker!);
        setBalanceSheet(result[0]);
        setError(null);
      } catch (err) {
        console.error("Error fetching balance sheet:", err);
        setError("Failed to load balance sheet data.");
        setBalanceSheet(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBalanceSheet();
  }, [ticker]);

  return (
    <div className="w-full py-6">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <BarLoader />
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-red-500">{error}</p>
        </div>
      ) : balanceSheet ? (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Calendar Year: {balanceSheet.calendarYear}
            </h2>
          </div>
          <RatioList data={balanceSheet} config={configs} />
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-600 dark:text-gray-300">
            No balance sheet data available.
          </p>
        </div>
      )}
    </div>
  );
};

export default BalanceSheet;
