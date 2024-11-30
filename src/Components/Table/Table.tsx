import { CompanyCashFlow, CompanyIncomeStatement } from "../../company";
import { ConfigItem } from "../RatioList/RatioList";

type TableData = CompanyCashFlow | CompanyIncomeStatement;

type Props = {
  config: ConfigItem[];
  data: TableData[];
};

const Table = ({ config, data }: Props) => {
  const renderedRows = data.map((company, index) => {
    const uniqueKey = company.cik ? company.cik : index;

    return (
      <tr
        key={`row-${uniqueKey}-${index}`}
        className={`${
          index % 2 === 0
            ? "bg-white dark:bg-gray-800"
            : "bg-gray-50 dark:bg-gray-700"
        } hover:bg-gray-100 dark:hover:bg-gray-600`}
      >
        {config.map((val, idx) => (
          <td
            className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 dark:text-gray-100"
            key={`cell-${uniqueKey}-${idx}`}
          >
            {val.render(company)}
          </td>
        ))}
      </tr>
    );
  });

  const renderedHeaders = config.map((configItem, index) => (
    <th
      className="p-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
      key={`header-${index}-${configItem.label}`}
      scope="col"
    >
      {configItem.label}
    </th>
  ));

  return (
    <div className="bg-white dark:bg-gray-800 shadow overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>{renderedHeaders}</tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {renderedRows}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
