import React, { useState } from "react";
import {
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import {
  FaStar,
  FaRegStar,
  FaTrash,
  FaPlus,
  FaFolderPlus,
} from "react-icons/fa";

interface PortfolioMenuProps {
  isInPortfolio: boolean;
  isFavourite: boolean;
  handleFavourite: (fav: boolean) => void;
  onPortfolioCreate: (ticker: string) => void;
  handleDelete: () => void;
  ticker?: string;
}

const PortfolioMenu: React.FC<PortfolioMenuProps> = ({
  isInPortfolio,
  isFavourite,
  handleFavourite,
  onPortfolioCreate,
  handleDelete,
  ticker,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAddToPortfolio = () => {
    if (ticker) {
      onPortfolioCreate(ticker);
    }
    handleMenuClose();
  };

  const handleRemoveFromPortfolio = () => {
    handleDelete();
    handleMenuClose();
  };

  const handleMarkFavourite = () => {
    handleFavourite(true);
    handleMenuClose();
  };

  const handleUnmarkFavourite = () => {
    handleFavourite(false);
    handleMenuClose();
  };

  return (
    <div>
      <Tooltip title="My Portfolio">
        <IconButton
          onClick={handleMenuOpen}
          className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-200"
          aria-controls={open ? "portfolio-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          aria-label="My Portfolio"
        >
          <FaFolderPlus className="w-5 h-5" />
        </IconButton>
      </Tooltip>
      <Menu
        id="portfolio-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        // Override MUI Menu styles with Tailwind classes using PaperProps
        PaperProps={{
          className:
            "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg",
        }}
      >
        <Typography
          variant="subtitle1"
          className="px-4 py-2 text-gray-700 dark:text-gray-200"
        >
          My Portfolio
        </Typography>

        <Divider className="bg-gray-200 dark:bg-gray-700" />
        {isInPortfolio ? (
          <Box>
            <MenuItem
              onClick={handleMarkFavourite}
              disabled={isFavourite}
              className="hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FaStar className="mr-2 text-yellow-500" />
              <Typography
                variant="inherit"
                className="text-gray-800 dark:text-gray-200"
              >
                Mark as Favourite
              </Typography>
            </MenuItem>
            <MenuItem
              onClick={handleUnmarkFavourite}
              disabled={!isFavourite}
              className="hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FaRegStar className="mr-2 text-yellow-500" />
              <Typography
                variant="inherit"
                className="text-gray-800 dark:text-gray-200"
              >
                Unmark as Favourite
              </Typography>
            </MenuItem>
            <Divider className="bg-gray-200 dark:bg-gray-700" />
            <MenuItem
              onClick={handleRemoveFromPortfolio}
              className="hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FaTrash className="mr-2 text-red-500" />
              <Typography variant="inherit" className="text-red-500">
                Remove from Portfolio
              </Typography>
            </MenuItem>
          </Box>
        ) : (
          <MenuItem
            onClick={handleAddToPortfolio}
            className="hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FaPlus className="mr-2 text-green-500" />
            <Typography
              variant="inherit"
              className="text-gray-800 dark:text-gray-200"
            >
              Add to Portfolio
            </Typography>
          </MenuItem>
        )}
      </Menu>
    </div>
  );
};

export default PortfolioMenu;
