import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/rcms_logo_small.jpg";
import random_profile_pic1 from "../images/random_profile_pic.jpg";

const Navbar = ({ role }) => {
  const [showProfile, setShowProfile] = useState(false);

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
  };

  const handleLogout = () => {
    // Logic for handling logout
  };

  const [activeNavbar, setActiveNavbar] = useState("students");

  const handleNavbarClick = (navbarOption) => {
    setActiveNavbar(navbarOption);
  };

  return (
    <nav className="flex items-center justify-between bg-purple-900 p-4">
      <div className="flex items-center">
        <div className="w-56"></div> {/* Empty div for spacing */}
        <div className="flex items-center space-x-8">
          {role === "class_teacher" ? (
            <>
              <Link
                to="/class_teacher/students"
                className={`text-white font-semibold px-4 py-2 rounded-lg transition duration-300 hover:bg-purple-600 ${
                  activeNavbar === "students"
                    ? "bg-purple-500 text-purple-500"
                    : ""
                }`}
                onClick={() => handleNavbarClick("students")}
              >
                Students
              </Link>
              <Link
                to="/class_teacher/reports"
                className={`text-white font-semibold px-4 py-2 rounded-lg transition duration-300 hover:bg-purple-600 ${
                  activeNavbar === "reports"
                    ? "bg-purple-500 text-purple-500"
                    : ""
                }`}
                onClick={() => handleNavbarClick("reports")}
              >
                Reports
              </Link>
            </>
          ) : role === "subject_teacher" ? (
            <>
              <Link
                to="/subject_teacher/test"
                className={`text-white font-semibold px-4 py-2 rounded-lg transition duration-300 hover:bg-purple-600 ${
                  activeNavbar === "test" ? "bg-purple-500 text-purple-500" : ""
                }`}
                onClick={() => handleNavbarClick("test")}
              >
                Test
              </Link>
              <Link
                to="/subject_teacher/result"
                className={`text-white font-semibold px-4 py-2 rounded-lg transition duration-300 hover:bg-purple-600 ${
                  activeNavbar === "result"
                    ? "bg-purple-500 text-purple-500"
                    : ""
                }`}
                onClick={() => handleNavbarClick("result")}
              >
                Result
              </Link>
            </>
          ) : role === "admin" ? (
            <>
              <Link
                to="/admin/standards"
                className={`text-white font-semibold px-4 py-2 rounded-lg transition duration-300 hover:bg-purple-600 ${
                  activeNavbar === "standards"
                    ? "bg-purple-500 text-purple-500"
                    : ""
                }`}
                onClick={() => handleNavbarClick("standards")}
              >
                Standards
              </Link>
              <Link
                to="/admin/divisions"
                className={`text-white font-semibold px-4 py-2 rounded-lg transition duration-300 hover:bg-purple-600 ${
                  activeNavbar === "division"
                    ? "bg-purple-500 text-purple-500"
                    : ""
                }`}
                onClick={() => handleNavbarClick("division")}
              >
                Division
              </Link>
              <Link
                to="/admin/roles"
                className={`text-white font-semibold px-4 py-2 rounded-lg transition duration-300 hover:bg-purple-600 ${
                  activeNavbar === "role" ? "bg-purple-500 text-purple-500" : ""
                }`}
                onClick={() => handleNavbarClick("role")}
              >
                Role
              </Link>
              <Link
                to="/admin/user_roles"
                className={`text-white font-semibold px-4 py-2 rounded-lg transition duration-300 hover:bg-purple-600 ${
                  activeNavbar === "user_roles"
                    ? "bg-purple-500 text-purple-500"
                    : ""
                }`}
                onClick={() => handleNavbarClick("user_roles")}
              >
                User Roles
              </Link>
              <Link
                to="/admin/grades"
                className={`text-white font-semibold px-4 py-2 rounded-lg transition duration-300 hover:bg-purple-600 ${
                  activeNavbar === "grades"
                    ? "bg-purple-500 text-purple-500"
                    : ""
                }`}
                onClick={() => handleNavbarClick("grades")}
              >
                Grades
              </Link>
            </>
          ) : null}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button
            onClick={handleProfileClick}
            className="flex items-center focus:outline-none"
          >
            <img
              src={random_profile_pic1}
              alt="Profile"
              className="w-24 h-16 rounded-full"
            />
          </button>
          {/* Dropdown menu */}
          {showProfile && (
            <div className="absolute right-0 mt-2 w-[25rem] bg-white rounded-md shadow-lg overflow-hidden z-10">
              <div className="py-4 px-4">
                <div className="flex items-start justify-end space-x-4">
                  <div className="mr-4">
                    <img
                      src={random_profile_pic1}
                      alt="Profile"
                      className="w-36 h-28"
                    />
                  </div>
                  <div>
                    <p className="text-lg font-medium">Swapnil Rajgadkar</p>
                    <p className="text-gray-500">
                      swapnilr@valueaddsofttech.com
                    </p>
                    <p className="text-gray-500">8899112200</p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-gray-600 text-center">
                    Username: <strong>swapnil.rajgadkar</strong>
                  </p>
                </div>
                <div className="flex justify-end mt-6">
                  <button
                    className="bg-white hover:bg-gray-100 text-purple-600 font-medium px-4 py-2 rounded"
                    onClick={handleProfileClick}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 ml-4 text-sm text-white bg-purple-700 hover:bg-purple-800 w-1/4 rounded"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
