import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/rcms_logo_small.jpg";

const Navbar = ({ role }) => {
  const [showProfile, setShowProfile] = useState(false);

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
  };

  const handleLogout = () => {
    // Logic for handling logout
  };

  return (
    <nav className="flex items-center justify-between bg-purple-900 p-4">
      <div className="flex items-center">
        <div className="w-56"></div> {/* Empty div for spacing */}
        <div className="flex items-center space-x-8">
          {role === "class_teacher" ? (
            <>
              <Link
                to="/students"
                className="text-white font-semibold px-4 py-2 rounded-lg transition duration-300 hover:bg-white"
                activeClassName="bg-white text-purple-500" // Add the active classes here
              >
                Students
              </Link>
              <Link
                to="/reports"
                className="text-white font-semibold px-4 py-2 rounded-lg transition duration-300 hover:bg-white"
                activeClassName="bg-white text-purple-500"
              >
                Reports
              </Link>
            </>
          ) : role === "subject_teacher" ? (
            <>
              <Link
                to="/test"
                className="text-white font-semibold px-4 py-2 rounded-lg transition duration-300 hover:bg-white"
                activeClassName="bg-white text-purple-500"
              >
                Test
              </Link>
              <Link
                to="/result"
                className="text-white font-semibold px-4 py-2 rounded-lg transition duration-300 hover:bg-white"
                activeClassName="bg-white text-purple-500"
              >
                Result
              </Link>
            </>
          ) : role === "admin" ? (
            <>
              <Link
                to="/standards"
                className="text-white font-semibold px-4 py-2 rounded-lg transition duration-300 hover:bg-white"
                activeClassName="bg-white text-purple-500"
              >
                Standards
              </Link>
              <Link
                to="/division"
                className="text-white font-semibold px-4 py-2 rounded-lg transition duration-300 hover:bg-white"
                activeClassName="bg-white text-purple-500"
              >
                Division
              </Link>
              <Link
                to="/role"
                className="text-white font-semibold px-4 py-2 rounded-lg transition duration-300 hover:bg-white"
                activeClassName="bg-white text-purple-500"
              >
                Role
              </Link>
              <Link
                to="/user_roles"
                className="text-white font-semibold px-4 py-2 rounded-lg transition duration-300 hover:bg-white"
                activeClassName="bg-white text-purple-500"
              >
                User Roles
              </Link>
              <Link
                to="/grades"
                className="text-white font-semibold px-4 py-2 rounded-lg transition duration-300 hover:bg-white"
                activeClassName="bg-white text-purple-500"
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
              src="profile-pic.jpg"
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <svg
              className="w-4 h-4 fill-current text-white ml-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              {/* SVG path */}
            </svg>
          </button>
          {/* Dropdown menu */}
          {showProfile && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-10">
              <div className="py-1">
                {/* Profile data */}
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
