import React, { useState, useEffect } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useForm } from "react-hook-form";
import { signUp } from "../graphql/mutations/authMutations";

import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import Logo from "../Assets/Logo.png";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleAfterSignUpResponse = (userId, token, message) => {
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

  const handleAfterSignUpError = (message) => {
    setLoading(false);
    toast.error(message, { theme: "colored" });
  };

  const handleInput = (e) => {
    const inputValue = e.target.value;

    if (inputValue.length > 10) {
      e.target.value = inputValue.slice(0, 10);
    } else if (inputValue < 0) {
      e.target.value = 0;
    }

    let inputValue1 = e.target.value.replace(/[^\d-]/g, "");

    if (inputValue1.startsWith("-")) {
      inputValue1 = "-" + inputValue1.replace(/-/g, "");
    }

    e.target.value = inputValue1;
  };

  const onSubmit = (data) => {
    setLoading(true);
    signUp({
      first_name: data.first_name,
      last_name: data.last_name,
      user_contact: data.user_contact,
      user_password: data.user_password,
      user_type: "customer",
    }).then(
      (res) =>
        handleAfterSignUpResponse(
          res.data.signUp.user,
          res.data.signUp.token,
          res.data.signUp.message
        ),
      (error) => handleAfterSignUpError(error.message)
    );
  };
  const onError = (errors) => console.log("Errors Occurred !! :", errors);

  if (!isHydrated) {
    return null;
  }

  return (
    <>
      <div className="sm:text-3xl font-bold text-xl text-[#151827] flex items-center gap-2">
        <ArrowBackIcon
          onClick={() => navigate("/")}
          className="cursor-pointer !text-3xl"
        />
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="w-52 h-10 ms-2" />
        </div>
      </div>
      <div className="text-xl sm:text-2xl font-bold mt-6 sm:mt-8 text-[#151827]">
        Create an account <span className="text-[#29977E]">As Customer</span>
      </div>

      <form onReset={reset} className="mt-6">
        <div className="space-y-3 max-h-[400px] min-h-[200px] h-auto overflow-auto">
          <div className="flex flex-col sm:flex-row w-full gap-2">
            <div className="w-full">
              <input
                type="text"
                placeholder="First Name *"
                {...register("first_name", {
                  required: "First name is required",
                })}
                className="border focus:border-[#29977E] focus:outline-none rounded-xl w-full focus:placeholder:text-[#29977E] p-3"
              />
              {errors.first_name && (
                <div className="mt-1 ml-1">
                  <span style={{ color: "red" }}>
                    {errors.first_name?.message}
                  </span>
                </div>
              )}
            </div>
            <div className="w-full">
              <input
                type="text"
                placeholder="Last Name *"
                {...register("last_name", {
                  required: "Last name is required",
                })}
                className="border focus:border-[#29977E] focus:outline-none rounded-xl w-full focus:placeholder:text-[#29977E] p-3"
              />
              {errors.last_name && (
                <div className="mt-1 ml-1">
                  <span style={{ color: "red" }}>
                    {errors.last_name?.message}
                  </span>
                </div>
              )}
            </div>
          </div>
          <input
            type="number"
            placeholder="Connect Mobile Number *"
            {...register("user_contact", {
              required: "Contact number is required",
              minLength: {
                value: 10,
                message: "Contact number must be 10 numbers",
              },
              maxLength: {
                value: 10,
                message: "Contact number must be 10 numbers",
              },
            })}
            className="rounded-xl p-3 w-full border focus:border focus:border-[#29977E] focus:outline-none focus:placeholder:text-[#29977E] "
            onInput={handleInput}
          />
          {errors.user_contact && (
            <div className="mt-1 ml-1">
              <span style={{ color: "red" }}>
                {errors.user_contact?.message}
              </span>
            </div>
          )}
          <div className="flex flex-col sm:flex-row  w-full gap-2">
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password *"
                {...register("user_password", {
                  required: "Password is required",
                })}
                className="rounded-xl p-3 w-full border  focus:border focus:border-[#29977E] focus:outline-none focus:placeholder:text-[#29977E] "
              />

              {showPassword ? (
                <VisibilityOutlinedIcon
                  className="absolute top-4 right-5 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword((show) => !show)}
                />
              ) : (
                <VisibilityOffOutlinedIcon
                  className="absolute top-4 right-5 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword((show) => !show)}
                />
              )}

              {errors.user_password && (
                <div className="mt-1 ml-1">
                  <span style={{ color: "red" }}>
                    {errors.user_password?.message}
                  </span>
                </div>
              )}
            </div>
            <div className="relative w-full">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirmed Password *"
                {...register("confirm_password", {
                  validate: (value) => {
                    const { user_password } = getValues();
                    return (
                      user_password === value || "Passwords does not match!"
                    );
                  },
                })}
                className="rounded-xl p-3 w-full border  focus:border focus:border-[#29977E] focus:outline-none focus:placeholder:text-[#29977E] "
              />
              {showConfirmPassword ? (
                <VisibilityOutlinedIcon
                  className="absolute top-4 right-5 text-gray-400 cursor-pointer"
                  onClick={() => setShowConfirmPassword((show) => !show)}
                />
              ) : (
                <VisibilityOffOutlinedIcon
                  className="absolute top-4 right-5 text-gray-400 cursor-pointer"
                  onClick={() => setShowConfirmPassword((show) => !show)}
                />
              )}
              {errors.confirm_password && (
                <div className="mt-1 ml-1">
                  <span style={{ color: "red" }}>
                    {errors.confirm_password?.message}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
      <div className="sm:flex-grow"></div>
      <div className="mt-5 w-full">
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
          Sign Up
        </button>
        <p className="text-base max-[480px]:text-xs text-gray-400  mt-2 flex justify-center">
          Already have an account?
          <span
            className="text-base max-[480px]:text-xs text-black font-bold ml-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </div>
    </>
  );
};

export default Signup;
