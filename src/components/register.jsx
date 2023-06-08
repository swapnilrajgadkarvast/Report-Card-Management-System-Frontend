import React, { useState } from "react";
import rcms_logo_small from "../images/rcms_logo_small.jpg";
import register_image from "../images/rcms_register.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRegister = (event) => {
    event.preventDefault();
    // Handle registration logic here
    console.log("Register button clicked");
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
          <form>
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
                  value={username}
                  onChange={handleUsernameChange}
                />
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
                  value={email}
                  onChange={handleEmailChange}
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
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
                type="submit"
                onClick={handleRegister}
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
