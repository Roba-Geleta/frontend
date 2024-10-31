import { useEffect, useState } from "react";
import { CompanyKeyMetrics } from "../../company";
import { useOutletContext } from "react-router-dom";
import { getKeyMetrics } from "../../api";
import RatioList, { ConfigItem, RenderData } from "../RatioList/RatioList";
import Spinner from "../Spinner/Spinner";
import {
  formatLargeNonMonetaryNumber,
  formatRatio,
} from "../../Helpers/NumberFormating";
import StockComment from "../StockComment/StockComment";

const tableConfig: ConfigItem[] = [
  {
    label: "Market Cap",
    render: (data: RenderData) => {
      const company = data as CompanyKeyMetrics;
      return formatLargeNonMonetaryNumber(company.marketCapTTM);
    },
    subTitle: "Total value of all a company's shares of stock",
  },
  {
    label: "Current Ratio",
    render: (data: RenderData) => {
      const company = data as CompanyKeyMetrics;
      return formatRatio(company.currentRatioTTM);
    },
    subTitle:
      "Measures the company's ability to pay short term debt obligations",
  },
  {
    label: "Return On Equity",
    render: (data: RenderData) => {
      const company = data as CompanyKeyMetrics;
      return formatRatio(company.roeTTM);
    },
    subTitle:
      "Return on equity is the measure of a company's net income divided by its shareholder's equity",
  },
  {
    label: "Return On Assets",
    render: (data: RenderData) => {
      const company = data as CompanyKeyMetrics;
      return formatRatio(company.returnOnTangibleAssetsTTM);
    },
    subTitle:
      "Return on assets is the measure of how effective a company is using its assets",
  },
  {
    label: "Free Cashflow Per Share",
    render: (data: RenderData) => {
      const company = data as CompanyKeyMetrics;
      return formatRatio(company.freeCashFlowPerShareTTM);
    },
    subTitle:
      "Return on assets is the measure of how effective a company is using its assets",
  },
  {
    label: "Book Value Per Share TTM",
    render: (data: RenderData) => {
      const company = data as CompanyKeyMetrics;
      return formatRatio(company.bookValuePerShareTTM);
    },
    subTitle:
      "Book value per share indicates a firm's net asset value (total assets - total liabilities) on a per share basis",
  },
  {
    label: "Dividend Yield TTM",
    render: (data: RenderData) => {
      const company = data as CompanyKeyMetrics;
      return formatRatio(company.dividendYieldTTM);
    },
    subTitle: "Shows how much a company pays each year relative to stock price",
  },
  {
    label: "Capex Per Share TTM",
    render: (data: RenderData) => {
      const company = data as CompanyKeyMetrics;
      return formatRatio(company.capexPerShareTTM);
    },
    subTitle:
      "Capex is used by a company to acquire, upgrade, and maintain physical assets",
  },
  {
    label: "Graham Number",
    render: (data: RenderData) => {
      const company = data as CompanyKeyMetrics;
      return formatRatio(company.grahamNumberTTM);
    },
    subTitle:
      "This is the upper bound of the price range that a defensive investor should pay for a stock",
  },
  {
    label: "PE Ratio",
    render: (data: RenderData) => {
      const company = data as CompanyKeyMetrics;
      return formatRatio(company.peRatioTTM);
    },
    subTitle:
      "This is the upper bound of the price range that a defensive investor should pay for a stock",
  },
];

const CompanyProfile = () => {
  const ticker = useOutletContext<string>();
  const [companyData, setCompanyData] = useState<CompanyKeyMetrics>();

  useEffect(() => {
    const getCompanyKeyMetrics = async () => {
      try {
        const value = await getKeyMetrics(ticker);
        setCompanyData(value[0]);
        console.log("Company Key Metrics:", value);
      } catch (error) {
        console.error("Error fetching company key metrics:", error);
      }
    };
    getCompanyKeyMetrics();
  }, [ticker]);

  return (
    <div className="w-full px-4 py-6">
      {companyData ? (
        <div className="space-y-6">
          {/* Ratio List */}
          <RatioList data={companyData} config={tableConfig} />

          {/* Stock Comments */}
          <StockComment stockSymbol={ticker} />
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default CompanyProfile;
