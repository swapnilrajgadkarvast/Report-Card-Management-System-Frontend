import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faSearch,
  faTimes,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../images/rcms_logo_small.jpg";
import testStore from "../../stores/testStore";
import Modal from "../../modals/Modal1";

const Test = () => {
  const loginData = JSON.parse(sessionStorage.getItem("loginData"));
  // console.log(loginData);
  const role = loginData.user.role;
  const user = loginData.user;
  console.log("logged in user in subject-teacher/test is");
  console.log(user);

  const {
    tests,
    userroles,
    loading,
    error,
    getTests,
    addTest,
    updateTest,
    deleteTest,
  } = testStore();
  const [name, setName] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getTests(user);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTest = {
      name: name,
      totalMarks: 100, // Add the totalMarks value here
      subject: userroles[0].subject, // Replace with the appropriate subject ID
      standard: userroles[0].standard, // Replace with the appropriate standard ID
      division: userroles[0].division, // Replace with the appropriate division ID
      year: 2023, // Replace with the appropriate year value
    };

    // Add the test using the addTest function from testStore
    await addTest(
      newTest.name,
      newTest.totalMarks,
      newTest.subject,
      newTest.standard,
      newTest.division,
      newTest.year
    );

    setName("");
  };

  const [isOpen, setIsOpen] = useState(false);
  const [modalTestId, setModalTestId] = useState("");
  const [modalTestName, setModalTestName] = useState("");

  const openModal = (tests) => {
    setIsOpen(true);
    setModalTestId(tests._id);
    setModalTestName(tests.name);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalTestId("");
    setModalTestName("");
  };

  const handleEditTest = async () => {
    try {
      await updateTest(modalTestId, modalTestName);
      // Handle success or display a success message
      closeModal();
    } catch (error) {
      // Handle error or display an error message
    }
  };

  const handleDeleteTest = async (testId) => {
    try {
      await deleteTest(testId);
      // Handle success or display a success message
    } catch (error) {
      // Handle error or display an error message
    }
  };

  // Filter the tests array based on the provided criteria
  const filteredTests = tests.filter((test) => {
    return (
      test.standard === userroles[0].standard &&
      test.division === userroles[0].division &&
      test.subject === userroles[0].subject
    );
  });

  // console.log("Filtered Tests : ");
  // console.log(filteredTests);

  // Filter the tests based on the search text
  const searchedTests = filteredTests.filter((test) =>
    test.name.toLowerCase().includes(searchText.toLowerCase())
  );
  // console.log(searchedTests)

  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className="items-center justify-center">
          <div className="mb-4">
            <div className="h-10 w-40 mb-4">
              <h2 className="text-xl ">Enter Test Name</h2>
            </div>
            <input
              type="text"
              value={modalTestName}
              placeholder="Enter Test"
              onChange={(e) => {
                setModalTestName(e.target.value);
              }}
              className="rounded-lg border border-gray-300 px-2 py-1
                             focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            className="rounded-full bg-purple-900 text-white px-6 py-2 
                            flex flex-col items-center justify-center"
            onClick={handleEditTest}
          >
            Update Test
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
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="rounded-full pl-10 pr-32 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  {searchText && (
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                      onClick={() => setSearchText("")}
                    />
                  )}
                </div>
                <div>
                  <p>
                    There are {filteredTests.length} tests in this{" "}
                    <strong>Class</strong>.
                  </p>
                </div>
              </div>

              <div className=" grid grid-cols-12 mt-12 ml-1">
                <div className="col-span-10 flex">
                  <div className="mt-4 w-full">
                    <div className="bg-purple-300 p-3 rounded-lg">
                      <form onSubmit={handleSubmit}>
                        <div className="grid px-8 grid-cols-6 lg:grid-cols-12 gap-4">
                          <div className="col-span-8">
                            <label htmlFor="test_name">
                              <strong>Test &nbsp; </strong>
                            </label>

                            <input
                              type="text"
                              value={name}
                              placeholder="Enter Test"
                              onChange={(e) => setName(e.target.value)}
                              className="rounded-lg border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500 "
                              style={{ width: "400px" }}
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
                        onClick={handleSubmit}
                      >
                        <FontAwesomeIcon
                          icon={faPlus}
                          className="text-white"
                          style={{ fontSize: "24px" }}
                        />
                        <span style={{ marginTop: "4px" }}>Add Test</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-12 mt-4 ml-1">
                <div className="col-span-12 grid">
                  <div className="bg-purple-300 p-3 rounded-lg">
                    <div className="mt-4 ml-1">
                      {searchedTests.map((test) => (
                        <div
                          className="bg-purple-300 w-full p-3 rounded-lg mb-4 border border-white"
                          key={test.id}
                        >
                          <div className="flex items-start">
                            <div className="ml-4">
                              <div
                                className="col-span-2"
                                style={{ width: "100px" }}
                              >
                                <strong>Test </strong> <br />
                              </div>
                            </div>
                            <div
                              className="col-span-2"
                              style={{ width: "700px" }}
                            >
                              <strong>{test.name}</strong> <br />
                            </div>
                            <div className="ml-4 flex items-center">
                              <button
                                className="rounded-full bg-purple-900 text-white px-6 py-2 flex flex-col items-center justify-center mr-2"
                                onClick={() => openModal(test)}
                              >
                                <FontAwesomeIcon
                                  icon={faEdit}
                                  style={{ fontSize: "24px" }}
                                />
                              </button>
                              <button
                                className="rounded-full bg-purple-900 text-white px-6 py-2 flex flex-col items-center justify-center"
                                onClick={() => handleDeleteTest(test._id)}
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

export default Test;
