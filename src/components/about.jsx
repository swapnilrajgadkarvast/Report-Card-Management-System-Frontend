import React from "react";
import { Link, useLocation } from "react-router-dom";
import rcms_logo_small from "../images/rcms_logo_small.jpg";
import rcms_about from "../images/rcms_about.png";

const About = () => {
  const location = useLocation();

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
          <div className="w-1/2 p-4">
            <img src={rcms_about} alt="About RCMS" className="w-[85%]" />
          </div>
          <div className="w-1/2 p-4">
            <div className="flex flex-col items-center">
              <img
                src={rcms_logo_small}
                alt="RCMS Logo"
                className="mb-3 pt-[3.5rem]"
              />
              <div className="container bg-purple-400 p-2 rounded-lg">
                <h2 className="font-bold text-black text-center">About Us</h2>
                <p>
                  The Report Card Management System streamlines the process of
                  generating and organizing student report cards. <br />
                  It offers an efficient and user-friendly platform for teachers
                  and administrators to input grades and comments, ensuring
                  accurate and timely delivery of comprehensive academic
                  assessments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
