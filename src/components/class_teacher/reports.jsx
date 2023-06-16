import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faTimes,
  faUser,
  faUserGraduate,
  faPhone,
  faEnvelope,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../images/rcms_logo_small.jpg";
import random_profile_pic1 from "../../images/random_profile_pic.jpg";
import random_profile_pic2 from "../../images/random_profile_pic2.jpg";
import reportStore from "../../stores/reportStore";
import { useEffect } from "react";

const Reports = () => {
  const {
    students,
    standards,
    divisions,
    tests,
    getReports,
    // deleteStudent,
    // updateStudent,
    // addStudent,
  } = reportStore();
  useEffect(() => {
    getReports();
  }, []);

  let div="";
  const [showProfile, setShowProfile] = useState(false);
  const [selectedStandardReport, setSelectedStandard] = useState("");
  const [selectedDivisionReport, setSelectedDivision] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedTest, setSelectedTest] = useState("");
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
    console.log(e.target.value);
    setSelectedStandard(e.target.value);
     console.log(selectedStandardReport);
     console.log(students);
    const searchObjectStudent = students.filter(
      (studentobj) => studentobj.standard === e.target.value
    );

    const searchObjectDivisionwiseStudent = searchObjectStudent.filter(
      (studentobj) => studentobj.division === div
    );
    
    
   console.log(searchObjectStudent);
   console.log(searchObjectDivisionwiseStudent)
    
  };

  const handleDivisionChange = (e) => {
    setSelectedDivision(e.target.value);
    div=e.target.vlaue
  };

  const handleStudentChange = (e) => {
    setSelectedStudent(e.target.value);
  };

  const handleTestChange = (e) => {
    setSelectedTest(e.target.value);
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
      image: random_profile_pic1,
      studentName: "Swapnil Rajgadkar",
      rollNo: "01",
      birthDate: "30-09-1998",
      parentDetails: {
        parentName: "Subhash Rajgadkar",
        phoneNumber: 8889991110,
        parentEmail: "subhash@gmail.com",
        parentAddress: "Pragati Nagar, Wani-445304",
        relation: "Father",
      },
      marks: {
        English: 67,
        Hindi: 78,
        Marathi: 63,
        Science: 79,
        Math: 83,
      },
      totalMarks: 370,
      percentage: 74,
      grade: "Distinction",
    },
    {
      id: 2,
      image: random_profile_pic2,
      studentName: "Kshama Khamkar",
      rollNo: "02",
      birthDate: "14-02-1997",
      parentDetails: {
        parentName: "Rama Khamkar",
        phoneNumber: 8889991110,
        parentEmail: "rama@gmail.com",
        parentAddress: "Pashan, Pune",
        relation: "Mother",
      },
      marks: {
        English: 67,
        Hindi: 78,
        Marathi: 63,
        Science: 79,
        Math: 83,
      },
      totalMarks: 370,
      percentage: 74,
      grade: "Pass",
    },
    {
      id: 3,
      image: "student3.jpg",
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
                      value={selectedStandardReport}
                      onChange={handleStandardChange}
                      className="rounded-lg border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      style={{ width: "230px", padding: "8px" }}
                    >
                      <option value="">Select Standard</option>
                      {standards.map((standard) => (
                        <option key={standard._id} value={standard._id}>
                          {standard.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-span-3">
                <div className="flex items-center">
                  <div>
                    <select
                      value={selectedDivisionReport}
                      onChange={handleDivisionChange}
                      className="rounded-lg border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      style={{ width: "230px", padding: "8px" }}
                    >
                      <option value="">Select Division</option>
                      {divisions.map((division) => (
                        <option key={division._id} value={division._id}>
                          {division.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className=" grid grid-cols-12 mt-4 ml-1">
              <div className="col-span-10 flex">
                <div className="mt-4">
                  <div className="bg-purple-300 p-3 rounded-lg">
                    <div className="grid grid-cols-2 gap-16">
                      <div>
                        <div className="flex items-center">
                          <span className="font-bold text-lg mr-2 ml-2">
                            Student{" "}
                          </span>
                          <div className="mr-4 ml-2">
                            <select
                              value={selectedStudent}
                              onChange={handleStudentChange}
                              className="rounded-lg border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                              style={{ width: "230px", padding: "8px" }}
                            >
                              <option value="">Select Student</option>
                              {students.map((student) => (
                                <option key={student._id} value={student._id}>
                                  {student.firstName + " " + student.lastName}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center">
                          <span className="font-bold text-lg mr-2 ml-2">
                            Test{" "}
                          </span>
                          <div className="mr-4 ml-2">
                            <select
                              value={selectedTest}
                              onChange={handleTestChange}
                              className="rounded-lg border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                              style={{ width: "230px", padding: "8px" }}
                            >
                              <option value="">Select Test</option>
                              {tests.map((test) => (
                                <option key={test._id} value={test._id}>
                                  {test.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-2">
                <div className="mt-4">
                  <div className="col-span-2 ml-6 flex items-end justify-end">
                    <button
                      type="submit"
                      className="rounded-full bg-purple-900 text-white w-full h-full px-6 py-2 flex flex-col items-center justify-center"
                      style={{ fontSize: "13px", borderRadius: "8px" }}
                    >
                      <span style={{ marginTop: "4px" }}>
                        Generate <br />
                        Report
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="grid grid-cols-12 mt-4 ml-1 bg-purple-300 p-3 rounded-lg"> */}
            {studentDatas
              .filter((student) => student.id === 2)
              .map((student) => (
                <div
                  className="grid grid-cols-12 mt-4 ml-1 bg-purple-300 p-3 rounded-lg"
                  key={student.id}
                >
                  <div className="col-span-2 grid" style={{ height: "160px" }}>
                    <img
                      src={student.image}
                      alt="Student"
                      className="w-full h-auto mb-2"
                    />
                    <div className="text-center">
                      <FontAwesomeIcon
                        icon={faUserGraduate}
                        className="text-purple-900 mr-2"
                      />
                      <strong>{student.studentName}</strong>
                    </div>
                  </div>

                  <div className="col-span-6 grid flex-cols-5 ml-8">
                    <div className="text-start mb-2">
                      <strong>Roll No: {student.rollNo}</strong>
                    </div>
                    <table className="w-full h-20 border border-white mb-2">
                      <thead>
                        <tr>
                          <th className="border-b border-r border-white text-center">
                            {Object.keys(student.marks)[0]}
                          </th>
                          <th className="border-b border-r border-white text-center">
                            {Object.keys(student.marks)[1]}
                          </th>
                          <th className="border-b border-r border-white text-center">
                            {Object.keys(student.marks)[2]}
                          </th>
                          <th className="border-b border-r border-white text-center">
                            {Object.keys(student.marks)[3]}
                          </th>
                          <th className="border-b border-white text-center">
                            {Object.keys(student.marks)[4]}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border-b border-r border-white text-center font-bold">
                            {Object.values(student.marks)[0]}/100
                          </td>
                          <td className="border-b border-r border-white text-center font-bold">
                            {Object.values(student.marks)[1]}/100
                          </td>
                          <td className="border-b border-r border-white text-center font-bold">
                            {Object.values(student.marks)[2]}/100
                          </td>
                          <td className="border-b border-r border-white text-center font-bold">
                            {Object.values(student.marks)[3]}/100
                          </td>
                          <td className="border-b border-white text-center font-bold">
                            {Object.values(student.marks)[4]}/100
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="flex justify-between mt-4">
                      <div>
                        Total Marks: <br />
                        <span className="font-bold">{student.totalMarks}</span>
                      </div>
                      <div>
                        Percentage : <br />
                        <span className="font-bold">{student.percentage}%</span>
                      </div>
                      <div>
                        Grade: <br />
                        <span
                          className={
                            student.grade === "Fail"
                              ? "font-bold text-red-600"
                              : student.grade === "Pass"
                              ? "font-bold text-green-600"
                              : "font-bold text-purple-900"
                          }
                        >
                          {student.grade}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2">
                      Parent Details :
                      <div className="flex flex-col">
                        <div>
                          <FontAwesomeIcon
                            icon={faUser}
                            className="text-purple-900 mr-2"
                          />
                          <span className="font-bold">
                            {student.parentDetails.parentName} (
                            {student.parentDetails.relation})
                          </span>
                        </div>
                        <div>
                          <FontAwesomeIcon
                            icon={faPhone}
                            className="text-purple-900 mr-2"
                          />
                          <span className="font-bold">
                            {student.parentDetails.phoneNumber}
                          </span>
                        </div>
                        <div>
                          <FontAwesomeIcon
                            icon={faEnvelope}
                            className="text-purple-900 mr-2"
                          />
                          <span className="font-bold">
                            {student.parentDetails.parentEmail}
                          </span>
                        </div>
                        <div>
                          <FontAwesomeIcon
                            icon={faLocationDot}
                            className="text-purple-900 mr-2"
                          />
                          <span className="font-bold">
                            {student.parentDetails.parentAddress}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-4 ml-8">
                    <strong>Remarks </strong>
                    <input
                      type="text"
                      className="w-full h-64 rounded-md border-gray-300 border px-3 py-1 mb-2"
                      placeholder="Enter remarks..."
                    />
                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="rounded-md bg-white text-purple-900 px-12 py-2 mr-2"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded-md bg-purple-900 text-white px-12 py-2"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Reports;
