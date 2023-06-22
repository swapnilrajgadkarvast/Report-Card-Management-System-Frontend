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
import student_profile_pic from "../../images/student_profile_pic.png";
import reportStore from "../../stores/reportStore";
import { useEffect } from "react";

import jsPDF from "jspdf";
import "jspdf-autotable";
import { Chart } from "chart.js/auto";
import html2canvas from "html2canvas";

import axios from "axios";

const http = axios.create({ baseURL: "http://127.0.0.1:3030/" });

const Reports = () => {
  const {
    students,
    standards,
    divisions,
    tests,
    getReports,
    addReport,
    // deleteStudent,
    // updateStudent,
    // addStudent,
  } = reportStore();
  useEffect(() => {
    getReports();
  }, []);

  const [selectedStandard, setSelectedStandard] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [filteredTests, setFilteredTests] = useState([]);

  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedTest, setSelectedTest] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const [obtainedMarks, setObtainedMarks] = useState([]);
  const [obtainedMarksGrade, setObtainedMarksGrade] = useState([]);
  const [highestMarks, setHighestMarks] = useState([]);
  const [averageMarks, setAverageMarks] = useState([]);

  const [remark, setRemark] = useState("");

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

    // Filter tests based on the selected standard and division
    const filteredTests = tests.filter(
      (testName) =>
        testName.standard === selectedStandard &&
        testName.division === selectedDivision
    );

    // console.log("Filter tests based on the selected standard and division -->");
    // console.log(filteredTests);

    setSelectedTest("");
    setFilteredTests(filteredTests);
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

    // Filter tests based on the selected standard and division
    const filteredTests = tests.filter(
      (testName) =>
        testName.standard === selectedStandard &&
        testName.division === selectedDivision
    );

    // console.log("Filter tests based on the selected standard and division -->");
    // console.log(filteredTests);

    setSelectedTest("");
    setFilteredTests(filteredTests);
  };

  const handleStudentChange = (e) => {
    setSelectedStudent(e.target.value);
  };

  const handleTestChange = (e) => {
    // fetchFilteredResults();
    setSelectedTest(e.target.value);
  };

  // Filtered student and test data based on selected values
  const filteredStudent = students.find(
    (student) => student._id === selectedStudent
  );
  const filteredTestsonDropdown = tests.filter(
    (test) => test.name === selectedTest
  );

  console.log("filteredStudent on dropdown");
  console.log(filteredStudent);

  // console.log("filteredTestsonDropdown on dropdown");
  // console.log(filteredTestsonDropdown);

  const filteredTestsonDropdownIds =
    filteredTestsonDropdown.length > 0
      ? filteredTestsonDropdown.map((test) => test._id)
      : [];

  // console.log("filteredTestsonDropdownIds on dropdown");
  // console.log(filteredTestsonDropdownIds);

  const fetchFilteredResults = async () => {
    try {
      const response = await http.get("/student-test-result");
      const studentTestResults = response.data.data;

      console.log("studentTestResults:", studentTestResults);
      // console.log("filteredStudent._id:", filteredStudent._id);
      // console.log("filteredTestsonDropdownIds:", filteredTestsonDropdownIds);

      const filteredResults = studentTestResults.filter(
        (result) =>
          result.student === filteredStudent._id &&
          filteredTestsonDropdownIds.includes(result.tests)
      );

      console.log("Filtered Results:", filteredResults);
      setFilteredResults(filteredResults); // Set the filtered results in state

      // Call pdfData with the filtered results
      const { obtainedMarks, obtainedMarksGrade, highestMarks, averageMarks } =
        await pdfData(filteredResults);

      console.log("Obtained Marks:", obtainedMarks);
      console.log("Obtained Marks Grade", obtainedMarksGrade);
      console.log("Highest Marks:", highestMarks);
      console.log("Average Marks:", averageMarks);

      setObtainedMarks(obtainedMarks);
      setObtainedMarksGrade(obtainedMarksGrade);
      setHighestMarks(highestMarks);
      setAverageMarks(averageMarks);
    } catch (error) {
      console.error("Error fetching filtered results:", error);
    }
  };

  useEffect(() => {
    fetchFilteredResults();
  }, [selectedTest]);

  const pdfData = async (filteredResults) => {
    const obtainedMarks = filteredResults.map((result) => result.obtainedMarks);
    const obtainedMarksGrade = obtainedMarks.map((marks) => {
      if (marks >= 90 && marks <= 100) {
        return "A+";
      } else if (marks >= 80 && marks < 90) {
        return "A";
      } else if (marks >= 70 && marks < 80) {
        return "B+";
      } else if (marks >= 60 && marks < 70) {
        return "B";
      } else if (marks >= 50 && marks < 60) {
        return "C";
      } else if (marks >= 35 && marks < 50) {
        return "D";
      } else {
        return "Fail";
      }
    });

    const testIds = filteredResults.map((result) => result.tests);
    try {
      const response = await http.get("/tests");
      const testData = response.data.data;

      const highestMarks = testIds.map((testId) => {
        const test = testData.find((test) => test._id === testId);
        return test ? test.highestMarks : null;
      });

      const averageMarks = testIds.map((testId) => {
        const test = testData.find((test) => test._id === testId);
        return test ? test.averageMarks : null;
      });

      // console.log("Obtained Marks:", obtainedMarks);
      // console.log("Highest Marks:", highestMarks);
      // console.log("Average Marks:", averageMarks);

      return {
        obtainedMarks,
        obtainedMarksGrade,
        highestMarks,
        averageMarks,
      };
    } catch (error) {
      console.error("Error in pdfData:", error);
      return null; // Return null or handle the error appropriately
    }
  };

  // Separate component that renders the filtered results table
  const FilteredResultsTable = ({ filteredResults }) => {
    const [testsData, setTestsData] = useState([]);
    const [subjectData, setSubjectData] = useState([]);
    const [subjects, setSubjects] = useState([]);

    const fetchData = async () => {
      try {
        const testsApi = await http.get("/tests");
        const testsData = testsApi.data.data;
        console.log("Tests Data");
        console.log(testsData);
        setTestsData(testsData);

        const subjectsApi = await http.get("/subjects");
        const subjectData = subjectsApi.data.data;
        // console.log("Subject Data");
        // console.log(subjectData);

        const subjectNames = subjectData.map((subject) => subject.name);
        console.log("Subject Names");
        console.log(subjectNames);
        setSubjects(subjectNames);

        // console.log("Filtered Results :");
        // console.log(filteredResults);
        setSubjectData(subjectData);
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      fetchData();
    }, []);

    return (
      <table className="w-full h-20 border border-white mb-2">
        <thead>
          <tr>
            {filteredResults.map((result, index) => {
              const test = testsData.find((test) => test._id === result.tests);
              // console.log("Test : ", test);
              const subject = subjectData.find(
                (subject) => subject._id === test.subject
              );
              // console.log("Subject :", subject);
              const subjectName = subject ? subject.name : "Unknown";

              return (
                <th
                  className="border-b border-r border-white text-center"
                  key={index}
                >
                  {subjectName}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            {filteredResults.map((result, index) => (
              <td
                className="border-b border-r border-white text-center font-bold"
                key={index}
              >
                {result.obtainedMarks}/100
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    );
  };

  const fetchObtainedFinalResult = (filteredResults) => {
    let totalMarks = 0;
    let obtainedMarks = 0;
    let grade = "";

    // Calculate total marks and obtained marks
    filteredResults.forEach((result) => {
      totalMarks += 100; // Assuming each test is out of 100 marks
      obtainedMarks += result.obtainedMarks;
    });

    // Calculate percentage
    const percentage = (obtainedMarks / totalMarks) * 100;

    // Determine the grade based on the percentage
    if (percentage > 70) {
      grade = "Distinction";
    } else if (percentage >= 35) {
      grade = "Pass";
    } else if (percentage > 0) {
      grade = "Fail";
    } else {
      grade = "--";
    }

    // Render the total marks, percentage, and grade
    const resultCalculation = (
      <div className="flex justify-between mt-4">
        <div>
          Total Marks: <br />
          <span className="font-bold">{obtainedMarks}</span>
        </div>
        <div>
          Percentage : <br />
          <span className="font-bold">{percentage.toFixed(2)}%</span>
        </div>
        <div>
          Grade: <br />
          <span
            className={
              grade === "Fail"
                ? "font-bold text-red-600"
                : grade === "Pass"
                ? "font-bold text-green-600"
                : "font-bold text-purple-900"
            }
          >
            {grade}
          </span>
        </div>
      </div>
    );

    // Return an object with JSX element and grade property
    return {
      resultCalculation,
      grade,
    };
  };
  const result = fetchObtainedFinalResult(filteredResults);
  const grade = result.grade;
  // console.log("Grade", grade);

  const generatePDF = async () => {
    const doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
    });

    doc.setFontSize(16);
    doc.text("Student Report", 10, 10);

    doc.setFontSize(12);
    doc.text(
      "Student Name: " +
        `${filteredStudent.firstName} ${filteredStudent.middleName} ${filteredStudent.lastName} `,
      10,
      20
    );
    doc.text("Grade: " + grade, 10, 30);

    doc.setFontSize(14);
    doc.text("Obtained Grade", 10, 40);

    const obtainedMarksGradeData = [
      ["Subject", "Obtained Marks Grade"],
      ["English", obtainedMarksGrade[0]],
      ["Hindi", obtainedMarksGrade[1]],
      ["Marathi", obtainedMarksGrade[2]],
      ["Science", obtainedMarksGrade[3]],
      ["Mathematics", obtainedMarksGrade[4]],
    ];

    doc.autoTable({
      startY: 50,
      head: [["Subject", "Obtained Marks"]],
      body: obtainedMarksGradeData.slice(1),
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
        labels: ["English", "Hindi", "Marathi", "Science", "Mathematics"],
        datasets: [
          {
            label: "Obtained Marks",
            data: obtainedMarks,
            backgroundColor: "rgba(78, 60, 111, 1)",
            borderColor: "rgba(255, 255, 255, 1)",
            borderWidth: 1,
          },
          {
            label: "Average Marks",
            data: averageMarks,
            backgroundColor: "rgba(75, 192, 192, 1)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
          {
            label: "Highest Marks",
            data: highestMarks,
            backgroundColor: "rgba(21, 103, 96, 1)",
            borderColor: "rgba(21, 103, 96, 0.2)",
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
    doc.text(remark, 10, doc.autoTable.previous.finalY + 110);

    doc.save(
      `${filteredStudent.firstName}_${filteredStudent.lastName}_${filteredTestsonDropdown[0].name}_report.pdf`
    );

    // Clean up
    document.body.removeChild(chartContainer);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generate the PDF
    await generatePDF();

    // Retrieve the necessary form data
    const reportData = {
      student: filteredStudent._id,
      remark: remark,
      reportFilePath: `D:\\Report Card Management\\Report-Card-Management-System\\src\\Report PDFs\\${filteredStudent.firstName}_${filteredStudent.lastName}_${filteredTestsonDropdown[0].name}_report.pdf`,
      rcn: filteredStudent._id + filteredTestsonDropdownIds[0],
    };

    // Call the addReport function and pass the reportData
    addReport(reportData);
  };

  return (
    <div style={{ backgroundColor: "white" }} className="min-h-screen">
      <div className="container">
        <div className="grid grid-cols-12">
          <div className="col-span-2">
            <img src={logo} alt="Logo" className="w-44 h-20" />
          </div>
          <div className="col-span-10">
            <div className="flex items-end justify-end mt-4">
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
                              {filteredStudents.map((student) => (
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
                              disabled={
                                selectedStudent.length > 0 ? false : true
                              }
                            >
                              <option value="">Select Test</option>
                              {[
                                ...new Set(
                                  filteredTests.map((test) => test.name)
                                ),
                              ].map((testName) => (
                                <option key={testName} value={testName}>
                                  {testName}
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
            <form onSubmit={handleSubmit}>
              {filteredStudent && (
                <div
                  className="grid grid-cols-12 mt-4 ml-1 bg-purple-300 p-3 rounded-lg"
                  key={filteredStudent.id}
                >
                  <div className="col-span-2 grid" style={{ height: "160px" }}>
                    <img
                      src={student_profile_pic}
                      alt="Student"
                      className="w-full h-auto mb-2"
                    />
                    <div className="text-center">
                      <FontAwesomeIcon
                        icon={faUserGraduate}
                        className="text-purple-900 mr-2"
                      />
                      <strong>{`${filteredStudent.firstName} ${filteredStudent.lastName}`}</strong>
                    </div>
                  </div>

                  <div className="col-span-6 grid flex-cols-5 ml-8">
                    <div className="text-start mb-2">
                      <strong>Roll No: {filteredStudent.rollNumber}</strong>
                    </div>
                    <FilteredResultsTable filteredResults={filteredResults} />
                    {result.resultCalculation}
                    {/* {fetchObtainedFinalResult(filteredResults)} */}

                    <div className="mt-2">
                      Parent Details :
                      <div className="flex flex-col">
                        <div>
                          <FontAwesomeIcon
                            icon={faUser}
                            className="text-purple-900 mr-2"
                          />
                          <span className="font-bold">
                            {`${filteredStudent.parent.firstName} ${filteredStudent.parent.lastName}`}{" "}
                            ({filteredStudent.parent.relationship})
                          </span>
                        </div>
                        <div>
                          <FontAwesomeIcon
                            icon={faPhone}
                            className="text-purple-900 mr-2"
                          />
                          <span className="font-bold">
                            {filteredStudent.parent.phone}
                          </span>
                        </div>
                        <div>
                          <FontAwesomeIcon
                            icon={faEnvelope}
                            className="text-purple-900 mr-2"
                          />
                          <span className="font-bold">
                            {filteredStudent.parent.email}
                          </span>
                        </div>
                        <div>
                          <FontAwesomeIcon
                            icon={faLocationDot}
                            className="text-purple-900 mr-2"
                          />
                          <span className="font-bold">
                            {`${filteredStudent.parent.addressLine1}, ${filteredStudent.parent.addressLine2}, ${filteredStudent.parent.area}, ${filteredStudent.parent.city}, ${filteredStudent.parent.state}, ${filteredStudent.parent.zipcode}`}
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
                      value={remark}
                      onChange={(e) => setRemark(e.target.value)}
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
                        onClick={generatePDF}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
