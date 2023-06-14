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

import studentTestResultStore from "../../stores/studentTestResultStore";
import Modal from "../../modals/Modal";

const Result = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedTest, setSelectedTest] = useState("");

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
  };

  const handleLogout = () => {
    // Logic for handling logout
  };

  const handleStudentChange = (e) => {
    setSelectedStudent(e.target.value);
  };

  const handleTestChange = (e) => {
    setSelectedTest(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for handling form submission
  };

  const [student, setStudent] = useState("");
  const [test, setTest] = useState("");

  const {
    studentTestResult,
    studentData,
    testData,
    getStudentTestResult,
    addStudentTestResult,
    updateStudentTestResult,
    deleteStudentTestResult,
  } = studentTestResultStore();

  const [obtainedMarks, setobtainedMarks] = useState("");

  useEffect(() => {
    const subjectTeacher = {
      _id: "6487fbe7f93e19c016ccc90e",
      user: "6475e344901674242794807b",
      role: "6487fb1b0b1c73ffda1d7098",
      standard: "646362d64d9b660377d2aec5",
      division: "646364974d9b660377d2aecb",
      subject: "646363164d9b660377d2aec6",
      year: 2023,
    };

    getStudentTestResult(subjectTeacher).catch((error) => {
      // Handle the error, e.g., display an error message
      console.log("Error fetching test results:", error);
    });
  }, []);

  console.log("studentTestResult.....");
  console.log(studentTestResult);

  const [isOpen, setIsOpen] = useState(false);
  const [modalObtainedMarksId, setModalObtainedMarksId] = useState("");
  const [modalObtainedMarks, setModalObtainedMarks] = useState("");

  const openModal = (studentTestResult) => {
    setIsOpen(true);
    setModalObtainedMarksId(studentTestResult._id);
    setModalObtainedMarks(studentTestResult.obtainedMarks);

    console.log(studentTestResult);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalObtainedMarksId("");
    setModalObtainedMarks("");
  };

  const handleUpdateMarks = async () => {
    try {
      await updateStudentTestResult(modalObtainedMarksId, modalObtainedMarks);
      // Handle success or display a success message
      closeModal();
    } catch (error) {
      // Handle error or display an error message
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className="items-center justify-center">
          <div className="my-5">
            <h2 className="text-lg font-bold">Update Obtained Marks</h2>
            <label htmlFor="obtainedMarks" className="block mt-2 text-sm">
              Obtained Marks:
            </label>
            <input
              type="text"
              id="obtainedMarks"
              value={modalObtainedMarks}
              onChange={(e) => setModalObtainedMarks(e.target.value)}
              className="rounded-lg border border-gray-300 px-2 py-1
                             focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            className="rounded-full bg-purple-900 text-white px-6 py-2 flex flex-col items-center justify-center"
            onClick={handleUpdateMarks}
          >
            Update Marks
          </button>
        </div>
      </Modal>
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
                    There are <strong>{studentTestResult.length}</strong>{" "}
                    students in this Class.
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
                            <label htmlFor="student_name">
                              Student &nbsp;{" "}
                            </label>
                            <select
                              value={selectedStudent}
                              onChange={handleStudentChange}
                              className="rounded-lg border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                              style={{ width: "230px", padding: "8px" }}
                            >
                              <option value="">Select Student</option>
                              {studentData.map((student) => (
                                <option key={student.id} value={student.id}>
                                  {student.firstName} {student.lastName}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="col-span-6">
                            <label htmlFor="testName">Test &nbsp;</label>
                            <select
                              value={selectedTest}
                              onChange={handleTestChange}
                              className="rounded-lg border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                              style={{ width: "230px", padding: "8px" }}
                            >
                              <option value="">Select Test</option>
                              {testData.map((test) => (
                                <option key={test._id} value={test._id}>
                                  {test.name}
                                </option>
                              ))}
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
                        // onClick={handleAddStudentResult}
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
                      {studentData.map((student) => {
                        const studentTestResultData = studentTestResult.filter(
                          (result) => result.student === student._id
                        );
                        return (
                          <div
                            className="bg-purple-300 w-full p-3 rounded-lg mb-4 border border-white"
                            key={student._id}
                          >
                            <div className="flex items-start">
                              <div className="col-span-2 grid">
                                <img
                                  src={random_profile_pic1}
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
                                  style={{ width: "180px" }}
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
                                  className="col-span-2"
                                  style={{ width: "70px" }}
                                >
                                  <strong>Marks:</strong>
                                  {studentTestResultData.length > 0 ? (
                                    studentTestResultData.map((result) => (
                                      <div key={result._id}>
                                        {result.obtainedMarks}
                                        <input
                                          type="text"
                                          placeholder=""
                                          className="bg-purple-300 w-10 h-10 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        />
                                      </div>
                                    ))
                                  ) : (
                                    <span>-</span>
                                  )}
                                </div>
                              </div>

                              <div className="ml-4 flex items-center">
                                <button
                                  className="rounded-full bg-purple-900 text-white px-6 py-2 flex flex-col items-center justify-center mr-2"
                                  onClick={() => openModal(studentTestResult)}
                                >
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
    </>
  );
};

export default Result;
