import React, { useState } from "react";
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
//import random_profile_pic1 from "../images/random_profile_pic.jpg";
//import random_profile_pic2 from "../images/random_profile_pic2.jpg";

const UserRoles = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [selectedStandard, setSelectedStandard] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [studentData, setStudentData] = useState({
    student_name: "",
    birth_date: "",
    parent_name: "",
    contact: "",
    roll_no: "",
    email: "",
    address: "",
    image: null,
  });

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
    // Logic for handling form submission
    console.log(studentData);
    // Reset form after submission
    setStudentData({
      student_name: "",
      birth_date: "",
      parent_name: "",
      contact: "",
      roll_no: "",
      email: "",
      address: "",
      image: null,
    });
  };

  const studentDatas = [
    {
      id: 1,
      image: null,
      studentName: "Swapnil Rajgadkar",
      rollNo: "01",
      birthDate: "30-09-1998",
      parentDetails: "Subhash Rajgadkar (Father)",
      address: "Pragati Nagar, Wani-445304",
    },
    {
      id: 2,
      image: null,
      studentName: "Kshama Khamkar",
      rollNo: "02",
      birthDate: "14-02-1997",
      parentDetails: "Rama Khamkar (Mother)",
      address: "Pashan, Pune",
    },
    {
      id: 3,
      image: "",
      studentName: "Rahul Sharma",
      rollNo: "03",
      birthDate: "14-02-1997",
      parentDetails: "Rohit Sharma (Father)",
      address: "Pashan, Pune",
    },
    // Add more student data here...
  ];

  return (
    <div style={{ backgroundColor: "white" }} className="min-h-screen">
      <div className="container">
        <div className="grid grid-cols-12">
          <div className="col-span-2">
            <img src={logo} alt="Logo" className="w-44 h-20" />
          </div>
          <div className="col-span-10">
            <div className="flex items-end justify-end mt-4">
              <div className="relative">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute top-1/2 left-3 transform -translate-y-1/2
                   text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search"
                  className="rounded-full pl-10 pr-32 py-2 border border-gray-300 
                  focus:outline-none focus:ring-2 focus:ring-purple-500
                   focus:border-transparent"
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2
                   text-gray-400 cursor-pointer"
                />
              </div>
            </div>
            <div className="grid grid-cols-12 mt-4 ml-1"></div>
            <div className=" grid grid-cols-12 mt-4 ml-1">
              <div className="col-span-10 flex">
                <div className="mt-4">
                  <div className="bg-purple-300 p-3 rounded-lg">
                    <form onSubmit={handleSubmit}>
                      <div className="grid px-8 grid-cols-6 lg:grid-cols-12 gap-4">
                        <div className="col-span-8">
                          <label htmlFor="student_name">User </label>
                          <input
                            type="text"
                            id="student_name"
                            name="student_name"
                            value={studentData.student_name}
                            onChange={handleInputChange}
                            className="rounded-lg border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500 "
                            style={{ width: "473px" }}
                          />
                        </div>
                        <div className="col-span-4">
                          <label htmlFor="birth_date">Roles </label>
                          <select
                            value={selectedDivision}
                            onChange={handleDivisionChange}
                            className="rounded-lg border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            style={{ width: "200px", padding: "8px" }}
                          >
                            <option value=""></option>
                            <option value="A">Division A</option>
                            <option value="B">Division B</option>
                            {/* Add more division options as needed */}
                          </select>
                        </div>
                        <div className="col-span-3">
                          <label htmlFor="parent_name">Std </label>

                          <select
                            value={selectedDivision}
                            onChange={handleDivisionChange}
                            className="rounded-lg border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            style={{ width: "100px", padding: "8px" }}
                          >
                            <option value=""></option>
                            <option value="A">Division A</option>
                            <option value="B">Division B</option>
                            {/* Add more division options as needed */}
                          </select>
                        </div>
                        <div className="col-span-3">
                          <label htmlFor="contact">Div </label>

                          <select
                            value={selectedDivision}
                            onChange={handleDivisionChange}
                            className="rounded-lg border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            style={{ width: "100px", padding: "8px" }}
                          >
                            <option value=""></option>
                            <option value="A">Division A</option>
                            <option value="B">Division B</option>
                            {/* Add more division options as needed */}
                          </select>
                        </div>
                        <div className="col-span-3">
                          <label htmlFor="roll_no">Sub </label>

                          <select
                            value={selectedDivision}
                            onChange={handleDivisionChange}
                            className="rounded-lg border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            style={{ width: "100px", padding: "8px" }}
                          >
                            <option value=""></option>
                            <option value="A">Division A</option>
                            <option value="B">Division B</option>
                            {/* Add more division options as needed */}
                          </select>
                        </div>
                        <div className="col-span-3">
                          <label htmlFor="email">Year</label>

                          <select
                            value={selectedDivision}
                            onChange={handleDivisionChange}
                            className="rounded-lg border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            style={{ width: "100px", padding: "8px" }}
                          >
                            <option value=""></option>
                            <option value="A">Division A</option>
                            <option value="B">Division B</option>
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
                      className="rounded-full bg-purple-900 text-white px-6 py-2 flex flex-col items-center justify-center"
                      style={{ fontSize: "13px", borderRadius: "8px" }}
                    >
                      <FontAwesomeIcon
                        icon={faPlus}
                        className="text-white"
                        style={{ fontSize: "24px" }}
                      />
                      <span style={{ marginTop: "4px" }}>Add User</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className=" grid grid-cols-12 mt-4 ml-1"></div>
            <div className="grid grid-cols-12 mt-4 ml-1">
              <div className="col-span-12 grid">
                <div className="bg-purple-300 p-3 rounded-lg">
                  <div className="mt-4 ml-1">
                    {studentDatas.map((student) => (
                      <div
                        className="bg-purple-300 w-full p-3 rounded-lg mb-4 border border-white"
                        key={student.id}
                      >
                        <div className="flex items-start">
                          <div>
                            <div
                              className="col-span-2 text-gray-400"
                              style={{ width: "100px" }}
                            >
                              <strong>Name</strong> <br />
                            </div>
                            <div
                              className="col-span-2"
                              style={{ width: "200px" }}
                            >
                              <strong>Kshama Khamkar</strong> <br />
                            </div>
                          </div>

                          <div>
                            <div
                              className="col-span-2 text-gray-400"
                              style={{ width: "100px" }}
                            >
                              <strong>Role </strong> <br />
                            </div>
                            <div
                              className="col-span-2"
                              style={{ width: "200px" }}
                            >
                              <strong>Subject Teacher</strong> <br />
                            </div>
                          </div>

                          <div>
                            <div
                              className="col-span-2 text-gray-400"
                              style={{ width: "100px" }}
                            >
                              <strong>Std</strong> <br />
                            </div>
                            <div
                              className="col-span-2"
                              style={{ width: "50px" }}
                            >
                              <strong>A</strong> <br />
                            </div>
                          </div>

                          <div className="ml-4">
                            <div
                              className="col-span-2 text-gray-400"
                              style={{ width: "100px" }}
                            >
                              <strong>Div</strong> <br />
                            </div>
                            <div
                              className="col-span-2"
                              style={{ width: "50px" }}
                            >
                              <strong>I</strong> <br />
                            </div>
                          </div>

                          <div className="ml-4">
                            <div
                              className="col-span-2 text-gray-400"
                              style={{ width: "100px" }}
                            >
                              <strong>Subject </strong> <br />
                            </div>
                            <div
                              className="col-span-2"
                              style={{ width: "100px" }}
                            >
                              <strong>Maths</strong> <br />
                            </div>
                          </div>

                          <div className="ml-4">
                            <div
                              className="col-span-2 text-gray-400"
                              style={{ width: "100px" }}
                            >
                              <strong>Year </strong> <br />
                            </div>
                            <div
                              className="col-span-2"
                              style={{ width: "100px" }}
                            >
                              <strong>2023</strong> <br />
                            </div>
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

export default UserRoles;
