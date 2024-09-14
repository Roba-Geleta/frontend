import React, { SyntheticEvent, useState } from "react";
import { searchCompanies } from "../../api";
import { CompanySearch } from "../../company";
import Search from "../../Components/Search/Search";
import ListPortfolio from "../../Components/Portfolio/ListPortfolio/ListPortfolio";
import CardList from "../../Components/CardList/CardList";

interface Props {}

const SearchPage = (props: Props) => {
  // const [count, setCount] = useState(0);
  const [search, setSearch] = useState<string>("");
  const [portfolioValues, setPortfolioValues] = useState<string[]>([]);
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onPortfolioCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const input = form.elements.namedItem("symbol") as HTMLInputElement;
    const symbol = input.value;

    const exists = portfolioValues.includes(symbol);
    if (exists) return;

    const updatedPortfolio = [...portfolioValues, symbol];
    setPortfolioValues(updatedPortfolio);
  };

  const onPortfolioDelete = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem("portfolioValue") as HTMLInputElement;

    if (input) {
      const valueToDelete = input.value;
      const removed = portfolioValues.filter(
        (value) => value !== valueToDelete
      );
      setPortfolioValues(removed);
    }
  };

  const onSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const result = await searchCompanies(search);
    if (typeof result === "string") {
      setServerError(result);
    } else if (Array.isArray(result.data)) {
      setSearchResult(result.data);
    }

    console.log("searchResult: ", searchResult);
  };

  return (
    <>
      <div className="App">
        <Search
          onSearchSubmit={onSearchSubmit}
          search={search}
          handleSearchChange={handleSearchChange}
        />
        <ListPortfolio
          portfolioValues={portfolioValues}
          onPortfolioDelete={onPortfolioDelete}
        />
        <CardList
          searchResults={searchResult}
          onPortfolioCreate={onPortfolioCreate}
        />

        {serverError && <h1>Unable to connect to API</h1>}
      </div>
    </>
  );
};

export default SearchPage;
