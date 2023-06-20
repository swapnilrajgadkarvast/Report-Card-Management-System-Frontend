import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import forgotPasswordStore from "../stores/forgotPasswordStore";
import rcms_logo_small from "../images/rcms_logo_small.jpg";
import forgotPasswordImage from "../images/forgotPassword.jpg";

const ForgotPassword = () => {
  const schema = yup.object().shape({
    email: yup.string().required().email(),
    temporaryPassword: yup.string().required(),
    newPassword: yup.string().required().min(6),
    confirmPassword: yup
      .string()
      .required()
      .min(6)
      .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
  });

  const { addForgotPassword } = forgotPasswordStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [passwordUpdated, setPasswordUpdated] = useState(false);

  const onSubmitHandler = async (data) => {
    try {
      const { email, temporaryPassword, newPassword, confirmPassword } = data;

      await addForgotPassword(
        email,
        temporaryPassword,
        newPassword,
        confirmPassword
      );
      console.log("Password updated successfully.");

      // Reset the form
      reset();
      setPasswordUpdated(true);
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-lg p-4 mt-20 mx-40"
      style={{ height: 550, boxShadow: "0 0 10px 0 rgba(0, 0, 0, 1)" }}
    >
      <div className="flex">
        <div className="w-1/2">
          <img
            src={forgotPasswordImage}
            alt="Login Image"
            className="w-auto h-135%"
          />
        </div>
        <div className="w-1/2 p-4">
          <div className="flex flex-col items-center">
            <img
              src={rcms_logo_small}
              alt="RCMS Logo"
              className="w-auto h-100"
            />
          </div>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="mb-4">
              <div className="relative">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-blue-500 absolute top-3 left-3"
                />
                <input
                  type="email"
                  id="email"
                  className="pl-10 shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Email"
                  {...register("email")}
                />
              </div>
              {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div className="mb-4">
              <div className="relative">
                <FontAwesomeIcon
                  icon={faLock}
                  className="text-blue-500 absolute top-3 left-3"
                />
                <input
                  type="password"
                  id="temporary-password"
                  className="pl-10 shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Temporary Password"
                  {...register("temporaryPassword")}
                />
              </div>
              {errors.temporaryPassword && (
                <p>{errors.temporaryPassword.message}</p>
              )}
            </div>
            <div className="mb-4">
              <div className="relative">
                <FontAwesomeIcon
                  icon={faLock}
                  className="text-blue-500 absolute top-3 left-3"
                />
                <input
                  type="password"
                  id="new-password"
                  className="pl-10 shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="New Password"
                  {...register("newPassword")}
                />
              </div>
              {errors.newPassword && <p>{errors.newPassword.message}</p>}
            </div>
            <div className="mb-4">
              <div className="relative">
                <FontAwesomeIcon
                  icon={faLock}
                  className="text-blue-500 absolute top-3 left-3"
                />
                <input
                  type="password"
                  id="confirm-password"
                  className="pl-10 shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Confirm Password"
                  {...register("confirmPassword")}
                />
              </div>
              {errors.confirmPassword && (
                <p>{errors.confirmPassword.message}</p>
              )}
            </div>
            <div className="flex items-center justify-between mb-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Reset Password
              </button>
            </div>
            {passwordUpdated && (
              <p className="text-green-700 text-center font-bold">
                Password changed successfully !
              </p>
            )}
            <div id="alreadyuser" className="form-text m-2 text-xl">
              <span>
                Back To{" "}
                <Link to="/login" className="text-blue-500 hover:text-blue-700">
                  Login
                </Link>{" "}
                Page
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
