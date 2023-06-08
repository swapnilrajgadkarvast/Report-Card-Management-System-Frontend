import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import logo from "../src/images/rcms_logo_small.jpg";

const SubjectTeacher = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const clearSearch = () => {
    setSearchValue("");
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  return (
    <div>
      <nav className="flex justify-between items-center bg-gray-800 py-4 px-6">
        <div className="flex items-center">
          <div className="w-40"></div>
          <div className="mr-4">
            <button className="bg-transparent text-white hover:text-gray-300 focus:outline-none">
              <FontAwesomeIcon icon={faUser} size="lg" />
            </button>
          </div>
          <div className="flex items-center">
            <a href="#" className="text-white hover:text-gray-300 mx-4">
              Test
            </a>
            <a href="#" className="text-white hover:text-gray-300 mx-4">
              Result
            </a>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center text-white hover:text-gray-300 focus:outline-none"
          >
            <img
              className="w-8 h-8 rounded-full mr-2"
              src="profile-pic.jpg"
              alt="Profile"
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
              <div className="p-4">
                <div className="flex items-center mb-4">
                  <img
                    className="w-12 h-12 rounded-full mr-4"
                    src="profile-pic.jpg"
                    alt="Profile"
                  />
                  <div>
                    <h4 className="text-gray-800 font-bold">John Doe</h4>
                    <p className="text-gray-600">john.doe@example.com</p>
                  </div>
                </div>
                <div className="mb-2">
                  <p className="text-gray-600">
                    Phone Number: <span className="font-bold">1234567890</span>
                  </p>
                  <p className="text-gray-600">
                    Username: <span className="font-bold">johndoe</span>
                  </p>
                  <p className="text-gray-600">
                    Password: <span className="font-bold">********</span>
                  </p>
                </div>
                <div className="flex justify-between">
                  <button className="bg-gray-200 text-gray-800 px-3 py-2 rounded hover:bg-gray-300">
                    Logout
                  </button>
                  <button className="bg-red-200 text-red-800 px-3 py-2 rounded hover:bg-red-300">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="flex justify-start pl-6 py-4">
        <img src={logo} alt="Logo" className="h-30 w-30" />
        <div className="relative flex items-center bg-white rounded-lg border border-gray-300 px-4 py-2 h-10 w-75 ml-[20.5rem]">
          <button className="mr-2 text-gray-600">
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <input
            type="text"
            placeholder="Search"
            className="border-none outline-none flex-grow pl-4 pr-8"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {searchValue && (
            <button
              className="absolute right-2 text-gray-500 focus:outline-none"
              onClick={clearSearch}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
        </div>
      </div>

      <div className="flex justify-center pl-6 py-4">
        <div className="relative">
          <select
            value={selectedOption}
            onChange={(e) => handleOptionSelect(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 outline-none"
          >
            <option value="">Select an option</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
        <button class=" h-16 w-40 bg-slate-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute right-2.5 ">
        Add Test
        </button>
      </div>

      
    </div>
  );
};

export default SubjectTeacher;
