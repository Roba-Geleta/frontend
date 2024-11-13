import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  IconButton,
  Tooltip,
  CircularProgress,
  InputAdornment,
  OutlinedInput,
  FormControl,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../Context/userAuth";
import { useForm } from "react-hook-form";

type RegisterFormsInputs = {
  email: string;
  userName: string;
  password: string;
};

const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

const validation = Yup.object().shape({
  email: Yup.string()
    .matches(emailRegex, "Must be a valid email")
    .required("Email is required"),
  userName: Yup.string().required("Username is required"),
  password: Yup.string()
    .required("Password is required")
    .min(12, "Password must be at least 12 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one digit")
    .matches(/\W/, "Password must contain at least one special character"),
});

const RegisterPage = () => {
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<RegisterFormsInputs>({
    resolver: yupResolver(validation),
  });

  // State for Password Visibility
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // State to track if password field has been interacted with
  const [passwordTouched, setPasswordTouched] = useState<boolean>(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  // Watch password field for real-time validation
  const passwordValue = watch("password", "");

  // Function to check password requirements
  const checkPasswordRequirements = (password: string) => {
    return {
      length: password.length >= 12,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      digit: /\d/.test(password),
      specialChar: /\W/.test(password),
    };
  };

  const passwordRequirements = checkPasswordRequirements(passwordValue);

  const handleRegister = async (form: RegisterFormsInputs) => {
    const success = await registerUser(
      form.email,
      form.userName,
      form.password
    );
    if (success) {
      navigate("/stocks", { replace: true });
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
              Create Your Account
            </Typography>
            <Tooltip
              title="Currently, the Account system is used to interact with the Financial Modeling Prep (FMP) API and to store/manage stock portfolios and comments."
              arrow
              placement="right"
            >
              <InfoOutlinedIcon
                className="text-gray-500 dark:text-gray-400 ml-1 cursor-pointer"
                aria-label="Information"
              />
            </Tooltip>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(handleRegister)}>
            <div>
              <Typography
                component="label"
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </Typography>
              <OutlinedInput
                id="email"
                type="email"
                placeholder="Email"
                fullWidth
                {...register("email")}
                disabled={isSubmitting}
                error={!!errors.email}
                autoComplete="email"
                className={`bg-gray-50 dark:bg-gray-700 dark:text-white text-gray-900  ${
                  errors.email
                    ? "border-red-500 dark:border-red-400"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              />
              {errors.email && (
                <Typography variant="body2" color="error" className="mt-1">
                  {errors.email.message}
                </Typography>
              )}
            </div>
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
                type="text"
                placeholder="Username"
                fullWidth
                {...register("userName")}
                disabled={isSubmitting}
                error={!!errors.userName}
                autoComplete="username"
                className={`bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white ${
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
                  autoComplete="new-password"
                  onFocus={() => setPasswordTouched(true)}
                  onChange={(e) => {
                    register("password").onChange(e);
                    if (!passwordTouched) setPasswordTouched(true);
                  }}
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
              {passwordTouched && (
                <Box className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  <Typography>Password must contain:</Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        {passwordRequirements.length ? (
                          <CheckCircleIcon className="text-green-500" />
                        ) : (
                          <CancelIcon className="text-red-500" />
                        )}
                      </ListItemIcon>
                      <ListItemText primary="At least 12 characters" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        {passwordRequirements.lowercase ? (
                          <CheckCircleIcon className="text-green-500" />
                        ) : (
                          <CancelIcon className="text-red-500" />
                        )}
                      </ListItemIcon>
                      <ListItemText primary="One lowercase letter" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        {passwordRequirements.uppercase ? (
                          <CheckCircleIcon className="text-green-500" />
                        ) : (
                          <CancelIcon className="text-red-500" />
                        )}
                      </ListItemIcon>
                      <ListItemText primary="One uppercase letter" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        {passwordRequirements.digit ? (
                          <CheckCircleIcon className="text-green-500" />
                        ) : (
                          <CancelIcon className="text-red-500" />
                        )}
                      </ListItemIcon>
                      <ListItemText primary="One number" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        {passwordRequirements.specialChar ? (
                          <CheckCircleIcon className="text-green-500" />
                        ) : (
                          <CancelIcon className="text-red-500" />
                        )}
                      </ListItemIcon>
                      <ListItemText primary="One special character" />
                    </ListItem>
                  </List>
                </Box>
              )}
            </div>
            <button
              type="submit"
              className="w-full text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 transition duration-200 flex items-center justify-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <CircularProgress size={20} className="mr-2" />
                  Signing up...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
            <Typography
              variant="body2"
              className="text-sm font-light text-gray-500 dark:text-gray-400 text-center"
            >
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Sign in
              </Link>
            </Typography>
          </form>
        </div>
      </Container>
    </section>
  );
};

export default RegisterPage;
