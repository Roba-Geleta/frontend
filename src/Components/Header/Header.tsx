import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaChartLine,
  FaBalanceScale,
  FaCashRegister,
} from "react-icons/fa";

interface Props {}

const Header = (props: Props) => {
  // Define the navigation items in an array for easier management
  const navItems = [
    {
      to: "company-profile",
      icon: <FaHome className="mr-1" />,
      label: "Company Profile",
    },
    {
      to: "income-statement",
      icon: <FaChartLine className="mr-1" />,
      label: "Income Statement",
    },
    {
      to: "balance-sheet",
      icon: <FaBalanceScale className="mr-1" />,
      label: "Balance Sheet",
    },
    {
      to: "cashflow-statement",
      icon: <FaCashRegister className="mr-1" />,
      label: "Cashflow Statement",
    },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md rounded-b">
      <div className="container mx-auto px-2 sm:px-4">
        {/* Flex container with responsive padding */}
        <div className="flex items-center justify-center py-2">
          {/* Navigation Links Container */}
          <div className="flex flex-wrap w-full">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex-1 flex items-center justify-center px-2 sm:px-4 py-2 m-1 border border-gray-200 dark:border-gray-700 rounded-md text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors ${
                    isActive
                      ? "border-blue-700 text-blue-600 dark:border-blue-500"
                      : "border-gray-200 dark:border-gray-700"
                  }`
                }
              >
                {item.icon}
                <span className="whitespace-nowrap ">{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
