import React, { SyntheticEvent, useEffect, useState } from "react";
import { searchCompanies } from "../../api";
import { CompanySearch } from "../../company";
import Search from "../../Components/Search/Search";
import ListPortfolio from "../../Components/Portfolio/ListPortfolio/ListPortfolio";
import CardList from "../../Components/CardList/CardList";
import { PortfolioGet } from "../../Models/Portfolio";
import {
  portfolioAddAPI,
  portfolioDeleteAPI,
  portfolioGetAPI,
} from "../../Services/PortfolioService";
import { toast } from "react-toastify";
import { Box, Container, Typography } from "@mui/material";
import { handleError } from "../../Helpers/ErrorHandler";
import ConstructionIcon from "@mui/icons-material/Construction";

const SearchPage = () => {
  const [search, setSearch] = useState<string>("");
  const [portfolioValues, setPortfolioValues] = useState<PortfolioGet[] | null>(
    []
  );
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    getPortfolio();
  }, []);

  const getPortfolio = async () => {
    portfolioGetAPI()
      .then((res) => {
        if (res?.data) {
          setPortfolioValues(res.data);
        }
      })
      .catch((e) => {
        handleError(e);
        toast.warning("Could not get portfolio values!");
      });
  };

  const onPortfolioCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const input = target[0] as HTMLInputElement;
    portfolioAddAPI(input.value)
      .then((res) => {
        if (res?.status === 204) {
          toast.success("Stock added to portfolio!");
          getPortfolio();
        }
      })
      .catch((e) => {
        handleError(e);
        // toast.warning("Could not create portfolio item!");
      });
  };

  const onPortfolioDelete = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.currentTarget as HTMLFormElement;
    const input = target[0] as HTMLInputElement;
    portfolioDeleteAPI(input.value).then((res) => {
      if (res?.status === 200) {
        toast.success("Stock deleted from portfolio!");
        getPortfolio();
      }
    });
  };

  const onSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await searchCompanies(search).finally(() => {
      setLoading(false);
    });
    if (typeof result === "string") {
      console.log("error: ", result);
      setServerError(result);
    } else if (Array.isArray(result)) {
      setSearchResult(result);
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: { xs: "center", md: "flex-start" },
        }}
      >
        <ConstructionIcon
          sx={{ color: "warning.main", fontSize: "1rem", mr: 0.3 }}
        />
        <Typography
          variant="caption"
          sx={{
            color: "warning.main",
            fontWeight: "bold",
          }}
        >
          Work In Progress
        </Typography>
      </Box>
      <Search
        loading={loading}
        onSearchSubmit={onSearchSubmit}
        search={search}
        handleSearchChange={handleSearchChange}
      />
      <ListPortfolio
        portfolioValues={portfolioValues!}
        onPortfolioDelete={onPortfolioDelete}
      />
      <CardList
        loading={loading}
        searchResults={searchResult}
        onPortfolioCreate={onPortfolioCreate}
      />

      {serverError && (
        <h1 className="text-red-500 dark:text-red-400">
          Unable to connect to API
        </h1>
      )}
    </Container>
  );
};

export default SearchPage;
