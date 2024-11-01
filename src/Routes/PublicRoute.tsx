import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/userAuth";

type PublicRouteProps = {
  children: React.ReactNode;
};

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Navigate to="/" replace /> : <>{children}</>;
};

export default PublicRoute;
