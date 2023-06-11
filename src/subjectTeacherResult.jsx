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
import logo from "../src/images/rcms_logo_small.jpg";
//import random_profile_pic1 from "../src/images/random_profile_pic.jpg";
//import random_profile_pic2 from "../src/images/random_profile_pic2.jpg";

const SubjectTeacher = () => {
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
      image: "",
      studentName: "Swapnil Rajgadkar",
      rollNo: "01",
      birthDate: "30-09-1998",
      parentDetails: "Subhash Rajgadkar (Father)",
      address: "Pragati Nagar, Wani-445304",
    },
    {
      id: 2,
      image: "",
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
    <div style={{ backgroundColor: "white" }}>
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
             <p>There are 20 students in the <strong>Class 1st</strong></p>
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
                      <option value="1">Standard 1</option>
                      <option value="2">Standard 2</option>
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
                      className="rounded-full bg-purple-900 text-white px-6 py-2 flex flex-col items-center justify-center w-40 h-20"
                      style={{ fontSize: "13px", borderRadius: "8px" }}
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
                          <div className="ml-4">
                            <div
                              className="col-span-2 "
                              style={{ width: "50px" }}
                            >
                              <strong>Marks:</strong> <br />
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

export default SubjectTeacher;