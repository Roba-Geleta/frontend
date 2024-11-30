import React, { useState, useEffect, useContext } from "react";
import {
  Autocomplete,
  TextField,
  CircularProgress,
  Typography,
  Button,
  Tooltip,
  InputAdornment,
} from "@mui/material";
import { searchCompanies } from "../../Services/PortfolioService";
import parse from "autosuggest-highlight/parse";
import { CompanySearch } from "../../company";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../Context/ThemeContext";
import { CgSearch } from "react-icons/cg";

interface Props {
  portfolioSymbols: Set<string>;
  onPortfolioCreate: (symbol: string) => void;
}

const Search: React.FC<Props> = ({ portfolioSymbols, onPortfolioCreate }) => {
  const [options, setOptions] = useState<CompanySearch[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [debouncedInputValue, setDebouncedInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const { mode } = useContext(ThemeContext);

  const getMatchPositions = (text: string, query: string) => {
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const indices: [number, number][] = [];
    let startIndex = 0;

    while ((startIndex = lowerText.indexOf(lowerQuery, startIndex)) !== -1) {
      indices.push([startIndex, startIndex + lowerQuery.length]);
      startIndex += lowerQuery.length;
    }

    return indices;
  };

  // Debounce inputValue
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInputValue(inputValue);
    }, 50); // Adjust the delay as needed

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  useEffect(() => {
    const trimmedInput = debouncedInputValue.trim();
    if (trimmedInput === "") {
      setOptions([]);
      setLoading(false);
      return;
    }

    let active = true;
    setLoading(true);

    (async () => {
      try {
        const response = await searchCompanies(trimmedInput);
        if (active) {
          setOptions(response);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    })();

    return () => {
      active = false;
    };
  }, [debouncedInputValue]);

  const renderGroup = React.useCallback(
    (params: any) => (
      <li key={params.key} className="bg-gray-100 dark:bg-gray-700">
        <div className="sticky top-[-10px] z-10 p-2 bg-gray-100 dark:bg-gray-700">
          <Typography variant="subtitle2" className="text-sm font-semibold">
            {params.group}
          </Typography>
        </div>
        <ul className="">{params.children}</ul>
      </li>
    ),
    []
  );

  // Define the renderOption function
  const renderOptionFn = React.useCallback(
    (props, option) => {
      const trimmedInputValue = debouncedInputValue.trim();

      const matchesSymbol = getMatchPositions(option.symbol, trimmedInputValue);
      const partsSymbol = parse(option.symbol, matchesSymbol);

      const matchesName = getMatchPositions(
        option.companyName,
        trimmedInputValue
      );
      const partsName = parse(option.companyName, matchesName);

      const isInPortfolio = portfolioSymbols.has(option.symbol.toLowerCase());

      return (
        <li {...props} key={option.symbol} className="!min-w-full">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-2 bg-white shadow-md dark:bg-gray-800 text-blue-600 dark:text-blue-300 gap-4">
            {/* Link Section */}
            <Link
              to={`/stocks/company/${option.symbol}/company-profile`}
              className="flex-grow"
            >
              <div>
                <Typography variant="body1" className="text-xs md:text-sm">
                  {partsSymbol.map((part, index) => (
                    <span
                      key={index}
                      className="!text-xs"
                      style={{ fontWeight: part.highlight ? 700 : 400 }}
                    >
                      {part.text}
                    </span>
                  ))}{" "}
                  -{" "}
                  {partsName.map((part, index) => (
                    <span
                      className="!text-xs"
                      key={index}
                      style={{ fontWeight: part.highlight ? 700 : 400 }}
                    >
                      {part.text}
                    </span>
                  ))}
                </Typography>

                <Typography
                  variant="body2"
                  color="textSecondary"
                  className="text-gray-500 dark:text-gray-300 text-xs md:text-sm"
                >
                  {option.exchangeShortName} - {option.price}
                </Typography>
              </div>
            </Link>

            {/* Add to Portfolio Button */}
            <div className="w-full md:w-auto">
              <Tooltip
                title={
                  isInPortfolio ? "Already in portfolio" : "Add to portfolio"
                }
              >
                <span>
                  <Button
                    variant="contained"
                    disabled={isInPortfolio}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents triggering the Link
                      onPortfolioCreate(option.symbol);
                    }}
                    className="w-full md:w-auto pl-4 py-2 !text-xs text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-green-700 dark:hover:bg-green-800 disabled:!text-gray-400"
                  >
                    {isInPortfolio ? "Added" : "Add"}
                  </Button>
                </span>
              </Tooltip>
            </div>
          </div>
        </li>
      );
    },
    [debouncedInputValue, portfolioSymbols, onPortfolioCreate]
  );

  return (
    <Autocomplete
      freeSolo
      options={options}
      filterOptions={(x) => x}
      getOptionLabel={(option) =>
        typeof option === "string"
          ? option
          : `${option.symbol} - ${option.companyName}`
      }
      groupBy={(option) => option.exchange}
      loading={loading}
      onInputChange={(event, value) => {
        if (value === "") {
          setOptions([]);
        }
        setInputValue(value);
      }}
      renderOption={renderOptionFn}
      renderGroup={renderGroup}
      renderInput={(params) => (
        <TextField
          {...params}
          className=" bg-white dark:bg-gray-600 dark:!text-white !rounded-lg"
          label="Search for stocks"
          variant="outlined"
          sx={{
            input: { color: mode === "dark" ? "white" : "black" },
            label: {
              color: mode === "dark" ? "white !important" : "black !important",
            },
          }}
          slotProps={{
            input: {
              ...params.InputProps,
              className: "!text-white",
              startAdornment: (
                <InputAdornment position="start">
                  <CgSearch />
                </InputAdornment>
              ),
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            },
          }}
        />
      )}
      className="!flex-grow"
      ListboxProps={{
        className: "bg-white dark:bg-gray-800",
      }}
    />
  );
};

export default Search;
