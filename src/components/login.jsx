import React, { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import rcms_logo_small from "../images/rcms_logo_small.jpg";
import login_image from "../images/rcms_login.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useBoundStore } from "../stores/store";

const Login = ({ setLogin }) => {
  const [loginRole, setLoginRole] = useState("");
  const navigate = useNavigate();
  const loginUser = useBoundStore((state) => state.loginUser);

  const handleRoleChange = (event) => {
    setLoginRole(event.target.value);
  };

  const schema = yup.object().shape({
    email: yup.string().min(3).max(366).required(),
    password: yup.string().min(8).max(1024).required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleLogin = (data) => {
    console.log(data);

    if (
      (data.loginRole === "subject-teacher" &&
        loginRole !== "subject-teacher") ||
      (data.loginRole === "class-teacher" && loginRole !== "class-teacher")
    ) {
      console.log("Enter Valid data");
      navigate("/login-error-page");
      return; // Add this return statement to prevent further execution
    }

    loginUser(data)
      .then((res) => {
        const role = res.data.user.role;
        console.log("Role:", role);
        setLogin(true);
        if (role === "Admin") {
          console.log("Navigating to /admin/standards");
          navigate("/admin/standards");
        } else if (
          role === "Subject Teacher" &&
          loginRole === "subject-teacher"
        ) {
          console.log("Navigating to /subject_teacher/test");
          navigate("/subject_teacher/test");
        } else if (role === "Class Teacher" && loginRole === "class-teacher") {
          console.log("Navigating to /class_teacher/students");
          navigate("/class_teacher/students");
        } else {
          console.log("Enter Valid data");
          navigate("/login-error-page");
        }
      })
      .catch((err) => {
        console.log("Wrong data:", err);
        navigate("/login-error-page"); // Add this line to navigate to login-error-page on error
      });
  };

  const location = useLocation();

  return (
    <div
      className="bg-white rounded-lg shadow-lg p-4 mt-20 mx-40"
      style={{ height: 550, boxShadow: "0 0 10px 0 rgba(0, 0, 0, 1)" }}
    >
      <div className="flex justify-end">
        <Link
          to="/about"
          className={`mr-2 pl-2 pr-5 pt-1 italic font-semibold ${
            location.pathname === "/about" ? "text-red-500" : "text-gray-500"
          }`}
          onClick={() => {}}
        >
          About Us
        </Link>
        <Link
          to="/login"
          className={`pl-2 pr-5 pt-1 italic font-semibold ${
            location.pathname === "/login" ? "text-red-500" : "text-gray-500"
          }`}
          onClick={() => {}}
        >
          Login
        </Link>
      </div>

      <div className="flex">
        <div className="w-1/2">
          <img src={login_image} alt="Login Image" className="w-auto h-135%" />
        </div>
        <div className="w-1/2 p-4">
          <div className="flex flex-col items-center">
            <img
              src={rcms_logo_small}
              alt="RCMS Logo"
              className="w-auto h-100"
            />
          </div>
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="mb-4">
              <div className="relative">
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-blue-500 absolute top-3 left-3"
                />
                <input
                  {...register("email")}
                  type="email"
                  id="email"
                  className="pl-10 shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Email"
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
                  {...register("password")}
                  type="password"
                  id="password"
                  className="pl-10 shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="mb-4">
              <p className="text-gray-600">Do you want to login as:</p>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="subject-teacher"
                  name="login-role"
                  className="mr-2"
                  value="subject-teacher"
                  checked={loginRole === "subject-teacher"}
                  onChange={handleRoleChange}
                />
                <label
                  htmlFor="subject-teacher"
                  className={`cursor-pointer ${
                    loginRole === "subject-teacher" ? "text-purple-800" : ""
                  }`}
                >
                  Subject Teacher
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="class-teacher"
                  name="login-role"
                  className="mr-2"
                  value="class-teacher"
                  checked={loginRole === "class-teacher"}
                  onChange={handleRoleChange}
                />
                <label
                  htmlFor="class-teacher"
                  className={`cursor-pointer ${
                    loginRole === "class-teacher" ? "text-purple-800" : ""
                  }`}
                >
                  Class Teacher
                </label>
              </div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Login
              </button>
            </div>
            <div className="flex items-center justify-between">
              <Link
                to="/register"
                className="text-blue-500 hover:text-blue-700 font-bold"
              >
                Register
              </Link>
              <Link
                to="/forgot-password"
                className="text-blue-500 hover:text-blue-700 font-bold"
              >
                Forgot Password ?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
