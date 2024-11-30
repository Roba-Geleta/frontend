/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { toast } from "react-toastify";

const PUBLIC_ROUTES = [
  "/",
  "/stocks",
  "/credits",
  "/stocks/login",
  "/stocks/register",
];

export const handleError = (error: unknown) => {
  const currentPath = window.location.pathname;
  if (!["/"].includes(currentPath)) {
    if (axios.isAxiosError(error)) {
      const err = error.response;
      console.log("error is", err);
      if (err) {
        // Handle specific status codes
        switch (err.status) {
          case 400:
            handleBadRequest(err.data);
            break;
          case 401:
            console.log("401 error", err);
            handleUnauthorizedError(err);
            break;
          case 403:
            toast.warning("Access denied");
            break;
          case 404:
            toast.warning("Resource not found");
            break;
          case 500:
            handleServerError(err.data);
            break;
          default:
            handleUnknownError(err);
            break;
        }
      } else if (error.message) {
        // No response from server
        toast.error(`Connection Error: ${error.message}`, {
          toastId: "network-error",
        });
      } else {
        // Unknown Axios error
        toast.error("An unknown error occurred.");
      }
    } else if (error instanceof Error) {
      // Non-Axios errors
      toast.warning(error.message);
    } else {
      // Completely unknown errors
      toast.warning("An unexpected error occurred.");
    }
  }
};

// Helper function to handle 400 Bad Request errors
interface BadRequestData {
  errors?: Record<string, string[] | string>;
  title?: string;
  detail?: string;
  [key: string]: any;
}

const handleBadRequest = (data: BadRequestData) => {
  if (data) {
    if (typeof data === "string") {
      // Simple error message
      toast.warning(data);
    } else if (typeof data === "object") {
      if (data.errors) {
        // ModelState errors from ASP.NET Core
        handleValidationErrors(data.errors);
      } else if (data.title && data.detail) {
        // Problem details object
        toast.warning(`${data.title}: ${data.detail}`);
      } else {
        // Other object format
        for (const key in data) {
          const value = data[key];
          if (typeof value === "string") {
            toast.warning(value);
          } else if (Array.isArray(value)) {
            value.forEach((message: string) => {
              toast.warning(message);
            });
          } else if (typeof value === "object" && value !== null) {
            if (Array.isArray(value.errors)) {
              // Handle nested errors
              value.errors.forEach((errorObj: any) => {
                if (errorObj.errorMessage) {
                  toast.warning(errorObj.errorMessage);
                } else if (typeof errorObj === "string") {
                  toast.warning(errorObj);
                }
              });
            } else if (typeof value === "object") {
              // In case of nested objects, we can recursively call handleBadRequest
              handleBadRequest(value);
            }
          }
        }
      }
    } else {
      // Unhandled data type
      toast.warning("Bad Request");
    }
  } else {
    // No data in response
    toast.warning("Bad Request");
  }
};

// Helper function to handle 401 Unauthorized errors
const handleUnauthorizedError = (err: any) => {
  const currentPath = window.location.pathname;
  if (err.data && typeof err.data === "string") {
    // Display the error message from the server
    toast.error(err.data);
  } else {
    if (!PUBLIC_ROUTES.includes(currentPath)) {
      toast.warning("Please login", {
        toastId: "unauthorized",
        autoClose: 1000,
      });
    }
  }
};

// Helper function to handle validation errors
const handleValidationErrors = (errors: Record<string, string[] | string>) => {
  for (const key in errors) {
    const errorMessages = errors[key];
    if (Array.isArray(errorMessages)) {
      errorMessages.forEach((message: string) => {
        toast.warning(message);
      });
    } else if (typeof errorMessages === "string") {
      toast.warning(errorMessages);
    }
  }
};

// Helper function to handle 500 Internal Server Error
const handleServerError = (data: any) => {
  if (data && typeof data === "string") {
    toast.error(data);
  } else if (data && typeof data === "object" && data.message) {
    toast.error(data.message);
  } else {
    toast.error("An unexpected server error occurred.");
  }
};

// Helper function to handle unknown errors
const handleUnknownError = (err: { data?: string; statusText?: string }) => {
  if (err.data && typeof err.data === "string") {
    toast.warning(err.data);
  } else if (err.statusText) {
    toast.warning(err.statusText);
  } else {
    toast.warning("An error occurred");
  }
};
