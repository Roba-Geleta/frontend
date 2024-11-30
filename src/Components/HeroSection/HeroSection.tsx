import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Hero from "../../assets/StocksHome/Hero.svg";

interface HeroSectionProps {
  isLoggedIn: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ isLoggedIn }) => {
  return (
    <section className="text-gray-600 body-font shadow-xl dark:shadow-gray-700 bg-[#f8f4e1] dark:bg-gray-900 !bg-opacity-90 rounded-lg">
      <div className="mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-12 md:pr-8 md:px-10 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-5xl text-4xl mb-4 font-bold text-gray-900 dark:text-white">
            Empower Your Investment Decisions
          </h1>
          <p className="mb-8 leading-relaxed text-gray-700 dark:text-gray-300">
            Manage your stock portfolio across all exchanges, access detailed
            financial reports, and stay ahead with the latest market insights.
          </p>
          <div className="flex justify-center">
            <Link to={isLoggedIn ? "/stocks/portfolio" : "/stocks/login"}>
              <Button
                variant="contained"
                color="secondary"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
        <div className="!w-full h-full">
          <img
            className="object-cover object-center"
            alt="Platform Screenshot"
            src={Hero}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
