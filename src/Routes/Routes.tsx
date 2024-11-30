import { createBrowserRouter } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import PortfolioPage from "../Pages/PortfolioPage/PortfolioPage";
import CompanyPage from "../Pages/CompanyPage/CompanyPage";
import CompanyProfile from "../Components/CompanyProfile/CompanyProfile";
import IncomeStatement from "../Components/IncomeStatement/IncomeStatement";
import BalanceSheet from "../Components/BalanceSheet/BalanceSheet";
import CashflowStatement from "../Components/CashflowStatement/CashflowStatement";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import Credits from "../Pages/Credits/Credits";
import PublicRoute from "./PublicRoute";
import StocksHomePage from "../Pages/StocksHomePage/StocksHomePage";
import StocksLayout from "../Layout/StocksLayout/StocksLayout";
import MainLayout from "../Layout/MainLayout/MainLayout";
import { UserProvider } from "../Context/userAuth";
import RouteError from "../Components/RouteError.tsx/RouteError";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "credits",
        element: <Credits />,
      },
      // {
      //   path: "*",
      //   element: <Navigate to="/" replace />,
      // },
    ],
  },
  {
    path: "/stocks",
    element: (
      <UserProvider>
        <StocksLayout />
      </UserProvider>
    ),
    errorElement: <RouteError />,
    children: [
      {
        index: true,
        element: <StocksHomePage />,
      },
      {
        path: "portfolio",
        element: (
          <ProtectedRoute>
            <PortfolioPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "company/:ticker",
        element: (
          <ProtectedRoute>
            <CompanyPage />
          </ProtectedRoute>
        ),
        errorElement: <RouteError />,

        children: [
          { path: "company-profile", element: <CompanyProfile /> },
          { path: "income-statement", element: <IncomeStatement /> },
          { path: "balance-sheet", element: <BalanceSheet /> },
          { path: "cashflow-statement", element: <CashflowStatement /> },
        ],
      },
      {
        path: "login",
        element: (
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        ),
      },
      {
        path: "register",
        element: (
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <RouteError />,
  },
]);
