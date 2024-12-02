import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Container, Box } from "@mui/material";
import { useAuth } from "../../Context/userAuth";
import StocksAppBar from "../../Components/StocksAppBar/StocksAppBar";
import ErrorBoundary from "../../Components/ErrorBoundary/ErrorBoundary";
import { handleError } from "../../Helpers/ErrorHandler";
import {
  portfolioAddAPI,
  portfolioDeleteAPI,
  portfolioGetAPI,
  portfolioUpdateAPI,
} from "../../Services/PortfolioService";
import { PortfolioGet } from "../../Models/Portfolio";
import { toast, ToastContainer } from "react-toastify";
import Footer from "../../Components/Footer/Footer";
import usePageMeta from "../../hooks/usePageMeta/usePageMeta";
import "react-toastify/dist/ReactToastify.css";
import FIPLogoIconDark from "../../assets/FIPLogoIconDark.svg";
import "./StocksLayout.css";
import { ThemeContext } from "../../Context/ThemeContext";

const StocksLayout: React.FC = () => {
  usePageMeta({
    title: "FIP",
    favicon: FIPLogoIconDark,
  });
  const { mode } = useContext(ThemeContext);

  const { isLoggedIn } = useAuth();

  const [portfolioSymbols, setPortfolioSymbols] = useState<Set<string>>(
    new Set()
  );
  const [portfolioValues, setPortfolioValues] = useState<PortfolioGet[]>([]); // Replace 'any' with your portfolio item type

  const getPortfolio = async () => {
    try {
      const res = await portfolioGetAPI();
      if (res?.data) {
        setPortfolioValues(res.data);
        setPortfolioSymbols(
          new Set(res.data.map((item) => item.symbol.toLowerCase()))
        );

        console.log("Portfolio values", res.data);
        console.log("Portfolio symbols", portfolioSymbols);
      }
    } catch (e) {
      handleError(e);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      getPortfolio();
    } else {
      setPortfolioValues([]);
      setPortfolioSymbols(new Set());
    }
  }, [isLoggedIn]);

  const onPortfolioCreate = (symbol: string) => {
    portfolioAddAPI(symbol)
      .then((res) => {
        if (
          res &&
          (res.status === 200 || res.status === 201 || res.status === 204)
        ) {
          toast.success("Stock added to portfolio!");
          getPortfolio();
        }
      })
      .catch((e) => {
        handleError(e);
        toast.warning("Could not create portfolio item!");
      });
  };

  const onPortfolioUpdate = (
    updates: { symbol: string; favourite?: boolean; purchasePrice?: number }[]
  ) => {
    const updatePromises = updates.map((update) =>
      portfolioUpdateAPI(update.symbol, update.favourite, update.purchasePrice)
    );

    Promise.all(updatePromises).then((responses) => {
      const allSuccess = responses.every((res) => res !== undefined);
      if (allSuccess) {
        toast.success("Portfolio updated successfully!");
        getPortfolio(); // Refresh data
      } else {
        toast.error("Some updates failed. Please try again.");
      }
    });
  };

  const onPortfolioDelete = (symbolsToDelete: string[]) => {
    const deletePromises = symbolsToDelete.map((symbol) =>
      portfolioDeleteAPI(symbol)
    );

    Promise.all(deletePromises).then((responses) => {
      const allSuccess = responses.every((res) => res?.status === 200);
      if (allSuccess) {
        toast.success(
          symbolsToDelete.length > 1
            ? `${symbolsToDelete.length} stocks deleted from portfolio!`
            : `Stock deleted from portfolio!`
        );
        getPortfolio();
      } else {
        toast.error("Some deletions failed. Please try again.");
      }
    });
  };

  return (
    <>
      <StocksAppBar
        portfolioSymbols={portfolioSymbols}
        onPortfolioCreate={onPortfolioCreate}
      />
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          // backgroundRepeat: "no-repeat",
          // backgroundImage:
          //   "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)",
        }}
        className={
          mode === "dark"
            ? "stocksBackgroundDark"
            : "stocksBackgroundLight !bg-opacity-20"
        }
        // className="bg-orange-100 dark:bg-gray-900 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,_hsl(210,_100%,_90%),_transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,_hsl(210,_100%,_16%),_transparent)]"
      >
        {/* <ToastContainer
          position="top-center"
          autoClose={2000}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          theme="light"
          containerId="unauthorized"
        /> */}
        <Container
          sx={{
            pt: { xs: 14, sm: 14 },
            pb: { xs: 6, sm: 8 },
          }}
          className=""
          maxWidth="xl"
        >
          <ToastContainer />
          <ErrorBoundary>
            <Outlet
              context={{
                portfolioSymbols,
                portfolioValues,
                onPortfolioCreate,
                onPortfolioUpdate,
                onPortfolioDelete,
              }}
            />
          </ErrorBoundary>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default StocksLayout;
