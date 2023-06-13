import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faSearch,
  faTimes,
  faEdit,
  faTrash,
  faCalendar,
  faUser,
  faMapMarkerAlt,
  faAward,
  faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../images/rcms_logo_small.jpg";
import random_profile_pic1 from "../../images/random_profile_pic.jpg";
import random_profile_pic2 from "../../images/random_profile_pic2.jpg";

import studentTestResultStore from "../store/studentTestResultStore";
import axios from "axios";

const Result = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [selectedStandard, setSelectedStandard] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for handling form submission
  };

  const [student, setStudent] = useState("");
  const [test, setTest] = useState("");

  const {
    studentTestResult,
    loading,
    error,
    getStudentTestResult,
    addStudentTestResult,
    deleteStudentTestResult,
  } = studentTestResultStore();

  useEffect(() => {
    // Assuming the subject teacher's subject ID for English is "646363164d9b660377d2aec6"
    getStudentTestResult("646363164d9b660377d2aec6").catch((error) => {
      // Handle the error, e.g., display an error message
      console.log("Error fetching test results:", error);
    });
  }, []);

  const handleAddStudentResult = (e) => {
    e.preventDefault();
    addStudentTestResult(student, test);
    setStudent("");
    setTest("");
  };

  const studentData = studentTestResultStore((state) => state.studentData);

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

            <div className=" grid grid-cols-12 mt-10 ml-1">
              <div className="col-span-10 flex">
                <div className="mt-4">
                  <div className="bg-purple-300 p-3 rounded-lg">
                    <form onSubmit={handleSubmit}>
                      <div className="grid px-8 grid-cols-6 lg:grid-cols-12 gap-4">
                        <div className="col-span-6">
                          <label htmlFor="student_name">Student &nbsp; </label>

                          <select
                            value={selectedStandard}
                            onChange={handleStandardChange}
                            className="rounded-lg border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            style={{ width: "230px", padding: "8px" }}
                          >
                            <option value="">Select Student </option>
                            <option value="1">Swapnil Rajgadkar</option>
                            <option value="2">Kshama Khamkar</option>
                            {/* Add more standard options as needed */}
                          </select>
                        </div>
                        <div className="col-span-6">
                          <label htmlFor="birth_date">Test &nbsp;</label>

                          <select
                            value={selectedDivision}
                            onChange={handleDivisionChange}
                            className="rounded-lg border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            style={{ width: "230px", padding: "8px" }}
                          >
                            <option value="">Select Test</option>
                            <option value="A">Unit Test 1</option>
                            <option value="B">Unit Test 2</option>
                            {/* Add more division options as needed */}
                          </select>
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
                      className="rounded-full bg-purple-900 text-white px-6 py-2 flex flex-col items-center justify-center w-40 h-16"
                      style={{ fontSize: "13px", borderRadius: "8px" }}
                      onClick={handleAddStudentResult}
                    >
                      <FontAwesomeIcon
                        icon={faPlus}
                        className="text-white"
                        style={{ fontSize: "24px" }}
                      />
                      <span style={{ marginTop: "4px" }}>Add Report</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-12 mt-4 ml-1">
              <div className="col-span-12 grid">
                <div className="bg-purple-300 p-3 rounded-lg">
                  <div className="mt-4 ml-1">
                    {studentTestResult.map((studentTestResult) => {
                      const student = studentData[0];

                      if (!student) {
                        return null; // Skip rendering if student data is not available
                      }

                      return (
                        <div
                          className="bg-purple-300 w-full p-3 rounded-lg mb-4 border border-white"
                          key={studentTestResult._id}
                        >
                          <div className="flex items-start">
                            <div className="col-span-2 grid">
                              <img
                                src={student.image}
                                alt="Student"
                                className="w-36 border h-28"
                              />
                            </div>
                            <div className="ml-4">
                              <div
                                className="grid grid-cols-2"
                                style={{ width: "160px" }}
                              >
                                <div className="col-span-2">
                                  <strong>Student:</strong> <br />
                                  <FontAwesomeIcon
                                    icon={faUserGraduate}
                                    className="text-purple-900 mr-2"
                                  />
                                  {student.firstName} {student.lastName}
                                </div>
                                <div className="col-span-2">
                                  <strong>Roll No:</strong> <br />
                                  <FontAwesomeIcon
                                    icon={faAward}
                                    className="text-purple-900 mr-2"
                                  />
                                  {student.rollNumber}
                                </div>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div
                                className="col-span-2"
                                style={{ width: "130px" }}
                              >
                                <strong>Birth Date :</strong> <br />
                                <FontAwesomeIcon
                                  icon={faCalendar}
                                  className="text-purple-900 mr-2"
                                />
                                {student.dateOfBirth}
                              </div>
                            </div>
                            <div className="ml-4">
                              <div
                                className="col-span-2"
                                style={{ width: "160px" }}
                              >
                                <strong>Parent Details:</strong> <br />
                                <FontAwesomeIcon
                                  icon={faUser}
                                  className="text-purple-900 mr-2"
                                />
                                {student.parent.firstName}{" "}
                                {student.parent.lastName} - (
                                {student.parent.relationship})
                              </div>
                            </div>
                            <div className="ml-4">
                              <div
                                className="col-span-2"
                                style={{ width: "170px" }}
                              >
                                <strong>Address:</strong> <br />
                                <FontAwesomeIcon
                                  icon={faMapMarkerAlt}
                                  className="text-purple-900 mr-2"
                                />
                                {student.parent.addressLine1}
                              </div>
                            </div>
                            <div className="ml-4">
                              <div
                                className="col-span-2 "
                                style={{ width: "50px" }}
                              >
                                <strong>Marks:</strong> <br />
                                {studentTestResult.obtainedMarks}
                                <input
                                  type="text"
                                  placeholder=""
                                  className="bg-purple-300 w-10 h-10 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                              </div>
                            </div>
                            <div className="ml-4 flex items-center">
                              <button className="rounded-full bg-purple-900 text-white px-6 py-2 flex flex-col items-center justify-center mr-2">
                                <FontAwesomeIcon
                                  icon={faEdit}
                                  style={{ fontSize: "24px" }}
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
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

export default Result;


