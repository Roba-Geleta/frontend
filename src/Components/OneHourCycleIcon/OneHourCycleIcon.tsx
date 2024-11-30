import React from "react";
import { IoIosSync } from "react-icons/io";

import { useContext } from "react";
import { ThemeContext } from "../../Context/ThemeContext";

const OneHourCycleIcon: React.FC = () => {
  const { mode } = useContext(ThemeContext);

  return (
    <div className="relative flex items-center justify-center ml-1 w-8 h-8">
      <IoIosSync
        className={`absolute top-[-3px] left-[-5px] inset-0 opacity-50 ${
          mode === "dark" ? "text-gray-400" : "text-gray-500"
        }`}
        size={26}
      />
      <span
        className={`relative text-xs ${
          mode === "dark" ? "text-white" : "text-black"
        }`}
      >
        1hr
      </span>
    </div>
  );
};

export default OneHourCycleIcon;
