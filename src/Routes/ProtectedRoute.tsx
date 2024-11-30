import React from "react";
import { useAuth } from "../Context/userAuth";
import { BarLoader } from "react-spinners";
import { Navigate, useLocation } from "react-router-dom";

type Props = { children: React.ReactNode };

const ProtectedRoute = ({ children }: Props) => {
  const location = useLocation();

  const { user, authLoading } = useAuth();

  if (authLoading) {
    // Authentication is in progress
    return (
      <div className="w-full h-full flex items-center justify-center">
        <BarLoader />
      </div>
    );
  }

  if (!user) {
    // User is not authenticated
    return (
      <Navigate
        to={`/stocks/login?redirect=${encodeURIComponent(
          location.pathname + location.search
        )}`}
        replace
      />
    );
  }

  // User is authenticated
  return children;
};

export default ProtectedRoute;
