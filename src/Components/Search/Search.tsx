import React, { SyntheticEvent } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import LinearProgress from "@mui/material/LinearProgress";

interface Props {
  onSearchSubmit: (e: SyntheticEvent) => void;
  search: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "2px 4px",
  display: "flex",
  alignItems: "center",
  width: "100%",
  maxWidth: 600,
  margin: "16px 0",
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[800] : "#fff",
}));

const Search: React.FC<Props> = ({
  onSearchSubmit,
  search,
  handleSearchChange,
  loading,
}): JSX.Element => {
  return (
    <form
      onSubmit={onSearchSubmit}
      style={{ width: "100%" }}
      className="flex flex-col items-center justify-center "
    >
      <StyledPaper elevation={3} className="relative">
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search companies"
          inputProps={{ "aria-label": "search companies" }}
          value={search}
          onChange={handleSearchChange}
        />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
        {loading && (
          <div className="w-full absolute bottom-0 left-0 rounded-b-md">
            <LinearProgress />
          </div>
        )}
      </StyledPaper>
    </form>
  );
};

export default Search;
