import ListPortfolio from "../../Components/Portfolio/ListPortfolio/ListPortfolio";
import { PortfolioGet } from "../../Models/Portfolio";
import { useOutletContext } from "react-router-dom";
import usePageMeta from "../../hooks/usePageMeta/usePageMeta";

const SearchPage = () => {
  usePageMeta({
    title: "FIP - Portfolio",
  });
  const { portfolioValues, onPortfolioUpdate, onPortfolioDelete } =
    useOutletContext<{
      portfolioValues: PortfolioGet[] | null;
      onPortfolioUpdate: (
        updates: {
          symbol: string;
          favourite?: boolean;
          purchasePrice?: number;
        }[]
      ) => void;
      onPortfolioDelete: (symbol: string[]) => void;
    }>();

  return (
    <div className="flex flex-col items-center">
      <ListPortfolio
        onPortfolioUpdate={onPortfolioUpdate}
        portfolioValues={portfolioValues!}
        onPortfolioDelete={onPortfolioDelete}
      />
    </div>
  );
};

export default SearchPage;
