import React, { useEffect, useState } from "react";
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

import jsPDF from "jspdf";
import "jspdf-autotable";
import { Chart } from "chart.js/auto";
import html2canvas from "html2canvas";

const Reports = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [selectedStandard, setSelectedStandard] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
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
    setSelectedStandard(e.target.value);
  };

  const handleDivisionChange = (e) => {
    setSelectedDivision(e.target.value);
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
      averageMarks: {
        English: 65,
        Hindi: 65,
        Marathi: 65,
        Science: 65,
        Math: 65,
      },
      highestMarks: {
        English: 93,
        Hindi: 93,
        Marathi: 93,
        Science: 93,
        Math: 93,
      },
      obtainedMarks: {
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
  ];

  const generatePDF = async () => {
    const doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
    });

    doc.setFontSize(16);
    doc.text("Student Report", 10, 10);

    doc.setFontSize(12);
    doc.text("Student Name: " + studentDatas[0].studentName, 10, 20);
    doc.text("Grade: " + studentDatas[0].grade, 10, 30);

    doc.setFontSize(14);
    doc.text("Obtained Marks", 10, 40);

    const obtainedMarksData = [
      ["Subject", "Obtained Marks"],
      ["English", studentDatas[0].obtainedMarks.English],
      ["Hindi", studentDatas[0].obtainedMarks.Hindi],
      ["Marathi", studentDatas[0].obtainedMarks.Marathi],
      ["Science", studentDatas[0].obtainedMarks.Science],
      ["Math", studentDatas[0].obtainedMarks.Math],
    ];

    doc.autoTable({
      startY: 50,
      head: [["Subject", "Obtained Marks"]],
      body: obtainedMarksData.slice(1),
    });

    doc.setFontSize(14);
    doc.text("Grades", 10, doc.autoTable.previous.finalY + 10);

    const gradesData = [
      ["Grades", "Range"],
      ["A+", "90% - 100%"],
      ["A", "80% - 90%"],
      ["B+", "70% - 80%"],
      ["B", "60% - 70%"],
      ["C", "50% - 60%"],
      ["D", "35% - 50%"],
      ["FAIL", "< 35%"],
    ];

    doc.autoTable({
      startY: doc.autoTable.previous.finalY + 20,
      head: [["Grades", "Range"]],
      body: gradesData.slice(1),
    });

    doc.setFontSize(14);
    doc.text("Marks Comparison", 10, doc.autoTable.previous.finalY + 10);

    const chartContainer = document.createElement("div");
    chartContainer.style.width = "400px";
    chartContainer.style.height = "300px";
    document.body.appendChild(chartContainer);

    const chartCanvas = document.createElement("canvas");
    chartContainer.appendChild(chartCanvas);

    const marksChart = new Chart(chartCanvas, {
      type: "bar",
      data: {
        labels: ["English", "Hindi", "Marathi", "Science", "Math"],
        datasets: [
          {
            label: "Obtained Marks",
            data: [
              studentDatas[0].obtainedMarks.English,
              studentDatas[0].obtainedMarks.Hindi,
              studentDatas[0].obtainedMarks.Marathi,
              studentDatas[0].obtainedMarks.Science,
              studentDatas[0].obtainedMarks.Math,
            ],
            backgroundColor: "rgba(	78, 60, 111, 1)",
            borderColor: "rgba(255, 255, 255, 1)",
            borderWidth: 1,
          },
          {
            label: "Average Marks",
            data: [
              studentDatas[0].averageMarks.English,
              studentDatas[0].averageMarks.Hindi,
              studentDatas[0].averageMarks.Marathi,
              studentDatas[0].averageMarks.Science,
              studentDatas[0].averageMarks.Math,
            ],
            backgroundColor: "rgba(75, 192, 192, 1)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
          {
            label: "Highest Marks",
            data: [
              studentDatas[0].highestMarks.English,
              studentDatas[0].highestMarks.Hindi,
              studentDatas[0].highestMarks.Marathi,
              studentDatas[0].highestMarks.Science,
              studentDatas[0].highestMarks.Math,
            ],
            backgroundColor: "rgba(	21, 103, 96, 1)",
            borderColor: "rgba(	21, 103, 96, 0.2)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
          },
        },
      },
    });

    // Delay for 500 milliseconds to allow the chart to render before capturing the image
    await new Promise((resolve) => setTimeout(resolve, 500));

    const canvasImage = await html2canvas(chartContainer, { useCORS: true });
    const chartImage = canvasImage.toDataURL("image/png");

    doc.addImage(
      chartImage,
      "PNG",
      10,
      doc.autoTable.previous.finalY + 20,
      180,
      70
    );

    doc.setFontSize(14);
    doc.text("Remarks", 10, doc.autoTable.previous.finalY + 100);
    doc.text("Good Job.", 10, doc.autoTable.previous.finalY + 110);

    doc.save("student_report.pdf");

    // Clean up
    document.body.removeChild(chartContainer);
  };

  return (
    <div
      style={{ backgroundColor: "white" }}
      className="min-h-screen"
      id="report_page"
    >
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
                              <option value="1">Swapnil Rajgadkar</option>
                              <option value="2">Kshama Khamkar</option>
                              {/* Add more standard options as needed */}
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
                              <option value="A">Unit Test 1</option>
                              <option value="B">Class Test 1</option>
                              {/* Add more division options as needed */}
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
                      onClick={generatePDF}
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
              .filter((student) => student.id === 1)
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
                            {Object.keys(student.obtainedMarks)[0]}
                          </th>
                          <th className="border-b border-r border-white text-center">
                            {Object.keys(student.obtainedMarks)[1]}
                          </th>
                          <th className="border-b border-r border-white text-center">
                            {Object.keys(student.obtainedMarks)[2]}
                          </th>
                          <th className="border-b border-r border-white text-center">
                            {Object.keys(student.obtainedMarks)[3]}
                          </th>
                          <th className="border-b border-white text-center">
                            {Object.keys(student.obtainedMarks)[4]}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border-b border-r border-white text-center font-bold">
                            {Object.values(student.obtainedMarks)[0]}/100
                          </td>
                          <td className="border-b border-r border-white text-center font-bold">
                            {Object.values(student.obtainedMarks)[1]}/100
                          </td>
                          <td className="border-b border-r border-white text-center font-bold">
                            {Object.values(student.obtainedMarks)[2]}/100
                          </td>
                          <td className="border-b border-r border-white text-center font-bold">
                            {Object.values(student.obtainedMarks)[3]}/100
                          </td>
                          <td className="border-b border-white text-center font-bold">
                            {Object.values(student.obtainedMarks)[4]}/100
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

// Styles for the PDF document
const styles = {
  page: {
    fontFamily: "Helvetica",
    fontSize: 12,
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 60,
    paddingRight: 60,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
};

export default Reports;
