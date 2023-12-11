import React, { useState } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useForm } from "react-hook-form";
import { CircularProgress } from "@mui/material";
import Logo from "../Assets/Logo.png";
import { signIn } from "../graphql/mutations/authMutations";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import { withoutAuthAndUserType } from "../../components/core/PrivateRouteForAuth";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleAfterSignInResponse = (userId, token, message) => {
    setLoading(false);
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    toast.success(message, { theme: "colored" });
    localStorage.removeItem("user_type_for_auth");
    localStorage.setItem("user_type", "customer");

    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  const handleAfterSignInError = (message) => {
    setLoading(false);
    toast.error(message, { theme: "colored" });
  };

  const onSubmit = (data) => {
    setLoading(true);
    signIn({
      username: data.username,
      password: data.password,
      type: "customer",
    }).then(
      (res) =>
        handleAfterSignInResponse(
          res.data.signIn.user,
          res.data.signIn.token,
          res.data.signIn.message
        ),
      (error) => handleAfterSignInError(error.message)
    );
  };

  const onError = (errors) => console.log("Errors Occurred !! :", errors);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  return (
    <>
      <div className="flex items-center">
        <img src={Logo} alt="Logo" className="w-52 h-10 ms-2" />
      </div>
      <div className="text-xl sm:text-2xl font-bold mt-6 sm:mt-8 text-[#151827]">
        Login <span className="text-[#29977E]">As Customer</span>
      </div>

      <form onReset={reset} className="mt-6">
        <input
          type="text"
          placeholder="Email Address or Contact Number *"
          {...register("username", {
            required: "Username is required",
          })}
          className="rounded-xl p-3 border w-full my-2 focus:border focus:border-[#29977E] focus:outline-none focus:placeholder:text-[#29977E] xl:p-3 sm:p-2"
        />
        {errors.username && (
          <div className="mt-1 ml-1">
            <span style={{ color: "red" }}>{errors.username?.message}</span>
          </div>
        )}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password *"
            {...register("password", {
              required: "Password is required",
            })}
            className="rounded-xl p-3 border w-full my-2 focus:border focus:border-[#29977E] focus:outline-none focus:placeholder:text-[#29977E] xl:p-3 sm:p-2"
          />

          {showPassword ? (
            <VisibilityOutlinedIcon
              className="absolute top-5 right-5 text-gray-400 cursor-pointer"
              onClick={() => setShowPassword((show) => !show)}
            />
          ) : (
            <VisibilityOffOutlinedIcon
              className="absolute top-5 right-5 text-gray-400 cursor-pointer"
              onClick={() => setShowPassword((show) => !show)}
            />
          )}

          {errors.password && (
            <div className="mt-1 ml-1">
              <span style={{ color: "red" }}>{errors.password?.message}</span>
            </div>
          )}
        </div>
      </form>
      <div className="sm:flex-grow"></div>
      <div className="w-full mt-5">
        <button
          type="submit"
          onClick={handleSubmit(onSubmit, onError)}
          className="h-14 flex items-center justify-center text-white w-full bg-[#151827] rounded-xl text-xl max-[480px]:h-10 max-[480px]:text-sm"
        >
          {loading && (
            <CircularProgress
              size={20}
              color="primary"
              sx={{ color: "white", mr: 1 }}
            />
          )}
          Sign In
        </button>
        <p className="text-base max-[480px]:text-xs text-gray-400 mt-2 flex justify-center">
          Don&apos;t have an account?
          <span
            className="text-base max-[480px]:text-xs text-black font-bold ml-2 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </>
  );
};

export default Login;
