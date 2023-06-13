import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faSearch,
  faTimes,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../images/rcms_logo_small.jpg";
//import random_profile_pic1 from "../images/random_profile_pic.jpg";
//import random_profile_pic2 from "../images/random_profile_pic2.jpg";
import { useEffect } from "react";
import gradesStore from "../stores/gradesStore";
import Modal from "../modals/Modal";

const Grades = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalGradeId, setModalGradeId] = useState("");
  const [modalGradeName, setModalGradeName] = useState("");
  const [modalGradeStart, setModalGradeStart] = useState("");
  const [modalGradeEnd, setModalGradeEnd] = useState("");

  const openModal = (grade) => {
    setIsOpen(true);
    setModalGradeId(grade._id);
    setModalGradeName(grade.name);
    setModalGradeStart(grade.start);
    setModalGradeEnd(grade.end);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalGradeId("");
    setModalGradeName("");
    setModalGradeStart("");
    setModalGradeEnd("");
  };

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

  const [name, setName] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const {
    grades,
    loading,
    error,
    getGrades,
    addGrade,
    deleteGrade,
    updateGrade,
  } = gradesStore();
  useEffect(() => {
    getGrades();
  }, [getGrades]);

  const handleClick = (e) => {
    e.preventDefault();
    const grade = {
      name,
      start,
      end,
    };
    console.log(grade);
    addGrade(grade);
    setName("");
    setStart("");
    setEnd("");
  };

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
    <>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        data={modalGradeId}
        data2={modalGradeName}
        data3={modalGradeStart}
        data4={modalGradeEnd}
      >
        <div className="mb-2 bg-slate-200">
          <div className="h-10 w-40 mb-2">
            <h2 className="text-xl ">Enter Grade</h2>
          </div>
          <div className="mb-2">
            <label className="ml-8">Enter Name :</label>
            <input
              type="text"
              value={modalGradeName}
              onChange={(e) => {
                setModalGradeName(e.target.value);
              }}
              className="mr-2 rounded-lg border border-gray-300 px-2 py-1
                             focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="mb-2">
            <label>Enter Min Marks :</label>
            <input
              type="text"
              value={modalGradeStart}
              onChange={(e) => {
                setModalGradeStart(e.target.value);
              }}
              className="rounded-lg border border-gray-300 px-2 py-1
                             focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label>Enter Max Marks :</label>
            <input
              type="text"
              value={modalGradeEnd}
              onChange={(e) => {
                setModalGradeEnd(e.target.value);
              }}
              className="rounded-lg border border-gray-300 px-2 py-1
                             focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
        <button
          className="rounded-full bg-purple-900 text-white px-6 py-2 
                            flex flex-col items-center justify-center"
          onClick={() =>{
            console.log(modalGradeName);
            updateGrade(modalGradeId, {
              name:modalGradeName,
              start:modalGradeStart,
              end:modalGradeEnd,
            })}
          }
        >
          Update Grade
        </button>
      </Modal>
      <div style={{ backgroundColor: "white" }}>
        <div className="container">
          <div className="grid grid-cols-12">
            <div className="col-span-2">
              <img src={logo} alt="Logo" className="w-44 h-20" />
            </div>
            <div className="col-span-10">
              <div className="flex items-center justify-end mt-4  ">
                <div className="relative mb-10">
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
                <div className="col-span-3"></div>
                <div className="col-span-3"></div>
              </div>
              <div className=" grid grid-cols-12 mt-4 ml-1">
                <div className="col-span-10 flex">
                  <div className="mt-4">
                    <div className="bg-purple-300 p-3 rounded-lg">
                      <div className="grid grid-cols-2 gap-16">
                        <div>
                          <div className="flex items-center">
                            <span className="font-bold text-lg mr-2 ml-2">
                              Grade{" "}
                            </span>
                            <div className="mr-4 ml-2">
                              <input
                                type="text"
                                placeholder="Enter Grade"
                                id="grade_name"
                                name="grade_name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="rounded-lg border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                style={{ width: "230px", padding: "8px" }}
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center">
                            <span className="font-bold text-lg mr-2 ml-2">
                              Min{" "}
                            </span>
                            <div className="mr-4 ml-2">
                              <input
                                type="text"
                                placeholder=""
                                id="min_marks"
                                name="max_martks"
                                value={start}
                                onChange={(e) => setStart(e.target.value)}
                                className="rounded-lg border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                style={{ width: "100px", padding: "8px" }}
                              />
                            </div>
                            <span className="font-bold text-lg mr-2 ml-2">
                              Max{" "}
                            </span>
                            <div className="mr-4 ml-2">
                              <input
                                type="text"
                                placeholder=""
                                id="max_marks"
                                name="max_marks"
                                value={end}
                                onChange={(e) => setEnd(e.target.value)}
                                className="rounded-lg border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                style={{ width: "100px", padding: "8px" }}
                              />
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
                        className="rounded-full bg-purple-900 text-white px-6 py-2 flex flex-col items-center justify-center"
                        style={{
                          fontSize: "13px",
                          borderRadius: "8px",
                          width: "100px",
                        }}
                        onClick={handleClick}
                      >
                        <FontAwesomeIcon
                          icon={faPlus}
                          className="text-white"
                          style={{ fontSize: "24px" }}
                        />
                        <span style={{ marginTop: "4px" }}>Add Grade</span>
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
                      {grades.map((grade) => (
                        <div
                          className="bg-purple-300 w-full p-3 rounded-lg mb-4 border border-white"
                          key={grade._id}
                        >
                          <div className="flex items-start">
                            <div className="ml-4">
                              <div
                                className="col-span-2 text-gray-400"
                                style={{ width: "100px" }}
                              >
                                <strong>Grade </strong> <br />
                              </div>
                              <div
                                className="col-span-2"
                                style={{ width: "100px" }}
                              >
                                <strong>{grade.name}</strong> <br />
                              </div>
                            </div>

                            <div className="ml-4">
                              <div
                                className="col-span-2 text-gray-400"
                                style={{ width: "100px" }}
                              >
                                <strong>Min Marks </strong> <br />
                              </div>
                              <div
                                className="col-span-2"
                                style={{ width: "150px" }}
                              >
                                <strong>{grade.start}</strong> <br />
                              </div>
                            </div>

                            <div className="ml-4">
                              <div
                                className="col-span-2 text-gray-400"
                                style={{ width: "100px" }}
                              >
                                <strong>Max Marks </strong> <br />
                              </div>
                              <div
                                className="col-span-2"
                                style={{ width: "500px" }}
                              >
                                <strong>{grade.end}</strong> <br />
                              </div>
                            </div>

                            <div className="ml-4 flex items-center">
                              <button
                                className="rounded-full bg-purple-900 text-white px-6 py-2
                             flex flex-col items-center justify-center mr-2"
                                onClick={() => openModal(grade)}
                              >
                                <FontAwesomeIcon
                                  icon={faEdit}
                                  style={{ fontSize: "24px" }}
                                />
                              </button>
                              <button
                                className="rounded-full bg-purple-900 text-white px-6 py-2 
                            flex flex-col items-center justify-center "
                                onClick={() => deleteGrade(grade._id)}
                              >
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
    </>
  );
};

export default Grades;
