import React, { useState } from "react";
import Subjectteacher_test_layout from "./subjectteacher_test_layout";

const Navbar = () => {
  const [activeOption, setActiveOption] = useState("");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleOptionClick = (option) => {
    setActiveOption(option);
    if(option==="test"){
      console.log(option)
   }
    
  };

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <>
    <nav className="bg-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="hidden sm:block sm:ml-6">
            <div className="flex space-x-4">
              <a
                href="#"
                className={`${
                  activeOption === "test"
                    ? "bg-blue-500 text-black"
                    : "text-black hover:bg-gray-700 hover:text-white"
                } px-3 py-2 rounded-md text-sm font-medium`}
                onClick={() => handleOptionClick("test")}
              >
                Test
              </a>
              <a
                href="#"
                className={`${
                  activeOption === "report"
                    ? "bg-blue-500 text-black"
                    : "text-black hover:bg-gray-700 hover:text-white"
                } px-3 py-2 rounded-md text-sm font-medium`}
                onClick={() => handleOptionClick("report")}
              >
                Report
              </a>
            </div>
          </div>
          <div className="ml-4 flex items-center sm:ml-6">
            <div className="relative">
              <button
                type="button"
                className="flex text-sm bg-blue-500 border-2 border-blue-500 rounded-full focus:outline-none focus:border-white"
                onClick={handleUserMenuToggle}
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full"
                  src="profile-pic.jpg"
                  alt="Profile"
                />
              </button>
              {isUserMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
    </>
  );
};

export default Navbar;
