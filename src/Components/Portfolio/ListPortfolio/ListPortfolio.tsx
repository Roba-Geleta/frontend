import React, {
  useState,
  useMemo,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { PortfolioGet } from "../../../Models/Portfolio";
import {
  FaBookmark,
  FaBriefcase,
  FaRegStar,
  FaStar,
  FaTrash,
} from "react-icons/fa";
import InfoIcon from "@mui/icons-material/Info";
import { CgExport, CgMediaLive } from "react-icons/cg";

import {
  Tooltip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  useMediaQuery,
  Typography,
  Link,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridDensity,
  GridRenderCellParams,
  GridSortModel,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import ConnectionStatusFeedBack from "../../ConnectionStatusFeedBack/ConnectionStatusFeedBack";
import { ThemeContext } from "../../../Context/ThemeContext";
import Box from "@mui/material/Box";
import OneHourCycleIcon from "../../OneHourCycleIcon/OneHourCycleIcon";

interface Props {
  portfolioValues: PortfolioGet[];
  onPortfolioDelete: (symbols: string[]) => void;
  onPortfolioUpdate: (
    updates: { symbol: string; favourite?: boolean; purchasePrice?: number }[]
  ) => void;
}

const ListPortfolio: React.FC<Props> = ({
  portfolioValues,
  onPortfolioDelete,
  onPortfolioUpdate,
}) => {
  const { mode } = useContext(ThemeContext);
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [selectionModel, setSelectionModel] = useState<string[]>([]);
  const [DeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [density, setDensity] = useState<GridDensity>("standard");

  const [sortField, setSortField] = useState<
    "purchasePrice" | "currentPrice" | "percentageChange"
  >("currentPrice");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortModel, setSortModel] = useState<GridSortModel>([]);

  useEffect(() => {
    setDensity(isSmallScreen ? "comfortable" : "standard");
  }, [isSmallScreen]);

  const handleSort = useCallback(
    (field: "purchasePrice" | "currentPrice" | "percentageChange") => {
      if (sortField === field) {
        const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
        setSortOrder(newSortOrder);
        setSortModel([{ field: "combinedData", sort: newSortOrder }]);
      } else {
        setSortField(field);
        setSortOrder("asc");
        setSortModel([{ field: "combinedData", sort: "asc" }]);
      }
    },
    [sortField, sortOrder]
  );

  const rows = useMemo(() => {
    return portfolioValues.map((item) => ({
      id: item.id.toString(),
      symbol: item.symbol,
      companyName: item.companyName,
      purchasePrice: item.purchasePrice,
      currentPrice: item.currentPrice,
      favourite: item.favourite,
      percentageChange: parseFloat(
        (
          ((item.currentPrice - item.purchasePrice) / item.purchasePrice) *
          100
        ).toFixed(2)
      ),
    }));
  }, [portfolioValues]);

  const columns: GridColDef[] = useMemo(() => {
    if (isSmallScreen) {
      return [
        {
          field: "symbol",
          headerName: "Symbol",
          headerAlign: "left",

          flex: 1,
          headerClassName: "super-app-theme--header",
          renderCell: (params: GridRenderCellParams) => (
            <Tooltip title={params.row.companyName} arrow placement="bottom">
              <div className="flex flex-col relative">
                <Link
                  href={`/stocks/company/${params.value}/company-profile`}
                  className="!text-blue-600 dark:!text-blue-400 hover:underline flex flex-row items-center h-8 truncate ... !text-xs md:!text-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Go to ${params.value} company profile`}
                  aria-describedby={`Go to ${params.value} company profile`}
                >
                  <FaStar
                    size="10"
                    className={
                      "!text-yellow-500 !text-sm !min-w-3 " +
                      (params.row.favourite ? "flex" : "hidden")
                    }
                  />
                  {params.value}
                </Link>

                <span className=" text-xs text-black dark:text-gray-300 truncate max-w-[180px]">
                  {params.row.companyName}
                </span>
              </div>
            </Tooltip>
          ),
        },
        {
          field: "companyName",
          headerName: "Company Name",
          headerClassName: "super-app-theme--header",
          renderCell: (params: GridRenderCellParams) => (
            <Tooltip title={params.value} arrow placement="bottom">
              <span className="text-xs text-gray-400  truncate max-w-[180px]">
                {params.value}
              </span>
            </Tooltip>
          ),
        },
        {
          field: "combinedData",
          headerName: "",
          flex: 2,
          align: "right",
          headerAlign: "right",
          menu: false,
          maxWidth: 130,
          sortable: true,
          sortingOrder: ["desc", "asc"],
          disableColumnMenu: true,
          headerClassName: "super-app-theme--header",

          renderHeader: () => {
            const getHeaderClass = (fieldName: string) => {
              return sortField === fieldName
                ? "font-bold cursor-pointer !bg-gray-300 dark:!bg-gray-800 dark:!border-white !border-black"
                : "cursor-pointer";
            };

            return (
              <div className="flex flex-col items-end text-xs">
                <Button
                  variant="outlined"
                  size="small"
                  fullWidth
                  onClick={() => {
                    if (sortField !== "purchasePrice")
                      handleSort("purchasePrice");
                  }}
                  sx={{ "& .MuiButton-endIcon": { marginRight: "0px" } }}
                  className={
                    "!px-[2px] !py-[2px] !text-[8px] !m-0 !rounded-none dark:!border-white dark:!text-white " +
                    getHeaderClass("purchasePrice")
                  }
                  startIcon={<FaBookmark size={"8px"} />}
                >
                  Saved Price
                </Button>
                <Button
                  sx={{ "& .MuiButton-endIcon": { marginRight: "0px" } }}
                  variant="outlined"
                  size="small"
                  fullWidth
                  onClick={() => {
                    if (sortField !== "currentPrice")
                      handleSort("currentPrice");
                  }}
                  className={
                    "!px-[2px] !py-[2px] !text-[8px] !m-0 !rounded-none dark:!border-white dark:!text-white " +
                    getHeaderClass("currentPrice")
                  }
                  startIcon={<CgMediaLive className="!mr-auto" size={"8px"} />}
                >
                  Now Price
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  fullWidth
                  onClick={() => {
                    if (sortField !== "percentageChange")
                      handleSort("percentageChange");
                  }}
                  className={
                    "!px-[2px] !py-[2px] !text-[8px] !m-0 !rounded-none dark:!border-white dark:!text-white " +
                    getHeaderClass("percentageChange")
                  }
                >
                  % Change
                </Button>
              </div>
            );
          },
          sortComparator: (v1, v2, params1, params2) => {
            const row1 = params1.api.getRow(params1.id);
            const row2 = params2.api.getRow(params2.id);

            if (!row1 || !row2) {
              return 0;
            }

            const a = row1[sortField];
            const b = row2[sortField];

            if (a == null || b == null) {
              return 0;
            }

            return sortOrder === "asc" ? a - b : b - a;
          },
          renderCell: (params: GridRenderCellParams) => {
            const purchasePrice = params.row.purchasePrice as number;
            const currentPrice = params.row.currentPrice as number;
            const percentageChange = params.row.percentageChange as number;

            let colorClass = "text-gray-700";
            if (percentageChange > 0) {
              colorClass = "text-green-800";
            } else if (percentageChange < 0) {
              colorClass = "text-red-800";
            }
            if (mode === "dark") {
              if (percentageChange > 0) {
                colorClass = "text-green-400";
              } else if (percentageChange < 0) {
                colorClass = "text-red-400";
              } else {
                colorClass = "text-gray-400";
              }
            }

            const normalTextClass =
              mode === "dark" ? "text-gray-200" : "text-gray-800";

            return (
              <div className="flex flex-col max-h-full items-end py-1 gap-y-2 ">
                <span
                  className={
                    "flex flex-row leading-none text-xs " + normalTextClass
                  }
                >
                  {purchasePrice.toFixed(2)} <FaBookmark />
                </span>
                <span
                  className={
                    "flex flex-row leading-none text-xs " + normalTextClass
                  }
                >
                  {currentPrice.toFixed(2)} <CgMediaLive />
                </span>
                <span className={"leading-none " + colorClass}>
                  {percentageChange > 0 && "+"}
                  {percentageChange}%
                </span>
              </div>
            );
          },
        },
      ];
    } else {
      return [
        {
          field: "symbol",
          headerName: "Symbol",
          headerAlign: "left",
          flex: 1,
          headerClassName: "super-app-theme--header",
          renderCell: (params: GridRenderCellParams) => (
            <Tooltip title={params.row.companyName} arrow placement="bottom">
              <div className="flex flex-col relative">
                <Link
                  href={`/stocks/company/${params.value}/company-profile`}
                  className="!text-blue-600 dark:!text-blue-400 hover:underline flex flex-row items-center h-8 truncate ... !text-xs md:!text-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaStar
                    size="10"
                    className={
                      "!text-yellow-500 !text-sm !min-w-3 " +
                      (params.row.favourite ? "flex" : "hidden")
                    }
                  />
                  {params.value}
                </Link>

                <span className="text-xs text-black dark:text-gray-300 truncate max-w-[180px]">
                  {params.row.companyName}
                </span>
              </div>
            </Tooltip>
          ),
        },
        {
          field: "companyName",
          headerName: "Company Name",
          hidden: true,
          headerClassName: "super-app-theme--header",
          renderCell: (params: GridRenderCellParams) => (
            <Tooltip title={params.value} arrow placement="bottom">
              <span className="text-xs text-gray-400  truncate max-w-[180px]">
                {params.value}
              </span>
            </Tooltip>
          ),
        },
        {
          field: "purchasePrice",
          headerName: "Saved Price",
          flex: 1,
          type: "number",
          sortable: true,
          headerClassName: "super-app-theme--header",
          headerAlign: "center",
          renderCell: (params) => {
            const value = params.value as number;
            return (
              <span
                className={mode === "dark" ? "text-gray-200" : "text-gray-800"}
              >
                {value.toFixed(2)}
              </span>
            );
          },
        },
        {
          field: "currentPrice",
          headerName: "Current Price",
          flex: 1,
          type: "number",
          sortable: true,
          headerClassName: "super-app-theme--header",
          headerAlign: "center",
          renderHeader: () => {
            return (
              <Tooltip
                title="Current price updates every hour"
                arrow
                placement="bottom"
                className=""
              >
                <span className="text-inherit flex flex-row items-center space-x-1 ">
                  <OneHourCycleIcon />
                  <div className="font-normal truncate">Current Price</div>
                </span>
              </Tooltip>
            );
          },
          renderCell: (params) => {
            const value = params.value as number;
            return (
              <span
                className={mode === "dark" ? "text-gray-200" : "text-gray-800"}
              >
                {value.toFixed(2)}{" "}
                <Tooltip
                  title={value + " (updates every hour)"}
                  arrow
                  placement="bottom"
                  className=""
                >
                  <InfoIcon
                    fontSize="inherit"
                    className="text-gray-700 dark:text-gray-400"
                  />
                </Tooltip>
              </span>
            );
          },
        },
        {
          field: "percentageChange",
          headerName: "% Change",
          flex: 1,
          type: "number",
          sortable: true,
          headerClassName: "super-app-theme--header",
          headerAlign: "center",
          renderCell: (params) => {
            const value = params.value as number;
            let colorClass = "text-gray-800";
            if (value > 0) {
              colorClass = "text-green-800";
            } else if (value < 0) {
              colorClass = "text-red-800";
            }
            if (mode === "dark") {
              if (value > 0) {
                colorClass = "text-green-400";
              } else if (value < 0) {
                colorClass = "text-red-400";
              } else {
                colorClass = "text-gray-400";
              }
            }

            return (
              <span className={colorClass}>
                {value > 0 && "+"}
                {value}%
              </span>
            );
          },
        },
      ];
    }
  }, [mode, isSmallScreen, sortField, sortOrder, handleSort]);

  const getRowClassName = (params: {
    row: { favourite: boolean; percentageChange: number };
  }) => {
    let colorClass = "";
    if (params.row.favourite) {
      colorClass += " super-app-theme--favourite ";
    }

    if (params.row.percentageChange > 0) {
      colorClass += "super-app-theme--positive";
    } else if (params.row.percentageChange < 0) {
      colorClass += "super-app-theme--negative";
    } else if (params.row.percentageChange === 0) {
      colorClass += "super-app-theme--neutral";
    }

    return colorClass;
  };

  const handleDelete = () => {
    setDeleteDialogOpen(true);
  };

  const handleFavourite = (value: boolean) => {
    const updates = rows
      .filter((row) => selectionModel.includes(row.id.toString()))
      .map((row) => ({
        symbol: row.symbol,
        favourite: value,
      }));
    onPortfolioUpdate(updates);
  };

  const confirmDelete = () => {
    const symbolsToDelete = rows
      .filter((row) => selectionModel.includes(row.id.toString()))
      .map((row) => row.symbol);
    console.log("symbolsToDelete", symbolsToDelete);
    onPortfolioDelete(symbolsToDelete);
    setSelectionModel([]);
    setDeleteDialogOpen(false);
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
  };

  const customCheckboxStyles = {
    "& .MuiCheckbox-root svg": {
      width: 12,
      height: 12,
      backgroundColor: "transparent",
      border: "1px solid #9e9e9e",
      borderRadius: 0,
      ...(mode === "dark"
        ? {
            borderColor: "rgb(255, 255, 255)",
          }
        : { borderColor: "rgb(90, 90, 90)" }),
    },
    "& .MuiCheckbox-root svg path": {
      display: "none",
    },
    "& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg": {
      backgroundColor: "#1890ff",
      borderColor: "#1890ff",
    },
    "& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after": {
      position: "absolute",
      display: "table",
      border: "2px solid #fff",
      borderTop: 0,
      borderLeft: 0,
      transform: "rotate(45deg) translate(-50%,-50%)",
      opacity: 1,
      transition: "all .2s cubic-bezier(.12,.4,.29,1.46) .1s",
      content: '""',
      top: "50%",
      left: "39%",
      width: 5.71428571,
      height: 9.14285714,
    },
    "& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after":
      {
        width: 8,
        height: 8,
        backgroundColor: "#1890ff",
        transform: "none",
        top: "39%",
        border: 0,
      },
  };

  const csvOptions = {
    allColumns: true,
  };
  const printOptions = {
    disableToolbarButton: true,
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer className="bg-slate-300 dark:bg-slate-700 bg-opacity-80 p-3 !rounded-none">
        <div className="flex-grow">
          <GridToolbarQuickFilter
            placeholder="Search portfolio..."
            size="small"
            color="secondary"
            className="!text-white HELLO !w-full"
            sx={{
              "& .MuiInputBase-root": {
                color: mode === "dark" ? "#ffffff" : "#000000",
              },
              "& .MuiInput-underline:before": {
                borderBottomColor: mode === "dark" ? "#ffffff" : "#000000",
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: mode === "dark" ? "#ffffff" : "#000000",
              },
            }}
          />
        </div>
        <div className="mx-auto">
          <GridToolbarExport
            csvOptions={csvOptions}
            printOptions={printOptions}
            slotProps={{
              tooltip: { title: "Export data" },
              button: {
                startIcon: <CgExport className="" />,
                variant: "text",
                size: "small",
                sx: {
                  "& .MuiButton-startIcon": {
                    margin: "0px !important",
                  },
                },
                className:
                  "flex !min-w-0 !flex-col !items-center !justify-center !px-2 !py-0 !text-[7px] xs:!text-[10px] transition-colors duration-200 ease-in-out disabled:dark:!border-blue-950 disabled:!border-gray-300 disabled:dark:!text-white disabled:!text-gray-800 disabled:!text-opacity-30 disabled:cursor-not-allowed",
              },
            }}
          />

          <Tooltip title="Mark Selected as Favourite">
            <span>
              <Button
                size="small"
                variant="text"
                color="secondary"
                onClick={() => handleFavourite(true)}
                disabled={selectionModel.length === 0}
                className="flex !min-w-0 !flex-col !items-center !justify-center !px-2 !py-0 !text-[7px] xs:!text-[10px] transition-colors duration-200 ease-in-out disabled:dark:!border-blue-950 disabled:!border-gray-300 disabled:dark:!text-gray-500 disabled:!text-gray-800 disabled:!opacity-50 disabled:cursor-not-allowed"
              >
                <FaStar className="!text-sm !text-yellow-500" />
                <Typography
                  variant="inherit"
                  className="!text-[7px] xs:!text-[10px] xs:pl-1 !py-0"
                >
                  Mark
                </Typography>
              </Button>
            </span>
          </Tooltip>
          <Tooltip title="Unmark Selected as Favourite">
            <span>
              <Button
                variant="text"
                color="secondary"
                onClick={() => handleFavourite(false)}
                disabled={selectionModel.length === 0}
                className=" flex !min-w-0 !flex-col !items-center !justify-center !px-2 !py-0 !text-[7px] xs:!text-[10px] transition-colors duration-200 ease-in-out disabled:dark:!border-blue-950 disabled:!border-gray-300 disabled:dark:!text-gray-500 disabled:!text-gray-800 disabled:!opacity-50 disabled:cursor-not-allowed"
              >
                <FaRegStar className="!text-sm !text-yellow-500" />
                <Typography
                  variant="inherit"
                  className="!text-[7px] xs:!text-[10px] xs:pl-1 !py-0"
                >
                  UnMark
                </Typography>
              </Button>
            </span>
          </Tooltip>
          <Tooltip title="Delete Selected">
            <span>
              <Button
                size="small"
                variant="text"
                color="error"
                onClick={handleDelete}
                disabled={selectionModel.length === 0}
                className="flex !min-w-0 !flex-col !items-center !justify-center !px-2 !py-0 !text-[7px] xs:!text-[10px] transition-colors duration-200 ease-in-out disabled:dark:!border-blue-950 disabled:!border-gray-300 disabled:dark:!text-gray-500 disabled:!text-gray-800 disabled:!opacity-50 disabled:cursor-not-allowed"
              >
                <FaTrash className="!text-sm" />
                <Typography
                  variant="inherit"
                  className="!text-[7px] xs:!text-[10px] xs:pl-1 !py-0"
                >
                  Delete
                </Typography>
              </Button>
            </span>
          </Tooltip>
        </div>
      </GridToolbarContainer>
    );
  }

  return (
    <section id="portfolio" className="w-full h-[80vh]">
      <div className="flex flex-col sm:flex-row items-center justify-between bg-slate-500 dark:bg-slate-300 bg-opacity-80 p-3 rounded-t-xl">
        <div className="flex items-center">
          <FaBriefcase className="text-md text-blue-600 dark:text-blue-400 mr-2" />{" "}
          <h2 className="text-md font-semibold text-gray-300 dark:text-gray-800 flex items-center">
            My Portfolio
            <Tooltip
              title={`${portfolioValues.length} stocks in portfolio`}
              arrow
            >
              <span className="ml-2 text-md text-gray-600 dark:text-gray-500">
                ({portfolioValues.length})
              </span>
            </Tooltip>
          </h2>
        </div>
      </div>
      <div className="max-w-full mx-auto">
        <ConnectionStatusFeedBack />
      </div>
      {portfolioValues.length > 0 ? (
        <div className="w-full">
          <Box className="">
            <DataGrid
              disableColumnFilter
              disableColumnSelector
              ignoreDiacritics
              rows={rows}
              columns={columns}
              getRowClassName={getRowClassName}
              density={density}
              initialState={{
                pagination: { paginationModel: { pageSize: 20 } },
                columns: {
                  columnVisibilityModel: {
                    companyName: false,
                  },
                },
                filter: {
                  filterModel: {
                    items: [],
                    quickFilterExcludeHiddenColumns: false,
                  },
                },
              }}
              pageSizeOptions={[10, 20]}
              checkboxSelection
              disableRowSelectionOnClick
              onRowSelectionModelChange={(newSelection) => {
                setSelectionModel(newSelection as string[]);
              }}
              rowSelectionModel={selectionModel}
              slots={{ toolbar: CustomToolbar }}
              sortModel={sortModel}
              onSortModelChange={(model) => {
                console.log("model is", model);
                setSortModel(model);
              }}
              sx={{
                maxHeight: "calc(80vh - 4rem)",
                height: "fit-content",
                width: "100%",
                "--DataGrid-containerBackground":
                  mode === "dark"
                    ? "rgba(55, 65, 81, 1)"
                    : "rgba(229, 231, 235, 1)",
                "& .MuiDataGrid-main": {
                  backgroundColor:
                    mode === "dark"
                      ? "rgba(0, 0, 0, 0.8)"
                      : "rgba(0, 0, 0, 0.1)",
                  // mode === "dark" ? "rgba(0, 0, 0, 0.6)" : "#f9fafb",
                },
                "& .super-app-theme--header": {
                  backgroundColor:
                    mode === "dark"
                      ? "rgba(55, 65, 81, 1)"
                      : "rgba(229, 231, 235, 1)",
                  color: mode === "dark" ? "#ffffff" : "#000000",
                  fontWeight: "bold",
                  textAlign: "center",
                },
                "& .super-app-theme--favourite": {
                  boxShadow:
                    mode === "dark"
                      ? "rgba(255,255,0,0.3) 0px 10px 20px -62px inset, rgba(255,255,0,0.3) 0px 18px 36px -18px inset"
                      : "rgba(255,255,0,0.3) 0px 10px 20px -62px inset, rgba(255,255,0,0.3) 0px 18px 36px -18px inset",
                },
                "& .super-app-theme--positive": {
                  backgroundColor:
                    mode === "dark"
                      ? "rgba(16, 185, 129, 0.2)"
                      : "rgba(16, 185, 129, 0.2)",
                },
                "& .super-app-theme--positive:hover": {
                  backgroundColor:
                    mode === "dark"
                      ? "rgba(16, 185, 129, 0.4)"
                      : "rgba(16, 185, 129, 0.4)",
                },
                "& .super-app-theme--negative": {
                  backgroundColor:
                    mode === "dark"
                      ? "rgba(239, 68, 68, 0.1)"
                      : "rgba(239, 68, 68, 0.1)",
                },
                "& .super-app-theme--negative:hover": {
                  backgroundColor:
                    mode === "dark"
                      ? "rgba(239, 68, 68, 0.4)"
                      : "rgba(239, 68, 68, 0.4)",
                },
                "& .super-app-theme--neutral": {
                  backgroundColor:
                    mode === "dark"
                      ? "rgba(20, 21, 21, 0.1)"
                      : "rgba(20, 21, 21, 0.1)",
                },
                "& .super-app-theme--neutral:hover": {
                  backgroundColor:
                    mode === "dark"
                      ? "rgba(20, 21, 21, 1)"
                      : "rgba(20, 21, 21, 0.4)",
                },
                "& .MuiDataGrid-footerContainer": {
                  backgroundColor:
                    mode === "dark"
                      ? "rgba(55, 65, 81, 1) "
                      : "rgba(229, 231, 235, 1) ",
                  color: mode === "dark" ? "#ffffff" : "#000000",
                },

                "& .Mui-selected": {
                  backgroundColor:
                    mode === "dark"
                      ? "rgba(173, 216, 230, 0.3) !important" // Light blue for dark mode
                      : "rgba(173, 216, 230, 0.5) !important", // Light blue for light mode
                },
                // Checkbox Styles
                ...customCheckboxStyles,
                // Remove Icon Separators
                "& .MuiDataGrid-iconSeparator": {
                  display: "none",
                },
              }}
            />
          </Box>

          <Dialog
            open={DeleteDialogOpen}
            onClose={cancelDelete}
            aria-labelledby="delete-dialog-title"
            aria-describedby="delete-dialog-description"
          >
            <DialogTitle id="delete-dialog-title">Confirm Deletion</DialogTitle>
            <DialogContent>
              <DialogContentText id="delete-dialog-description">
                Are you sure you want to delete the selected stock(s) from your
                portfolio?
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
        </div>
      ) : (
        <h2 className="text-xl font-semibold text-center text-gray-600 dark:text-gray-300 h-fit mt-5">
          Your portfolio is empty.
        </h2>
      )}
    </section>
  );
};

export default ListPortfolio;
