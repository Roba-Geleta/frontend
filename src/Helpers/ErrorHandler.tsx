import axios from "axios";
import { toast } from "react-toastify";

export const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    console.log(error.response);
    const err = error.response;
    if (Array.isArray(err?.data)) {
      for (const val of err.data) {
        toast.warning(val.description);
      }
    } else if (Array.isArray(err?.data.errors)) {
      for (const val of err.data.errors) {
        toast.warning(val.description);
      }
    } else if (typeof err?.data.errors === "object") {
      for (const e in err?.data.errors) {
        toast.warning(err.data.errors[e][0]);
      }
    } else if (err?.data) {
      toast.warning(err.data);
    } else if (err?.status == 401) {
      toast.warning("Please login");
      window.history.pushState({}, "LoginPage", "/login");
    } else if (err) {
      toast.warning(err?.data);
    }
  } else {
    toast.warning("An error occurred");
  }
};
