import React, { useState, useEffect } from "react";
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
import Modal1 from "../../modals/Modal1";
import Modal2 from "../../modals/Modal1";

const loginData = JSON.parse(sessionStorage.getItem("loginData"));
// console.log(loginData);
const role = loginData.user.role;
const user = loginData.user;
console.log("logged in user in subject-teacher/test is");
console.log(user);

const Result = () => {
   
  const handleStudentChange = (e) => {
    setSelectedStudent(e.target.value);
  };

  const handleTestChange = (e) => {
    setSelectedTest(e.target.value);
  };

  const handleGradeChange = (e) => {
    setSelectedGrade(e.target.value);
    console.log("Selected grade is");
    console.log(e.target.value);
  };

    const {
    studentTestResult,
    studentData,
    testData,
    grades,
    getStudentTestResult,
    studentDataForDropdown,
    addStudentTestResult,
    updateStudentTestResult,
    deleteStudentTestResult,
    DataToDisplay,
  } = studentTestResultStore();


  console.log("Data To Display in JSX ");
  console.log(DataToDisplay);

  useEffect(() => {
    getStudentTestResult(user).catch((error) => {
      //  display an error message
      console.log("Error fetching test results:", error);
    });
  }, []);

  // console.log("studentTestResult.....");
  // console.log(studentTestResult);

  const [isOpen, setIsOpen] = useState(false);
  const [obtainedMarksMpodal2, setObtainedMarksModal2] = useState("");
  const [studTestResultId,setStudTestResultId]=useState("");
  
  const [isOpen1, setIsOpen1] = useState(false);
  const [modale1ObtainedMarks, setMoadal1ObtainedMarks] = useState("");
  const [modal1StudentName,setModal1StudentName]=useState("")
  const [modal1TestName,setModal1TestName]=useState("")

  const openModal1 = (studentName,testName) => {
    setIsOpen1(true);
    console.log("In open modal 1")
    console.log(studentName)
    console.log(testName)
    setModal1StudentName(studentName)
    setModal1TestName(testName)
    //console.log(studentTestResult);
  };

  const closeModal1 = () => {
    setIsOpen1(false);
     };

  const openModal = (Id,obtainedMarks) => {
    console.log("In open modal")
    setIsOpen(true);
    setObtainedMarksModal2(obtainedMarks);
    setStudTestResultId(Id);
    // console.log("Marks updated successfully");
  };


  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedTest, setSelectedTest] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");


  const closeModal = () => {
    setIsOpen(false);
    setObtainedMarksModal2("");
    setStudTestResultId("");    
  };

  const handleAddMarks = async () => {
    try {
      const studentTestResultObj = {
        student: selectedStudent,
        tests: selectedTest,
        obtainedMarks: parseInt(modale1ObtainedMarks),
        obtainedGrade: selectedGrade,
      };

      console.log("New Test result object to add is");
      console.log(studentTestResultObj);
      await addStudentTestResult(studentTestResultObj);
      console.log("Student Marks added successfully")
       closeModal1();
    } catch (error) {
      // Handle error or display an error message
    }
  };

  const handleUpdateMarks = async () => {
    //let parsedMarks=parseInt(obtainedMarksMpodal2)
    try {
      await updateStudentTestResult(studTestResultId,obtainedMarksMpodal2);
      closeModal();
    } catch (error) {
      // Handle error or display an error message
    }
  };

  return (
    <>
    {/* Modal for Addition */}
      <Modal1 isOpen={isOpen1} onClose={closeModal1}>
        <div>
          {/* <div className="mb-2"> 
            <label htmlFor="">Name of the Student : </label>
            <label htmlFor="">{modal1StudentName}</label>
          </div>
          <div className="mb-2">
            <label htmlFor="">Test Name : </label>
            <label htmlFor="" className="mb-4">
              {modal1TestName}
            </label>
          </div>  */}
          <div className="mb-4">
            <label htmlFor="obtainedMarks">Obtained Marks : </label>
            <input
              type="text"
              id="obtainedMarks"
              value={modale1ObtainedMarks}
              onChange={(e) => setMoadal1ObtainedMarks(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="grade">Obtained Grade : </label>
            <select
              value={selectedGrade}
              onChange={handleGradeChange}
              className="rounded-lg border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
              style={{ width: "230px", padding: "8px" }}
            >
              <option value="">Select Grade</option>
              {grades.map((grade) => (
                <option key={grade._id} value={grade._id}>
                  {grade.name}
                </option>
              ))}
            </select>
          </div>
          <div className="">
            <button
              className="rounded-full bg-purple-900 text-white px-6 py-2 
              flex flex-col items-center justify-center ml-28"
              onClick={handleAddMarks}
            >
              Add Marks
            </button>
          </div>
        </div>
      </Modal1>

      {/* Modal for updation */}
      <Modal2 isOpen={isOpen} onClose={closeModal}>
        <div className="my-5">
          <h2 className="text-lg font-bold">Update Obtained Marks</h2>
          <label htmlFor="obtainedMarks" className="block mt-2 text-sm">
            Obtained Marks:
          </label>
          <input
            type="text"
            id="obtainedMarks"
            value={obtainedMarksMpodal2}
            onChange={(e) => setObtainedMarksModal2(e.target.value)}
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
      </Modal2>

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
                      <form
                      //onSubmit={handleSubmit}
                      >
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
                              {studentDataForDropdown.map((student) => (
                                <option key={student._id} value={student._id}>
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
                        onClick={() => openModal1()}
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
                      {DataToDisplay.map((student) => {
                        const studentTestResultData = studentTestResult.filter(
                          (result) => result.student === student._id
                        );
                        return (
                          <div
                            className="bg-purple-300 w-full p-3 rounded-lg mb-4 border border-white"
                            key={student.Id}
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
                                    {student.studentname}
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
                                  {student.parentDetails})
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
                                  className="col-span-2"
                                  style={{ width: "70px" }}
                                >
                                  <strong>Marks:</strong>
                                  <div>{student.obtainedMarks}{student.testName}</div>

                                </div>
                              </div>
                              <div className="ml-4 flex items-center">
                                <button
                                  className="rounded-full bg-purple-900 text-white px-6 py-2 flex flex-col items-center justify-center mr-2"
                                  onClick={() => openModal(student.Id,student.obtainedMarks)}
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
