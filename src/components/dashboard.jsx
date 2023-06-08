import React, { useState } from "react";
import About from "./about";
import Login from "./login";
import rcms_logo_small from "../images/rcms_logo_small.jpg";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState("");

  const handleButtonClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div
        className="bg-white rounded-lg shadow-lg p-4 mt-20 mx-40"
        style={{ height: 550, boxShadow: "0 0 10px 0 rgba(0, 0, 0, 1)" }}
      >
        <div className="flex justify-end">
          <Link
            to="/about"
            className={`mr-2 pl-2 pr-5 pt-1 italic font-semibold ${
              currentPage === "about" ? "text-red-500" : "text-gray-500"
            }`}
            onClick={() => handleButtonClick("about")}
          >
            About Us
          </Link>
          <Link
            to="/login"
            className={`pl-2 pr-5 pt-1 italic font-semibold ${
              currentPage === "login" ? "text-red-500" : "text-gray-500"
            }`}
            onClick={() => handleButtonClick("login")}
          >
            Login
          </Link>
        </div>
        <div className="flex justify-center">
          <img
            src={rcms_logo_small}
            alt="RCMS Logo"
            className="h-50 w-70 mt-20"
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
