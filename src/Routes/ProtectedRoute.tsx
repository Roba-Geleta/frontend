import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/userAuth";
import { BarLoader } from "react-spinners";

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
        to="/login"
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }

  // User is authenticated
  return children;
};

export default ProtectedRoute;
