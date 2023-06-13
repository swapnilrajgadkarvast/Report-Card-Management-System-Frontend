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

const Admin = () => {
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
              <button className="ml-2 rounded-full bg-purple-900 text-white px-4 py-2">
                Delete Student
              </button>
            </div>
            <div className="grid grid-cols-12 mt-4 ml-1">
              <div className="col-span-3">
                <div className="flex items-center">
                  <div className="mr-4">
                    <select
                      value={selectedStandard}
                      onChange={handleStandardChange}
                      className="rounded-lg border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      style={{ width: "230px", padding: "8px" }}
                    >
                      <option value="">Select Standard</option>
                      <option value="1">Standard 1</option>
                      <option value="2">Standard 2</option>
                      {/* Add more standard options as needed */}
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-span-3">
                <div className="flex items-center">
                  <div>
                    <select
                      value={selectedDivision}
                      onChange={handleDivisionChange}
                      className="rounded-lg border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      style={{ width: "230px", padding: "8px" }}
                    >
                      <option value="">Select Division</option>
                      <option value="A">Division A</option>
                      <option value="B">Division B</option>
                      {/* Add more division options as needed */}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className=" grid grid-cols-12 mt-4 ml-1">
              <div className="col-span-10 flex">
                <div className="mt-4">
                  <div className="bg-purple-300 p-3 rounded-lg">
                    <form onSubmit={handleSubmit}>
                      <div className="grid px-8 grid-cols-6 lg:grid-cols-12 gap-4">
                        <div className="col-span-4">
                          <label htmlFor="student_name">Student Name </label>
                          <br />
                          <input
                            type="text"
                            id="student_name"
                            name="student_name"
                            value={studentData.student_name}
                            onChange={handleInputChange}
                            className="rounded-lg border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        <div className="col-span-4">
                          <label htmlFor="birth_date">Birth Date </label>
                          <br />
                          <input
                            type="text"
                            id="birth_date"
                            name="birth_date"
                            value={studentData.birth_date}
                            onChange={handleInputChange}
                            className="rounded-lg border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        <div className="col-span-4">
                          <label htmlFor="parent_name">Parent Name </label>
                          <br />
                          <input
                            type="text"
                            id="parent_name"
                            name="parent_name"
                            value={studentData.parent_name}
                            onChange={handleInputChange}
                            className="rounded-lg border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        <div className="col-span-4">
                          <label htmlFor="contact">Contact </label>
                          <br />
                          <input
                            type="text"
                            id="contact"
                            name="contact"
                            value={studentData.contact}
                            onChange={handleInputChange}
                            className="rounded-lg border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        <div className="col-span-4">
                          <label htmlFor="roll_no">Roll No </label>
                          <br />
                          <input
                            type="text"
                            id="roll_no"
                            name="roll_no"
                            value={studentData.roll_no}
                            onChange={handleInputChange}
                            className="rounded-lg border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        <div className="col-span-4">
                          <label htmlFor="email">Email </label>
                          <br />
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={studentData.email}
                            onChange={handleInputChange}
                            className="rounded-lg border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        <div className="col-span-8">
                          <label htmlFor="address">Address </label>
                          <br />
                          <input
                            type="text"
                            id="address"
                            name="address"
                            value={studentData.address}
                            onChange={handleInputChange}
                            className="rounded-lg border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            style={{ width: "473px" }}
                          />
                        </div>
                        <div className="col-span-4">
                          <label htmlFor="image">Upload Image </label>
                          <br />
                          <input
                            type="file"
                            id="image"
                            name="image"
                            onChange={handleImageUpload}
                            className="focus:outline-none"
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
                    >
                      <FontAwesomeIcon
                        icon={faPlus}
                        className="text-white"
                        style={{ fontSize: "24px" }}
                      />
                      <span style={{ marginTop: "4px" }}>Add Student</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-12 mt-4 ml-1">
              <div className="col-span-10 grid">
                <div className="bg-purple-300 p-3 rounded-lg">
                  <div className="mt-4 ml-1">
                    {studentDatas.map((student) => (
                      <div
                        className="bg-purple-300 w-full p-3 rounded-lg mb-4 border border-white"
                        key={student.id}
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
                                {student.studentName}
                              </div>
                              <div className="col-span-2">
                                <strong>Roll No:</strong> <br />
                                <FontAwesomeIcon
                                  icon={faAward}
                                  className="text-purple-900 mr-2"
                                />
                                {student.rollNo}
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
                              {student.birthDate}
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
                              {student.parentDetails}
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
                              {student.address}
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

export default Admin;
