import React, { useState } from "react";
import { Link } from "react-router-dom";
import rcms_logo_small from "../images/rcms_logo_small.jpg";
import register_image from "../images/rcms_register.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import usersStore from "../stores/usersStore";

const Register = () => {
  const schema = yup.object().shape({
    firstName: yup.string().min(3).max(50).required(),
    lastName: yup.string().min(3).max(50).required(),
    email: yup.string().min(5).max(255).required(),
    phone: yup.string().min(10).max(10).required(),
    userName: yup.string().min(3).max(50).required(),
    password: yup.string().min(8).max(1024).required(),
    lastLoggedIn: yup.string().default(() => new Date().toISOString()),
    isActive: yup.boolean().default(true),
    role: yup.string(),
    updatedBy: yup.string().default("6489a3abbb5ca82bca72dd4b"),
    updatedAt: yup.string().default(() => new Date().toISOString()),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { getUsers, addUsers, updateUsers, deleteUsers } = usersStore();

  const onSubmitHandler = async (data) => {
    try {
      // Save the user data
      await addUsers(data);
      console.log("User Data --->");
      console.log(data);
      reset();
      console.log("User saved successfully.");
    } catch (error) {
      console.error("Error saving user:", error);
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
            src={register_image}
            alt="Register Image"
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
            <div className="mb-4 flex">
              <div className="w-1/2 pr-2">
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-blue-500 absolute top-3 left-3"
                  />
                  <input
                    type="text"
                    id="firstname"
                    className="pl-10 shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="First Name"
                    {...register("firstName")}
                  />
                </div>
              </div>
              <div className="w-1/2 pl-2">
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-blue-500 absolute top-3 left-3"
                  />
                  <input
                    type="text"
                    id="lastname"
                    className="pl-10 shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Last Name"
                    {...register("lastName")}
                  />
                </div>
              </div>
            </div>
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
            </div>
            <div className="mb-4">
              <div className="relative">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="text-blue-500 absolute top-3 left-3"
                />
                <input
                  type="tel"
                  id="phone"
                  className="pl-10 shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Phone"
                  {...register("phone")}
                />
              </div>
            </div>
            <div className="mb-4">
              <div className="relative">
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-blue-500 absolute top-3 left-3"
                />
                <input
                  type="text"
                  id="username"
                  className="pl-10 shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Username"
                  {...register("userName")}
                />
              </div>
            </div>
            <div className="mb-4">
              <div className="relative">
                <FontAwesomeIcon
                  icon={faLock}
                  className="text-blue-500 absolute top-3 left-3"
                />
                <input
                  type="password"
                  id="password"
                  className="pl-10 shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Password"
                  {...register("password")}
                />
              </div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Register
              </button>
            </div>
            <div id="alreadyuser" className="form-text m-2 text-xl">
              <span>
                Already Registered{" "}
                <Link to="/login" className="text-blue-500 hover:text-blue-700">
                  Login
                </Link>{" "}
                Here
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
