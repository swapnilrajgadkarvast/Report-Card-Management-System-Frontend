import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import random_profile_pic1 from "../images/random_profile_pic.jpg";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = ({ setLogin }) => {
  const [showProfile, setShowProfile] = useState(false);

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
  };

  // const { setLogin } = props;
  const navigate = useNavigate();
  if (!sessionStorage.getItem("loginData")) return;
  const loginData = JSON.parse(sessionStorage.getItem("loginData"));
  // console.log(loginData);
  const role = loginData.user.role;
  const user = loginData.user;

  return (
    <nav className="flex items-center justify-between bg-purple-900 p-4">
      <div className="flex items-center">
        <div className="w-56"></div> {/* Empty div for spacing */}
        <div className="flex items-center space-x-8">
          {role === "Class Teacher" ? (
            <>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "transition duration-300 font-bold focus:outline-none p-2 bg-gray-100 shadow rounded-md m-1"
                    : "transition duration-300 font-bold focus:outline-none p-2 hover:bg-purple-600 hover:shadow rounded-md m-1"
                }
                to={"/class_teacher/students"}
              >
                Students
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "transition duration-300 font-bold focus:outline-none p-2 bg-gray-100 shadow rounded-md m-1"
                    : "transition duration-300 font-bold focus:outline-none p-2 hover:bg-purple-600 hover:shadow rounded-md m-1"
                }
                to={"/class_teacher/reports"}
              >
                Reports
              </NavLink>
            </>
          ) : role === "Subject Teacher" ? (
            <>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "transition duration-300 font-bold focus:outline-none p-2 bg-gray-100 shadow rounded-md m-1"
                    : "transition duration-300 font-bold focus:outline-none p-2 hover:bg-purple-600 hover:shadow rounded-md m-1"
                }
                to={"/subject_teacher/test"}
              >
                Test
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "transition duration-300 font-bold focus:outline-none p-2 bg-gray-100 shadow rounded-md m-1"
                    : "transition duration-300 font-bold focus:outline-none p-2 hover:bg-purple-600 hover:shadow rounded-md m-1"
                }
                to={"/subject_teacher/result"}
              >
                Result
              </NavLink>
            </>
          ) : role === "Admin" ? (
            <>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "transition duration-300 font-bold focus:outline-none p-2 bg-gray-100 shadow rounded-md m-1"
                    : "transition duration-300 font-bold focus:outline-none p-2 hover:bg-purple-600 hover:shadow rounded-md m-1"
                }
                to={"/admin/standards"}
              >
                Standard
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "transition duration-300 font-bold focus:outline-none p-2 bg-gray-100 shadow rounded-md m-1"
                    : "transition duration-300 font-bold focus:outline-none p-2 hover:bg-purple-600 hover:shadow rounded-md m-1"
                }
                to={"/admin/division"}
              >
                Division
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "transition duration-300 font-bold focus:outline-none p-2 bg-gray-100 shadow rounded-md m-1"
                    : "transition duration-300 font-bold focus:outline-none p-2 hover:bg-purple-600 hover:shadow rounded-md m-1"
                }
                to={"/admin/roles"}
              >
                Role
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "transition duration-300 font-bold focus:outline-none p-2 bg-gray-100 shadow rounded-md m-1"
                    : "transition duration-300 font-bold focus:outline-none p-2 hover:bg-purple-600 hover:shadow rounded-md m-1"
                }
                to={"/admin/user_roles"}
              >
                User Role
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "transition duration-300 font-bold focus:outline-none p-2 bg-gray-100 shadow rounded-md m-1"
                    : "transition duration-300 font-bold focus:outline-none p-2 hover:bg-purple-600 hover:shadow rounded-md m-1"
                }
                to={"/admin/grades"}
              >
                Grades
              </NavLink>
            </>
          ) : null}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative flex items-center">
          <div>
            <p className="text-white font-bold text-xl">{`${user.firstName} ${user.lastName}`}</p>
            <p className="text-white ">{user.role}</p>
          </div>
          <button
            onClick={handleProfileClick}
            className="flex items-center focus:outline-none ml-4"
          >
            <img
              src={random_profile_pic1}
              alt="Profile"
              className="w-24 h-16 rounded-full"
            />
          </button>
          {/* Dropdown menu */}
          {showProfile && (
            <div className="absolute right-0 mt-80 w-[26rem] bg-white rounded-md shadow-lg overflow-hidden z-30">
              <div className="py-4 px-4">
                <div className="flex items-start space-x-4">
                  <div className="mr-4">
                    {" "}
                    <img
                      src={random_profile_pic1}
                      alt="Profile"
                      className="w-36 h-28"
                    />
                  </div>
                  <div>
                    <p className="text-lg font-medium">{`${user.firstName} ${user.lastName}`}</p>
                    <div>
                      <p>
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          className="text-purple-900 mr-2"
                        />
                        {`${user.email}`}
                      </p>
                      <p>
                        <FontAwesomeIcon
                          icon={faPhone}
                          className="text-purple-900 mr-2"
                        />
                        {`${user.phone}`}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <p>
                    Username : <strong>{`${user.userName}`}</strong>
                  </p>
                </div>
                <div className="flex justify-end mt-6">
                  <button
                    className="bg-white hover:bg-gray-300 text-purple-600 font-medium px-4 py-2 rounded"
                    onClick={handleProfileClick}
                  >
                    Cancel
                  </button>
                  <button
                    className="block px-4 py-2 text-sm text-white bg-purple-700 hover:bg-purple-800 ml-2 rounded"
                    onClick={() => {
                      navigate("/login");
                      setLogin(false);
                      sessionStorage.clear();
                    }}
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
