import { useEffect, useState } from "react";
import { CompanyIncomeStatement } from "../../company";
import { useOutletContext } from "react-router-dom";
import { getIncomeStatement } from "../../api";
import Table from "../Table/Table";
import Spinner from "../Spinner/Spinner";
import {
  formatLargeMonetaryNumber,
  formatRatio,
} from "../../Helpers/NumberFormating";
import { ConfigItem, RenderData } from "../RatioList/RatioList";

const configs: ConfigItem[] = [
  {
    label: "Date",
    render: (data: RenderData) => {
      const company = data as CompanyIncomeStatement;
      return company.date;
    },
  },
  {
    label: "Revenue",
    render: (data: RenderData) => {
      const company = data as CompanyIncomeStatement;
      return formatLargeMonetaryNumber(company.revenue);
    },
  },
  {
    label: "Cost Of Revenue",
    render: (data: RenderData) => {
      const company = data as CompanyIncomeStatement;
      return formatLargeMonetaryNumber(company.costOfRevenue);
    },
  },
  {
    label: "Depreciation",
    render: (data: RenderData) => {
      const company = data as CompanyIncomeStatement;
      return formatLargeMonetaryNumber(company.depreciationAndAmortization);
    },
  },
  {
    label: "Operating Income",
    render: (data: RenderData) => {
      const company = data as CompanyIncomeStatement;
      return formatLargeMonetaryNumber(company.operatingIncome);
    },
  },
  {
    label: "Income Before Taxes",
    render: (data: RenderData) => {
      const company = data as CompanyIncomeStatement;
      return formatLargeMonetaryNumber(company.incomeBeforeTax);
    },
  },
  {
    label: "Net Income",
    render: (data: RenderData) => {
      const company = data as CompanyIncomeStatement;
      return formatLargeMonetaryNumber(company.netIncome);
    },
  },
  {
    label: "Net Income Ratio",
    render: (data: RenderData) => {
      const company = data as CompanyIncomeStatement;
      return formatRatio(company.netIncomeRatio);
    },
  },
  {
    label: "Earnings Per Share",
    render: (data: RenderData) => {
      const company = data as CompanyIncomeStatement;
      return formatRatio(company.eps);
    },
  },
  {
    label: "Earnings Per Diluted",
    render: (data: RenderData) => {
      const company = data as CompanyIncomeStatement;
      return formatRatio(company.epsdiluted);
    },
  },
  {
    label: "Gross Profit Ratio",
    render: (data: RenderData) => {
      const company = data as CompanyIncomeStatement;
      return formatRatio(company.grossProfitRatio);
    },
  },
  {
    label: "Operating Income Ratio",
    render: (data: RenderData) => {
      const company = data as CompanyIncomeStatement;
      return formatRatio(company.operatingIncomeRatio);
    },
  },
  {
    label: "Income Before Taxes Ratio",
    render: (data: RenderData) => {
      const company = data as CompanyIncomeStatement;
      return formatRatio(company.incomeBeforeTaxRatio);
    },
  },
];

const IncomeStatement = () => {
  const ticker = useOutletContext<string>();
  const [incomeStatement, setIncomeStatement] = useState<
    CompanyIncomeStatement[] | null
  >(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const incomeStatementFetch = async () => {
      try {
        const result = await getIncomeStatement(ticker);
        setIncomeStatement(result);
        setError(null);
      } catch (err) {
        console.error("Error fetching income statement:", err);
        setError("Failed to load income statement data.");
        setIncomeStatement(null);
      } finally {
        setLoading(false);
      }
    };
    incomeStatementFetch();
  }, [ticker]);

  return (
    <div className="w-full px-4 py-6">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner />
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-red-500">{error}</p>
        </div>
      ) : incomeStatement && incomeStatement.length > 0 ? (
        <div className="space-y-6">
          <Table config={configs} data={incomeStatement} />
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-600 dark:text-gray-300">
            No income statement data available.
          </p>
        </div>
      )}
    </div>
  );
};

export default IncomeStatement;
