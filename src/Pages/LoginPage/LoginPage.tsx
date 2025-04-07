import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  IconButton,
  Tooltip,
  CircularProgress,
  InputAdornment,
  OutlinedInput,
  FormControl,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../Context/userAuth";
import { useForm } from "react-hook-form";
import usePageMeta from "../../hooks/usePageMeta/usePageMeta";

type LoginFormsInputs = {
  userName: string;
  password: string;
};

const validation = Yup.object().shape({
  userName: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const LoginPage = () => {
  const FIPLogoIconDark =
    "https://my-r2-proxy.geletaroba.workers.dev/assets/FIPLogoIconDark.svg";
  usePageMeta({
    title: "FIP - Login",
    favicon: FIPLogoIconDark,
  });
  const { loginUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormsInputs>({
    resolver: yupResolver(validation),
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  // Determine redirect path
  const params = new URLSearchParams(location.search);
  const redirectPath = params.get("redirect");
  const stateRedirect = (location.state as { from?: string })?.from;
  const from = redirectPath || stateRedirect || "/stocks";

  const handleLogin = async (form: LoginFormsInputs) => {
    const success = await loginUser(form.userName, form.password);
    if (success) {
      if (redirectPath) {
        window.location.href = redirectPath;
      } else {
        navigate(from, { replace: true });
      }
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 rounded-xl bg-opacity-50 border-[1px] min-h-screen flex items-center justify-center">
      <Container maxWidth="sm">
        <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
          <div className="text-center">
            <Typography
              variant="h4"
              className="text-gray-900 dark:text-white font-bold"
            >
              Login to your account
            </Typography>
            <Tooltip
              title="Currently, the Account system is used to interact with the Financial Modeling Prep API and to store/manage stock portfolios and comments."
              arrow
              placement="right"
            >
              <InfoOutlinedIcon className="text-gray-500 dark:text-gray-400 ml-1 cursor-pointer" />
            </Tooltip>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>
            <div>
              <Typography
                component="label"
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Username
              </Typography>
              <OutlinedInput
                id="username"
                placeholder="Username"
                fullWidth
                {...register("userName")}
                disabled={isSubmitting}
                error={!!errors.userName}
                autoComplete="username"
                className={`bg-gray-50 dark:bg-gray-700 dark:text-white text-gray-900  ${
                  errors.userName
                    ? "border-red-500 dark:border-red-400"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              />
              {errors.userName && (
                <Typography variant="body2" color="error" className="mt-1">
                  {errors.userName.message}
                </Typography>
              )}
            </div>
            <div>
              <Typography
                component="label"
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </Typography>
              <FormControl variant="outlined" fullWidth>
                <OutlinedInput
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password")}
                  disabled={isSubmitting}
                  error={!!errors.password}
                  autoComplete="current-password"
                  className={`bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white ${
                    errors.password
                      ? "border-red-500 dark:border-red-400"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {errors.password && (
                  <Typography variant="body2" color="error" className="mt-1">
                    {errors.password.message}
                  </Typography>
                )}
              </FormControl>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 transition duration-200 flex items-center justify-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <CircularProgress size={20} className="mr-2" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
            <Typography
              variant="body2"
              className="text-sm font-light text-gray-500 dark:text-gray-400 text-center"
            >
              Don’t have an account yet?{" "}
              <Link
                to="/stocks/register"
                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Register
              </Link>
            </Typography>
          </form>
        </div>
      </Container>
    </section>
  );
};

export default LoginPage;
