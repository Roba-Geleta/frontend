import React from "react";
import { useRouteError } from "react-router-dom";

const RouteError: React.FC = () => {
  const error = useRouteError();
  console.error("error here", error);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">
          404 - Page Not Found
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          The page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
};

export default RouteError;
