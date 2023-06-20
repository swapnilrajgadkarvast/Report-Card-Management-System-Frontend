import React, { useState } from "react";
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

import { useEffect } from "react";
import logo from "../../images/rcms_logo_small.jpg";
import random_profile_pic1 from "../../images/random_profile_pic.jpg";
import random_profile_pic2 from "../../images/random_profile_pic2.jpg";
import studentStore from "../../stores/studentStore";
import Modal from "../../modals/Modal";
import Modal1 from "../../modals/Modal";

const Students = () => {
  const {
    standards,
    divisions,
    students,
    getStudents,
    deleteStudent,
    updateStudent,
    addStudent,
  } = studentStore();
  useEffect(() => {
    getStudents();
  }, []);

  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedStandard, setSelectedStandard] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);

  const [selectedDivision, setSelectedDivision] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [StudentId, setStudentId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [standard, setStandard] = useState("");
  const [division, setDivision] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [year, setYear] = useState("");
  const [dateOfBirth, setDOB] = useState("");
  //const [parents, setParentsDetails] = useState("");
  const [pfirstName, setpfirstName] = useState("");
  const [plasttName, setplasttName] = useState("");
  const [pphone, setpphone] = useState("");
  const [pemail, setpemail] = useState("");
  const [paddressLine1, setpaddressLine1] = useState("");
  const [paddressLine2, setpaddressLine2] = useState("");
  const [parea, setparea] = useState("");
  const [pcity, setpcity] = useState("");
  const [pstate, setpstate] = useState("");
  const [pzipcode, setpzipcode] = useState("");
  const [prelationship, setprelationship] = useState("");

  const openModal1 = () => {
    setIsOpen1(true);
  };

  const closeModal1 = () => {
    setIsOpen1(false);
  };

  const openModal = (filteredStudent) => {
    setIsOpen(true);
    setStudentId(filteredStudent._id);
    setFirstName(filteredStudent.firstName);
    setMiddleName(filteredStudent.middleName);
    setLastName(filteredStudent.lastName);
    // setStandard(filteredStudent.standard);
    //setDivision(filteredStudent.division);
    setSelectedStandard(filteredStudent.standard);
    setSelectedDivision(filteredStudent.division);
    setRollNumber(filteredStudent.rollNumber);
    setYear(filteredStudent.year);
    setDOB(filteredStudent.dateOfBirth);
    setpfirstName(filteredStudent.parent.firstName);
    setplasttName(filteredStudent.parent.lastName);
    setpphone(filteredStudent.parent.phone);
    setpemail(filteredStudent.parent.email);
    setpaddressLine1(filteredStudent.parent.addressLine1);
    setpaddressLine2(filteredStudent.parent.addressLine2);
    setparea(filteredStudent.parent.area);
    setpcity(filteredStudent.parent.city);
    setpstate(filteredStudent.parent.state);
    setpzipcode(filteredStudent.parent.zipcode);
    setprelationship(filteredStudent.parent.relationship);
  };

  const closeModal = () => {
    setIsOpen(false);
    //setModalRoleId("");
    //setModalRoleName("");
  };

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
  };

  console.log("students");
  console.log(students);

  const handleStandardChange = (event) => {
    const selectedStandard = event.target.value;
    setSelectedStandard(selectedStandard);

    // Filter students based on the selected standard and division
    const filteredStudents = students.filter(
      (student) =>
        student.standard === selectedStandard &&
        student.division === selectedDivision
    );

    console.log(
      "Filter students based on the selected standard and division -->"
    );
    console.log(filteredStudents);

    setSelectedStudent("");
    setFilteredStudents(filteredStudents);
  };

  const handleDivisionChange = (event) => {
    const selectedDivision = event.target.value;
    setSelectedDivision(selectedDivision);

    // Filter students based on the selected standard and division
    const filteredStudents = students.filter(
      (student) =>
        student.standard === selectedStandard &&
        student.division === selectedDivision
    );

    console.log(
      "Filter students based on the selected standard and division -->"
    );
    console.log(filteredStudents);

    setSelectedStudent("");
    setFilteredStudents(filteredStudents);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        // Other props...

        className="fixed inset-0 flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-black opacity-50"
      >
        <div className="bg-white p-4 max-w-full max-h-full overflow-auto">
          <div className="mb-2 bg-slate-200">
            <div className="h-10 w-60 mb-2">
              <h2 className="text-xl text-center">Update Student Details</h2>
            </div>
            <div className="mb-2">
              <label className="ml-8">Enter First Name:</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                className="mr-2 rounded-lg border border-gray-300 px-2 py-1
                   focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="mb-2">
              <label className="ml-8">Enter Middle Name :</label>
              <input
                type="text"
                value={middleName}
                onChange={(e) => {
                  setMiddleName(e.target.value);
                }}
                className="rounded-lg border border-gray-300 px-2 py-1
                   focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="mb-2">
              <label className="ml-8">Enter Last Name :</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                className="rounded-lg border border-gray-300 px-2 py-1
                   focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="mb-2">
              <label className="ml-16">Standard :</label>
              <select
                value={selectedStandard}
                onChange={handleStandardChange}
                placeholder="select standard"
                className="rounded-lg border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                style={{ width: "230px", padding: "8px" }}
              >
                // <option value="">Select Standard</option>
                {standards.map((standard) => (
                  <option key={standard._id} value={standard._id}>
                    {standard.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <label className="ml-16">Division :</label>
              <select
                value={selectedDivision}
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
            <div className="mb-2">
              <label className="ml-16">Roll No :</label>
              <input
                type="text"
                value={rollNumber}
                onChange={(e) => {
                  setRollNumber(e.target.value);
                }}
                className="rounded-lg border border-gray-300 px-2 py-1
                   focus:outline-none focus:ring-2 focus:ring-purple-500 ml-2"
              />
            </div>
            <div className="mb-2">
              <label className="ml-16">Year :</label>
              <input
                type="text"
                value={year}
                onChange={(e) => {
                  setYear(e.target.value);
                }}
                className="rounded-lg border border-gray-300 px-2 py-1
                   focus:outline-none focus:ring-2 focus:ring-purple-500 ml-2"
              />
            </div>
            <div className="mb-2">
              <label className="ml-16"> Birth Date:</label>
              <input
                type="date"
                id="birth_date"
                name="birth_date"
                value={dateOfBirth}
                onChange={(e) => {
                  setDOB(e.target.value);
                }}
                className="rounded-lg border border-gray-300 px-2 py-1 
                          focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="mb-2">
              <label className="ml-16">Parent Information:</label>
              <div className="mb-2">
                <label className="ml-8">Enter First Name :</label>
                <input
                  type="text"
                  value={pfirstName}
                  onChange={(e) => {
                    setpfirstName(e.target.value);
                  }}
                  className="mr-2 rounded-lg border border-gray-300 px-2 py-1
                   focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            <div className="mb-2">
              <label className="ml-8">Enter Last Name :</label>
              <input
                type="text"
                value={plasttName}
                onChange={(e) => {
                  setplasttName(e.target.value);
                }}
                className="mr-2 rounded-lg border border-gray-300 px-2 py-1
                   focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="mb-2">
              <label className="ml-8">Phone :</label>
              <input
                type="text"
                value={pphone}
                onChange={(e) => {
                  setpphone(e.target.value);
                }}
                className="mr-2 rounded-lg border border-gray-300 px-2 py-1
                   focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="mb-2">
              <label className="ml-8">Email :</label>
              <input
                type="text"
                value={pemail}
                onChange={(e) => {
                  setpemail(e.target.value);
                }}
                className="mr-2 rounded-lg border border-gray-300 px-2 py-1
                   focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="mb-2">
              <label className="ml-8">Address Line 1 :</label>
              <input
                type="text"
                value={paddressLine1}
                onChange={(e) => {
                  setpaddressLine1(e.target.value);
                }}
                className="mr-2 rounded-lg border border-gray-300 px-2 py-1
                   focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="mb-2">
              <label className="ml-8">Address Line 2 :</label>
              <input
                type="text"
                value={paddressLine2}
                onChange={(e) => {
                  setpaddressLine2(e.target.value);
                }}
                className="mr-2 rounded-lg border border-gray-300 px-2 py-1
                   focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="mb-2">
              <label className="ml-8">Area :</label>
              <input
                type="text"
                value={parea}
                onChange={(e) => {
                  setparea(e.target.value);
                }}
                className="mr-2 rounded-lg border border-gray-300 px-2 py-1
                   focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="mb-2">
              <label className="ml-8">City :</label>
              <input
                type="text"
                value={pcity}
                onChange={(e) => {
                  setpcity(e.target.value);
                }}
                className="mr-2 rounded-lg border border-gray-300 px-2 py-1
                   focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="mb-2">
              <label className="ml-8">State :</label>
              <input
                type="text"
                value={pstate}
                onChange={(e) => {
                  setpstate(e.target.value);
                }}
                className="mr-2 rounded-lg border border-gray-300 px-2 py-1
                   focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="mb-2">
              <label className="ml-8">Zipcode :</label>
              <input
                type="text"
                value={pzipcode}
                onChange={(e) => {
                  setpzipcode(e.target.value);
                }}
                className="mr-2 rounded-lg border border-gray-300 px-2 py-1
                   focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="mb-2">
              <label className="ml-8">Relationship:</label>
              <input
                type="text"
                value={prelationship}
                onChange={(e) => {
                  setprelationship(e.target.value);
                }}
                className="mr-2 rounded-lg border border-gray-300 px-2 py-1
                   focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button
              className="rounded-full bg-purple-900 text-white px-6 py-2"
              onClick={() => {
                const isActive = true;
                const parent = {
                  firstName: pfirstName,
                  lastName: plasttName,
                  phone: pphone,
                  email: pemail,
                  addressLine1: paddressLine1,
                  addressLine2: paddressLine2,
                  area: parea,
                  city: pcity,
                  state: pstate,
                  zipcode: pzipcode,
                  relationship: prelationship,
                };
                const student = {
                  firstName,
                  middleName,
                  lastName,
                  standard: selectedStandard,
                  division: selectedDivision,
                  rollNumber,
                  year,
                  dateOfBirth,
                  parent,
                  isActive,
                };

                console.log(student);
                updateStudent(StudentId, student);
                closeModal();
              }}
            >
              Update
            </button>
          </div>
        </div>
      </Modal>

      <Modal1
        isOpen={isOpen1}
        onClose={closeModal1}
        // Other props...

        className="fixed inset-0 flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-black opacity-50"
      >
        <div className="bg-white p-4 max-w-full max-h-full overflow-auto">
          <div className="mb-2 bg-slate-200">
            <div className="h-10 w-60 mb-2">
              <h2 className="text-xl text-center">Update Student Details</h2>
            </div>
            <div className="mb-2">
              <label className="ml-8">Enter First Name:</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                className="mr-2 rounded-lg border border-gray-300 px-2 py-1
                   focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="mb-2">
              <label className="ml-8">Enter Middle Name :</label>
              <input
                type="text"
                value={middleName}
                onChange={(e) => {
                  setMiddleName(e.target.value);
                }}
                className="rounded-lg border border-gray-300 px-2 py-1
                   focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="mb-2">
              <label className="ml-8">Enter Last Name :</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                className="rounded-lg border border-gray-300 px-2 py-1
                   focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="mb-2">
              <label className="ml-16">Standard :</label>
              <select
                value={selectedStandard}
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
            <div className="mb-2">
              <label className="ml-16">Division :</label>
              <select
                value={selectedDivision}
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
            <div className="mb-2">
              <label className="ml-16">Roll No :</label>
              <input
                type="text"
                value={rollNumber}
                onChange={(e) => {
                  setRollNumber(e.target.value);
                }}
                className="rounded-lg border border-gray-300 px-2 py-1
                   focus:outline-none focus:ring-2 focus:ring-purple-500 ml-2"
              />
            </div>
            <div className="mb-2">
              <label className="ml-16">Year :</label>
              <input
                type="text"
                value={year}
                onChange={(e) => {
                  setYear(e.target.value);
                }}
                className="rounded-lg border border-gray-300 px-2 py-1
                   focus:outline-none focus:ring-2 focus:ring-purple-500 ml-2"
              />
            </div>
            <div className="mb-2">
              <label className="ml-16"> Birth Date:</label>
              <input
                type="date"
                id="birth_date"
                name="birth_date"
                value={dateOfBirth}
                onChange={(e) => {
                  setDOB(e.target.value);
                }}
                className="rounded-lg border border-gray-300 px-2 py-1 
                          focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="mb-2">
              <label className="ml-16">Parent Information:</label>
              <div className="mb-2">
                <label className="ml-8">Enter First Name :</label>
                <input
                  type="text"
                  value={pfirstName}
                  onChange={(e) => {
                    setpfirstName(e.target.value);
                  }}
                  className="mr-2 rounded-lg border border-gray-300 px-2 py-1
                   focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            <div className="mb-2">
              <label className="ml-8">Enter Last Name :</label>
              <input
                type="text"
                value={plasttName}
                onChange={(e) => {
                  setplasttName(e.target.value);
                }}
                className="mr-2 rounded-lg border border-gray-300 px-2 py-1
                   focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="mb-2">
              <label className="ml-8">Phone :</label>
              <input
                type="text"
                value={pphone}
                onChange={(e) => {
                  setpphone(e.target.value);
                }}
                className="mr-2 rounded-lg border border-gray-300 px-2 py-1
                   focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="mb-2">
              <label className="ml-8">Email :</label>
              <input
                type="text"
                value={pemail}
                onChange={(e) => {
                  setpemail(e.target.value);
                }}
                className="mr-2 rounded-lg border border-gray-300 px-2 py-1
                   focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="mb-2">
              <label className="ml-8">Address Line 1 :</label>
              <input
                type="text"
                value={paddressLine1}
                onChange={(e) => {
                  setpaddressLine1(e.target.value);
                }}
                className="mr-2 rounded-lg border border-gray-300 px-2 py-1
                   focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="mb-2">
              <label className="ml-8">Address Line 2 :</label>
              <input
                type="text"
                value={paddressLine2}
                onChange={(e) => {
                  setpaddressLine2(e.target.value);
                }}
                className="mr-2 rounded-lg border border-gray-300 px-2 py-1
                   focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="mb-2">
              <label className="ml-8">Area :</label>
              <input
                type="text"
                value={parea}
                onChange={(e) => {
                  setparea(e.target.value);
                }}
                className="mr-2 rounded-lg border border-gray-300 px-2 py-1
                   focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="mb-2">
              <label className="ml-8">City :</label>
              <input
                type="text"
                value={pcity}
                onChange={(e) => {
                  setpcity(e.target.value);
                }}
                className="mr-2 rounded-lg border border-gray-300 px-2 py-1
                   focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="mb-2">
              <label className="ml-8">State :</label>
              <input
                type="text"
                value={pstate}
                onChange={(e) => {
                  setpstate(e.target.value);
                }}
                className="mr-2 rounded-lg border border-gray-300 px-2 py-1
                   focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="mb-2">
              <label className="ml-8">Zipcode :</label>
              <input
                type="text"
                value={pzipcode}
                onChange={(e) => {
                  setpzipcode(e.target.value);
                }}
                className="mr-2 rounded-lg border border-gray-300 px-2 py-1
                   focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="mb-2">
              <label className="ml-8">Relationship:</label>
              <input
                type="text"
                value={prelationship}
                onChange={(e) => {
                  setprelationship(e.target.value);
                }}
                className="mr-2 rounded-lg border border-gray-300 px-2 py-1
                   focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button
              className="rounded-full bg-purple-900 text-white px-6 py-2"
              onClick={() => {
                const isActive = true;
                const parent = {
                  firstName: pfirstName,
                  lastName: plasttName,
                  phone: pphone,
                  email: pemail,
                  addressLine1: paddressLine1,
                  addressLine2: paddressLine2,
                  area: parea,
                  city: pcity,
                  state: pstate,
                  zipcode: pzipcode,
                  relationship: prelationship,
                };
                const student = {
                  firstName,
                  middleName,
                  lastName,
                  standard: selectedStandard,
                  division: selectedDivision,
                  rollNumber,
                  year,
                  dateOfBirth,
                  parent,
                  isActive,
                };

                console.log(student);
                addStudent(student);
                closeModal1();
              }}
            >
              Add Student
            </button>
          </div>
        </div>
      </Modal1>

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
              </div>
              <div className="grid grid-cols-12 mt-4 ml-1">
                <div className="col-span-3">
                  <div className="flex items-center"></div>
                </div>
                <div className="col-span-3"></div>
              </div>
              <div className=" grid grid-cols-12 mt-4 ml-1">
                <div className="col-span-10 flex">
                  <div className="mr-4">
                    <select
                      value={selectedStandard}
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
                <div className="col-span-2">
                  <div className="mt-4">
                    <div className="mt-4">
                      <div className="col-span-2 ml-6 flex items-end justify-end">
                        <button
                          type="submit"
                          className="rounded-full bg-purple-900 text-white px-6 py-2 flex flex-col items-center justify-center"
                          style={{ fontSize: "13px", borderRadius: "8px" }}
                          onClick={() => openModal1()}
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
              </div>

              <div className="grid grid-cols-12 mt-4 ml-1">
                <div className="col-span-12 grid">
                  <div className="bg-purple-200 p-3 rounded-lg">
                    <div className="mt-4 ml-1">
                      {filteredStudents.length > 0 ? (
                        filteredStudents.map((filteredStudent) => (
                          <div
                            className="bg-purple-300 w-full p-3 rounded-lg mb-4 border border-white"
                            key={filteredStudent._id}
                          >
                            <div className="flex items-start">
                              <div className="col-span-2 grid">
                                <img
                                  src={""}
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
                                    <strong>Student </strong> <br />
                                    <FontAwesomeIcon
                                      icon={faUserGraduate}
                                      className="text-purple-900 mr-2"
                                    />
                                    {filteredStudent.firstName +
                                      " " +
                                      filteredStudent.lastName}
                                  </div>
                                  <div className="col-span-2">
                                    <strong>Roll No </strong> <br />
                                    <FontAwesomeIcon
                                      icon={faAward}
                                      className="text-purple-900 mr-2"
                                    />
                                    {filteredStudent.rollNumber}
                                  </div>
                                </div>
                              </div>
                              <div className="ml-4">
                                <div
                                  className="col-span-2"
                                  style={{ width: "130px" }}
                                >
                                  <strong>Birth Date </strong> <br />
                                  <FontAwesomeIcon
                                    icon={faCalendar}
                                    className="text-purple-900 mr-2"
                                  />
                                  {filteredStudent.dateOfBirth}
                                </div>
                              </div>
                              <div className="ml-4">
                                <div
                                  className="col-span-2"
                                  style={{ width: "175px" }}
                                >
                                  <strong>Parent Details </strong> <br />
                                  <FontAwesomeIcon
                                    icon={faUser}
                                    className="text-purple-900 mr-2"
                                  />
                                  {filteredStudent.parent.firstName +
                                    " " +
                                    filteredStudent.parent.lastName +
                                    "  " +
                                    filteredStudent.parent.phone +
                                    " " +
                                    filteredStudent.parent.email}
                                </div>
                              </div>
                              <div className="ml-4">
                                <div
                                  className="col-span-2"
                                  style={{ width: "170px" }}
                                >
                                  <strong>Address </strong> <br />
                                  <FontAwesomeIcon
                                    icon={faMapMarkerAlt}
                                    className="text-purple-900 mr-2"
                                  />
                                  {filteredStudent.parent.addressLine1 +
                                    " " +
                                    filteredStudent.parent.addressLine2}
                                </div>
                              </div>
                              <div className="ml-4 flex items-center">
                                <button
                                  className="rounded-full bg-purple-900 text-white px-6 py-2
                             flex flex-col items-center justify-center mr-2"
                                  onClick={() => openModal(filteredStudent)}
                                >
                                  <FontAwesomeIcon
                                    icon={faEdit}
                                    style={{ fontSize: "24px" }}
                                  />
                                </button>
                                <button
                                  className="rounded-full bg-purple-900 text-white px-6 py-2 
                            flex flex-col items-center justify-center"
                                  onClick={() =>
                                    deleteStudent(filteredStudent._id)
                                  }
                                >
                                  <FontAwesomeIcon
                                    icon={faTrash}
                                    style={{ fontSize: "24px" }}
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div style={{ fontWeight: "bold" }}>
                          No Student Data Available <br />
                          (Select Standard & Division To Show Student Data.)
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Students;
