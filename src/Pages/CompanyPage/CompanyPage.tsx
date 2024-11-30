import { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { CompanyProfile } from "../../company";
import { getCompanyProfile } from "../../api";
import Header from "../../Components/Header/Header";
import CompanyDashboard from "../../Components/CompanyDashboard/CompanyDashboard";
import TenKFinder from "../../Components/TenKFinder/TenKFinder";
import ReadMore from "../../Components/ReadMore/ReadMore";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
} from "@mui/material";
import ConnectionStatusFeedBack from "../../Components/ConnectionStatusFeedBack/ConnectionStatusFeedBack";
import { BarLoader } from "react-spinners";
import { PortfolioGet } from "../../Models/Portfolio";
import CompanyDetails from "../../Components/CompanyDetails/CompanyDetails";

const CompanyPage = () => {
  const {
    portfolioSymbols,
    portfolioValues,
    onPortfolioCreate,
    onPortfolioDelete,
    onPortfolioUpdate,
  } = useOutletContext<{
    portfolioSymbols: Set<string>;
    portfolioValues: PortfolioGet[];
    onPortfolioCreate: (symbol: string) => void;
    onPortfolioDelete: (symbols: string[]) => void;
    onPortfolioUpdate: (
      updates: { symbol: string; favourite?: boolean; purchasePrice?: number }[]
    ) => void;
  }>();
  const { ticker } = useParams();
  const [company, setCompany] = useState<CompanyProfile>();
  const [DeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isInPortfolio, setIsInPortfolio] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    const getProfileInit = async () => {
      const result = await getCompanyProfile(ticker!);
      setCompany(result[0]);
      console.log(result[0]);
      console.log("default image", result[0].defaultImage);
      console.log("default image", result[0].image);
    };
    getProfileInit();
  }, [ticker]);

  useEffect(() => {
    console.log("portfolioSymbols", portfolioSymbols);
    if (portfolioSymbols.has(ticker!.toLowerCase())) {
      setIsInPortfolio(true);
    } else {
      setIsInPortfolio(false);
    }

    // Check if the stock is marked as favourite
    console.log("portfolioValues", portfolioValues);
    if (portfolioValues) {
      const portfolioValue = portfolioValues.find(
        (value: PortfolioGet) => value.symbol === ticker
      );
      if (portfolioValue) {
        setIsFavourite(portfolioValue.favourite);
      }
    }
  }, [portfolioSymbols, portfolioValues, ticker]);

  useEffect(() => {
    console.log("isFavourite", isFavourite);
    console.log("isInPortfolio", isInPortfolio);
  }, [isFavourite, isInPortfolio]);

  const handleDelete = () => {
    setDeleteDialogOpen(true);
  };

  const handleFavourite = (value: boolean) => {
    const updates = [
      {
        symbol: ticker!,
        favourite: value,
      },
    ];
    onPortfolioUpdate(updates);
  };

  const confirmDelete = () => {
    const symbolsToDelete = [ticker].filter(
      (symbol): symbol is string => symbol !== undefined
    );
    console.log("symbolsToDelete", symbolsToDelete);
    onPortfolioDelete(symbolsToDelete);
    setDeleteDialogOpen(false);
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <div className="max-w-[30rem] mx-auto">
        <ConnectionStatusFeedBack />
      </div>

      {company ? (
        <div className="w-full">
          <CompanyDashboard ticker={ticker!}>
            <CompanyDetails
              company={company}
              isInPortfolio={isInPortfolio}
              isFavourite={isFavourite}
              handleFavourite={handleFavourite}
              onPortfolioCreate={onPortfolioCreate}
              handleDelete={handleDelete}
              ticker={company.symbol}
            />

            <TenKFinder ticker={company.symbol} />
            <div className="bg-white dark:bg-gray-800 shadow rounded-t text-medium text-gray-900 dark:text-gray-100 p-6 mt-4">
              <h3 className="text-xl font-semibold">Company Description</h3>
              <ReadMore text={company.description} maxCharacters={300} />
            </div>
            <div className="w-full">
              <Divider className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" />
              <Header />
              <Divider className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" />
            </div>
          </CompanyDashboard>
        </div>
      ) : (
        <BarLoader />
      )}
      <Dialog
        open={DeleteDialogOpen}
        onClose={cancelDelete}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete {ticker} from your portfolio?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CompanyPage;
