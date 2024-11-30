import ListPortfolio from "../../Components/Portfolio/ListPortfolio/ListPortfolio";
import { PortfolioGet } from "../../Models/Portfolio";
import { Container } from "@mui/material";
import { useOutletContext } from "react-router-dom";

const Portfolio = () => {
  const {
    portfolioSymbols,
    portfolioValues,
    onPortfolioCreate,
    onPortfolioUpdate,
    onPortfolioDelete,
  } = useOutletContext<{
    portfolioSymbols: Set<string>;
    portfolioValues: PortfolioGet[] | null;
    onPortfolioCreate: (symbol: string) => void;
    onPortfolioUpdate: (
      updates: { symbol: string; favourite?: boolean; purchasePrice?: number }[]
    ) => void;
    onPortfolioDelete: (symbol: string[]) => void;
  }>();

  return (
    <Container className="flex flex-col items-center">
      <ListPortfolio
        onPortfolioUpdate={onPortfolioUpdate}
        portfolioValues={portfolioValues!}
        onPortfolioDelete={onPortfolioDelete}
      />
    </Container>
  );
};

export default Portfolio;
