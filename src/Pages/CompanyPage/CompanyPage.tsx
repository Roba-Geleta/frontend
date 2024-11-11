import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CompanyProfile } from "../../company";
import { getCompanyProfile } from "../../api";
import Header from "../../Components/Header/Header";
import CompanyDashboard from "../../Components/CompanyDashboard/CompanyDashboard";
import Tile from "../../Components/Tile/Tile";
import TenKFinder from "../../Components/TenKFinder/TenKFinder";
import ReadMore from "../../Components/ReadMore/ReadMore";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ConnectionStatusFeedBack from "../../Components/ConnectionStatusFeedBack/ConnectionStatusFeedBack";
import { BarLoader } from "react-spinners";
import ConstructionIcon from "@mui/icons-material/Construction";

const CompanyPage = () => {
  const { ticker } = useParams();
  const [company, setCompany] = useState<CompanyProfile>();

  useEffect(() => {
    const getProfileInit = async () => {
      const result = await getCompanyProfile(ticker!);
      setCompany(result[0]);
      console.log(result[0]);
    };
    getProfileInit();
  }, [ticker]);

  // Function to format DCF value
  const formatDecimal = (num: number) => {
    return num.toFixed(2);
  };

  return (
    <>
      {/* Go Back Button */}
      <div className="px-4 py-2 flex items-center">
        <Link to="/stocks" className="flex items-center">
          <IconButton edge="start" aria-label="go back" color="inherit">
            <ArrowBackIcon className="text-gray-700 dark:text-gray-300" />
          </IconButton>
          <Typography
            variant="body1"
            className="ml-1 text-gray-700 dark:text-gray-300 font-semibold"
          >
            My Portfolio
          </Typography>
        </Link>
      </div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
        className="w-full flex items-center justify-center"
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

      <div className="max-w-[30rem] mx-auto">
        <ConnectionStatusFeedBack />
      </div>

      {company ? (
        <div className="w-full">
          <CompanyDashboard ticker={ticker!}>
            {/* Tiles */}
            <Box className="w-full flex flex-wrap mx-4 flex-grow justify-center">
              <Tile title="Company Name" subTitle={company.companyName} />
              <Tile
                title="Price"
                subTitle={`$${formatDecimal(company.price)}`}
              />
              <Tile title="DCF" subTitle={`$${formatDecimal(company.dcf)}`} />
              <Tile title="Sector" subTitle={company.sector} />
            </Box>
            {/* TenKFinder */}
            <TenKFinder ticker={company.symbol} />
            <div className="bg-white dark:bg-gray-800 shadow rounded-t text-medium text-gray-900 dark:text-gray-100 p-6 mt-4 mx-4">
              <h3 className="text-xl font-semibold">Company Description</h3>
              <ReadMore text={company.description} maxCharacters={300} />
            </div>
            <div className="w-full px-4">
              <Divider className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" />
              <Header />
            </div>
          </CompanyDashboard>
        </div>
      ) : (
        <BarLoader />
      )}
    </>
  );
};

export default CompanyPage;
