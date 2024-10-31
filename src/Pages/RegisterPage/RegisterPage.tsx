import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../Context/userAuth";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Tooltip from "@mui/material/Tooltip";

type RegisterFormsInputs = {
  email: string;
  userName: string;
  password: string;
};

const validation = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid email")
    .required("Email is required"),
  userName: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const RegisterPage = () => {
  const { registerUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormsInputs>({
    resolver: yupResolver(validation),
  });

  const handleRegister = (form: RegisterFormsInputs) => {
    registerUser(form.email, form.userName, form.password);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 rounded-xl bg-opacity-50 border-[1px] min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Create Your Account
          </h1>
          {/* Info Icon with Tooltip */}
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
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className={`bg-gray-50 border ${
                errors.email
                  ? "border-red-500 dark:border-red-400"
                  : "border-gray-300 dark:border-gray-600"
              } text-gray-900 dark:text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700`}
              placeholder="Email"
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>
          {/* Username Field */}
          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className={`bg-gray-50 border ${
                errors.userName
                  ? "border-red-500 dark:border-red-400"
                  : "border-gray-300 dark:border-gray-600"
              } text-gray-900 dark:text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700`}
              placeholder="Username"
              {...register("userName")}
            />
            {errors.userName && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.userName.message}
              </p>
            )}
          </div>
          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className={`bg-gray-50 border ${
                errors.password
                  ? "border-red-500 dark:border-red-400"
                  : "border-gray-300 dark:border-gray-600"
              } text-gray-900 dark:text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700`}
              {...register("password")}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>
          {/* Action Buttons */}
          <button
            type="submit"
            className="w-full text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 transition duration-200"
          >
            Sign Up
          </button>
          {/* Sign In Link */}
          <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default RegisterPage;
