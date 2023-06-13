import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faSearch,
  faTimes,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../images/rcms_logo_small.jpg";
import testStore from "../store/testStore";

const Test = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [selectedStandard, setSelectedStandard] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [studentData, setStudentData] = useState({});
  const { tests, loading, error, getTests, addTest } = testStore();

  useEffect(() => {
    getTests();
  }, []);

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
  };

  const handleLogout = () => {
    // Logic for handling logout
  };

  const handleStandardChange = (e) => {
    setSelectedStandard(e.target.value);
  };

  const handleDivisionChange = (e) => {
    setSelectedDivision(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setStudentData((prevState) => ({
      ...prevState,
      image: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add the test using the addTest function from testStore
    addTest(studentData.student_name);
    // Reset the input field
    setStudentData((prevState) => ({
      ...prevState,
      student_name: "",
    }));
  };

  return (
    <div style={{ backgroundColor: "white" }} className="min-h-screen">
      <div className="container">
        <div className="grid grid-cols-12">
          <div className="col-span-2">
            <img src={logo} alt="Logo" className="w-44 h-20" />
          </div>
          <div className="col-span-10">
            <div className="flex items-center justify-between mt-4">
              <div className="relative">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search"
                  className="rounded-full pl-10 pr-32 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                />
              </div>
              <div>
                <p>
                  There are 20 students in the <strong>Class 1st</strong>
                </p>
              </div>
            </div>

            <div className=" grid grid-cols-12 mt-12 ml-1">
              <div className="col-span-10 flex">
                <div className="mt-4 w-full">
                  <div className="bg-purple-300 p-3 rounded-lg">
                    <form onSubmit={handleSubmit}>
                      <div className="grid px-8 grid-cols-6 lg:grid-cols-12 gap-4">
                        <div className="col-span-8">
                          <label htmlFor="student_name">
                            <strong>Test &nbsp; </strong>
                          </label>

                          <input
                            type="text"
                            id="student_name"
                            name="student_name"
                            value={studentData.student_name}
                            placeholder="Enter Test"
                            onChange={handleInputChange}
                            className="rounded-lg border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500 "
                            style={{ width: "400px" }}
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <div className="mt-4">
                  <div className="col-span-2 ml-6 flex items-end justify-end">
                    <button
                      type="submit"
                      className="rounded-full bg-purple-900 text-white px-6 py-2 flex flex-col items-center justify-center"
                      style={{ fontSize: "13px", borderRadius: "8px" }}
                      onClick={handleSubmit}
                    >
                      <FontAwesomeIcon
                        icon={faPlus}
                        className="text-white"
                        style={{ fontSize: "24px" }}
                      />
                      <span style={{ marginTop: "4px" }}>Add Test</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-12 mt-4 ml-1">
              <div className="col-span-12 grid">
                <div className="bg-purple-300 p-3 rounded-lg">
                  <div className="mt-4 ml-1">
                    {tests.map((test) => (
                      <div
                        className="bg-purple-300 w-full p-3 rounded-lg mb-4 border border-white"
                        key={test.id}
                      >
                        <div className="flex items-start">
                          <div className="ml-4">
                            <div
                              className="col-span-2"
                              style={{ width: "100px" }}
                            >
                              <strong>Test </strong> <br />
                            </div>
                          </div>
                          <div
                            className="col-span-2"
                            style={{ width: "700px" }}
                          >
                            <strong>{test.name}</strong> <br />
                          </div>
                          <div className="ml-4 flex items-center">
                            <button className="rounded-full bg-purple-900 text-white px-6 py-2 flex flex-col items-center justify-center mr-2">
                              <FontAwesomeIcon
                                icon={faEdit}
                                style={{ fontSize: "24px" }}
                              />
                            </button>
                            <button className="rounded-full bg-purple-900 text-white px-6 py-2 flex flex-col items-center justify-center">
                              <FontAwesomeIcon
                                icon={faTrash}
                                style={{ fontSize: "24px" }}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
