import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const GetStartedSection: React.FC = () => {
  return (
    <section className="text-gray-600 body-font !z-10 shadow-xl dark:shadow-gray-700 bg-[#e6f8e1] dark:bg-[#353d33] !bg-opacity-80 rounded-lg">
      <div className="container mx-auto flex px-5 py-10 items-center justify-center flex-col">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
          Take Control of Your Investments Today
        </h2>
        <p className="mb-8 leading-relaxed text-gray-700 dark:text-gray-300 text-center">
          Sign up to start building your portfolio, access in-depth financial
          reports, and stay ahead with the latest market insights.
        </p>
        <Link to="/stocks/register">
          <Button
            variant="contained"
            color="primary"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
          >
            Register Now
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default GetStartedSection;
