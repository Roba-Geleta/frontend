import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/userAuth";
import { BarLoader } from "react-spinners";

type PublicRouteProps = {
  children: React.ReactNode;
};

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { user, authLoading } = useAuth();

  if (authLoading) {
    // Authentication is in progress
    return (
      <div className="w-full h-full flex items-center justify-center">
        <>
          <BarLoader />
          Loading...
        </>
      </div>
    );
  }

  if (user) {
    // User is authenticated, redirect to home or another page
    return <Navigate to="/" replace />;
  }

  // User is not authenticated
  return children;
};

export default PublicRoute;
