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

const Result = () => {
  const loginData = JSON.parse(sessionStorage.getItem("loginData"));
  // console.log(loginData);
  const role = loginData.user.role;
  const user = loginData.user;
  console.log("logged in user in subject-teacher/test is");
  console.log(user);
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
    getStudentTestResultSearch,
    DataToDisplay,
    studentTestResultDataToDisplay,
  } = studentTestResultStore();


  const [showProfile, setShowProfile] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedTest, setSelectedTest] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedStudent1, setSelectedStudent1] = useState("");
  const [selectedTest1, setSelectedTest1] = useState("");
 const [studentWiseDataToDisplay,setStudentWiseDataToDisplay]=useState([]);
 //const [testWiseDataToDisplay,setTestWiseDataToDisplay]=useState([]);

 
 
   const handleStudentChange1 = (e) => {
   console.log(e.target.value)
    setSelectedStudent1(e.target.value);
    if(e.target.value==="All Students")
    {
      setStudentWiseDataToDisplay(DataToDisplay)
    }
    else
    if(e.target.value)
    {
     // Filter students based on the selected standard and division
     const filteredStudents = DataToDisplay.filter(
      (student) => student.studentname === e.target.value
    );
    
    console.log(
      "Filter students based on the selected name -->"
    );
    console.log(filteredStudents);
    setStudentWiseDataToDisplay(filteredStudents)
    }
    // else
    // setStudentWiseDataToDisplay(DataToDisplay)
  };

  const handleTestChange1 = (e) => {
    setSelectedTest1(e.target.value);

    console.log(e.target.value)
    setSelectedTest1(e.target.value);
    if(e.target.value)
    {
     // Filter students based on the selected standard and division
     const filteredStudents = DataToDisplay.filter(
      (student) => student.testName === e.target.value
    );
    
    console.log(
      "Filter students based on the selected name -->"
    );
    console.log(filteredStudents);
    setStudentWiseDataToDisplay(filteredStudents)
    }
   
  };

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

 
  console.log("Data To Display in JSX ");
  console.log(DataToDisplay);

  useEffect(() => {
    getStudentTestResult(user).catch((error) => {
      // Handle the error, e.g., display an error message
      console.log("Error fetching test results:", error);
    });
  }, []);

  // console.log("studentTestResult.....");
  // console.log(studentTestResult);

  const [isOpen, setIsOpen] = useState(false);
  const [obtainedMarksMpodal2, setObtainedMarksModal2] = useState("");
  const [studTestResultId,setStudTestResultId]=useState("");
  const [isOpen1, setIsOpen1] = useState(false);
  const [modal1StudentId, setModal1StudentId] = useState("");
  const [modal1TestId, setModal1TestId] = useState("");
  const [modale1ObtainedMarks, setMoadal1ObtainedMarks] = useState("");
  // const [modal1ObtainedGrade,setModal1ObtainedGrade]=useState("")

  const openModal1 = (studentName,testName) => {
    setIsOpen1(true);
    console.log("In open modal 1")

    setSelectedStudent("")
    setSelectedTest("")
  };

  const closeModal1 = () => {
    setIsOpen1(false);
     };

   const openModal = (Id,obtainedMarks) => {
    console.log("In open modal")
    setIsOpen(true);
    setObtainedMarksModal2(obtainedMarks);
    setStudTestResultId(Id);
    console.log("Marks updated successfully");
    // console.log("Marks updated successfully");
  };

  // const [selectedStudent, setSelectedStudent] = useState("");
  // const [selectedTest, setSelectedTest] = useState("");
  // const [selectedGrade, setSelectedGrade] = useState("");

  const closeModal = () => {
    setIsOpen(false);
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
    let parsedMarks = parseInt(obtainedMarksMpodal2);
    try {
      await updateStudentTestResult(studTestResultId, obtainedMarksMpodal2);
      // Handle success or display a success message
      closeModal();
    } catch (error) {
      // Handle error or display an error message
    }
  };

  const [student_name,setStudent_Name]=useState("")
  const handleSearchChange=async(e)=>
  {
      const {value}=e.target;
      setStudent_Name(value);
      getStudentTestResultSearch(student_name)
      console.log(value);
  }

  return (
    <>
      <Modal1 isOpen={isOpen1} onClose={closeModal1}>
        <div>
          <h2 className="text-lg font-bold mb-4">Enetr Obtained Marks</h2>
          <div className="mb-4">
          <label htmlFor="studentName">Select Student: </label>
          <select
                              value={selectedStudent}
                              onChange={handleStudentChange}
                              className="rounded-lg border border-gray-300 px-2 py-1 focus:outline-none
                               focus:ring-2 focus:ring-purple-500"
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
            <div className="mb-4 ml-6">
          <label htmlFor="studentName">Select Test: </label>
          <select
                              value={selectedTest}
                              onChange={handleTestChange}
                              className="rounded-lg border border-gray-300 px-2 py-1 
                              focus:outline-none focus:ring-2 focus:ring-purple-500"
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
    
          <div className="mb-4">
            <label htmlFor="obtainedMarks">Obtained Marks : </label>
            <input
              type="text"
              id="obtainedMarks"
              value={modale1ObtainedMarks}
              onChange={(e) => setMoadal1ObtainedMarks(e.target.value)}
              className="rounded-lg border border-gray-300 px-2 py-1 
                              focus:outline-none focus:ring-2 focus:ring-purple-500"
                              style={{ width: "230px", padding: "8px" }}
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

      <Modal2 isOpen={isOpen} onClose={closeModal}>
        <div className="my-5">
          <h2 className="text-lg font-bold mb-4">Update Obtained Marks</h2>
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
                    className="rounded-full pl-10 pr-32 py-2 border border-gray-300
                    focus:outline-none focus:ring-2
                   focus:ring-purple-500 focus:border-transparent"
                   onChange={handleSearchChange}
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
                              value={selectedStudent1}
                              onChange={handleStudentChange1}
                              className="rounded-lg border border-gray-300 px-2 py-1 
                              focus:outline-none focus:ring-2 focus:ring-purple-500"
                              style={{ width: "230px", padding: "8px" }}
                            >
                              <option value="">Select Student</option>
                              <option value="All Students">Show All Students</option>
                              {studentDataForDropdown.map((student) => (
                                <option key={student._id} value={student.firstName+" "+student.lastName}>
                                  {student.firstName} {student.lastName}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="col-span-6">
                            <label htmlFor="testName">Test &nbsp;</label>
                            <select
                              value={selectedTest1}
                              onChange={handleTestChange1}
                              className="rounded-lg border border-gray-300 px-2 py-1 
                              focus:outline-none focus:ring-2 focus:ring-purple-500"
                              style={{ width: "230px", padding: "8px" }}
                            >
                              <option value="">Select Test</option>
                              {testData.map((test) => (
                                <option key={test._id} value={test.name}>
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
                        className="rounded-full bg-purple-900 text-white px-6 py-2
                         flex flex-col items-center justify-center w-40 h-16"
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
                      {studentWiseDataToDisplay.map((student) => {
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
                                  className="w-48 border h-28"
                                />
                              </div>
                              <div className="ml-4">
                                <div
                                  className="grid grid-cols-2"
                                  style={{ width: "130px" }}
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
                                  style={{ width: "110px" }}
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
                                  style={{ width: "160px" }}
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
                                  style={{ width: "90px" }}
                                >
                                  <strong>Test Name:</strong>
                                  <div>{student.testName}</div>

                                </div>
                              </div>
                              <div className="ml-4">
                                <div
                                  className="col-span-2"
                                  style={{ width: "50px" }}
                                >
                                  <strong>Marks:</strong>
                                  <div>{student.obtainedMarks}</div>

                                </div>
                              </div>
                              <div className="ml-4 flex items-center">
                                <button
                                  className="rounded-full bg-purple-900 text-white
                                   px-6 py-2 flex flex-col items-center justify-center mr-2"
                                  onClick={() =>
                                    openModal(student.Id, student.obtainedMarks)
                                  }
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
