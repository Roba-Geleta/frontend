import { useEffect, useState } from "react";
import { CompanyBalanceSheet } from "../../company";
import { useOutletContext } from "react-router-dom";
import { getBalanceSheet } from "../../api";
import RatioList, { ConfigItem, RenderData } from "../RatioList/RatioList";
import { formatLargeMonetaryNumber } from "../../Helpers/NumberFormating";
import { BarLoader } from "react-spinners";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

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
  const [balanceSheets, setBalanceSheets] = useState<CompanyBalanceSheet[]>([]);
  const [selectedSheet, setSelectedSheet] =
    useState<CompanyBalanceSheet | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBalanceSheet = async () => {
      setLoading(true);
      try {
        const result = await getBalanceSheet(ticker!);
        setBalanceSheets(result);
        setSelectedSheet(result[0] || null); // Select the first sheet by default
        setError(null);
      } catch (err) {
        console.error("Error fetching balance sheet:", err);
        setError("Failed to load balance sheet data.");
        setBalanceSheets([]);
        setSelectedSheet(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBalanceSheet();
  }, [ticker]);

  const handleYearChange = (event: SelectChangeEvent<string>) => {
    const selectedYear = event.target.value;
    const sheet =
      balanceSheets.find((bs) => bs.calendarYear === selectedYear) || null;
    setSelectedSheet(sheet);
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <BarLoader />
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-red-500">{error}</p>
        </div>
      ) : balanceSheets.length > 0 && selectedSheet ? (
        <div className="space-y-0">
          <div className="flex justify-start items-center px-6 pt-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Calendar Year:
              </p>
            </div>
            <FormControl
              variant="outlined"
              size="small"
              className="!min-w-[100px]"
            >
              <InputLabel
                id="year-select-label"
                className="text-gray-700 dark:text-gray-200"
              >
                Select Year
              </InputLabel>
              <Select
                labelId="year-select-label"
                id="year-select"
                value={selectedSheet.calendarYear}
                onChange={handleYearChange}
                label="Select Year"
                IconComponent={ArrowDropDownIcon}
                className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                MenuProps={{
                  PaperProps: {
                    className:
                      "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200",
                  },
                }}
              >
                {balanceSheets.map((sheet) => (
                  <MenuItem key={sheet.calendarYear} value={sheet.calendarYear}>
                    {sheet.calendarYear}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <RatioList data={selectedSheet} config={configs} />
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
