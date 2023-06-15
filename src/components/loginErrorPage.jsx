import React, { useState } from "react";
import loginErrorImage from "../images/loginErrorImage.jpg";
import rcms_logo_small from "../images/rcms_logo_small.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const LoginErrorPage = () => {
  return (
    <div
      className="bg-white rounded-lg shadow-lg p-4 mt-20 mx-40"
      style={{ height: 550, boxShadow: "0 0 10px 0 rgba(0, 0, 0, 1)" }}
    >
      <div className="flex">
        <div className="w-1/2">
          <img
            src={loginErrorImage}
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
          <div
            id="alreadyuser"
            className="form-text m-2 text-3xl font-bold text-red-500 flex flex-col items-center"
          >
            <FontAwesomeIcon
              icon={faExclamationCircle}
              className="mr-2"
              style={{ fontSize: "1.5rem" }}
            />
            Enter Valid Data !
          </div>
          <div className="form-text m-2 text-xl flex flex-col items-center">
            <span>
              Back To{" "}
              <Link to="/login" className="text-blue-500 hover:text-blue-700">
                Login
              </Link>{" "}
              Page
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginErrorPage;
