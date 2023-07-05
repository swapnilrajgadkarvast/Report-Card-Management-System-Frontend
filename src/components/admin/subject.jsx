import React, { useState, useEffect } from "react";
import subjectStore from "../../stores/subjectStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faSearch,
  faTimes,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../images/rcms_logo_small.jpg";
//import random_profile_pic1 from "../images/random_profile_pic.jpg";
//import random_profile_pic2 from "../images/random_profile_pic2.jpg";
import Modal from "../../modals/Modal1";
import DeleteModal from "../../modals/DeleteModal";

const Subject = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalSubjectId, setModalSubjectId] = useState("");
  const [modalSubjectName, setModalSubjectName] = useState("");
  const {
    subjects,
    loading,
    error,
    getSubjects,
    addSubject,
    deleteSubject,
    updateSubject,
  } = subjectStore();

  const [name, setName] = useState("");

  const openModal = (subject) => {
    setIsOpen(true);
    setModalSubjectId(subject._id);
    setModalSubjectName(subject.name);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalSubjectId("");
    setModalSubjectName("");
  };

  useEffect(() => {
    getSubjects();
  }, [getSubjects]);

  const [nameError, setNameError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.trim() === "") {
      // Empty subject name
      setNameError("Please enter a subject name");
      return;
    }

    const subjectNameExists = subjects.some((subject) => subject.name === name);
    if (subjectNameExists) {
      // subject name already exists
      setNameError("Subject name already exists");
      return;
    }

    // Reset the error message
    setNameError("");

    await addSubject(name);
    setName("");
  };

  const [searchText, setSearchText] = useState("");

  // Filter the tests based on the search text
  const searchedSubjects = subjects.filter((sub) =>
    sub.name.toLowerCase().includes(searchText.toLowerCase())
  );
  // console.log(searchedSubjects)

  const [showModal, setShowModal] = useState(false);
  const [subjectToDelete, setSubjectToDelete] = useState(null);

  const handleDelete = () => {
    if (subjectToDelete) {
      // Perform the deletion logic here
      deleteSubject(subjectToDelete);
      setSubjectToDelete(null);
      setShowModal(false); // Close the modal after deletion
    }
  };

  const openDeleteModal = (subjectId) => {
    setSubjectToDelete(subjectId);
    setShowModal(true);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        data={modalSubjectId}
        data2={modalSubjectName}
      >
        <div className="items-center justify-center">
          <div className="mb-4">
            <div className="h-10 w-40 mb-4">
              <h2 className="text-2xl ">Enter Subject</h2>
            </div>
            <input
              type="text"
              id="subject_name"
              name="subject_name"
              value={modalSubjectName}
              placeholder="Enter subject"
              onChange={(e) => {
                setModalSubjectName(e.target.value);
              }}
              className="rounded-lg border border-gray-300 px-2 py-1
                             focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            className="rounded-full bg-purple-900 text-white px-6 py-2 
                            flex flex-col items-center justify-center"
            onClick={() => updateSubject(modalSubjectId, modalSubjectName)}
          >
            Update Subject
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
              <div className="flex items-end justify-end mt-4">
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
              </div>

              <div className=" grid grid-cols-12 mt-4 ml-1">
                <div className="col-span-10 flex">
                  <div className="mt-4 w-full">
                    <div className="bg-purple-300 p-3 rounded-lg">
                      <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-16">
                          <div className="flex items-center">
                            <span className="font-bold text-lg mr-2 ml-2">
                              Subject{" "}
                            </span>
                            <div className="mr-4 ml-2">
                              <input
                                type="text"
                                placeholder="Enter subject"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="rounded-lg border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                style={{ width: "230px", padding: "8px" }}
                              />
                              {nameError && (
                                <p className="text-red-600 font-bold">
                                  {nameError}
                                </p>
                              )}{" "}
                              {/* Render the error message */}
                            </div>
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
                        <span style={{ marginTop: "4px" }}>Add Subject</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-12 mt-4 ml-1">
                <div className="col-span-12 grid">
                  <div className="bg-purple-300 p-3 rounded-lg">
                    <div className="mt-4 ml-1">
                      {searchedSubjects.map((subject) => (
                        <div
                          className="bg-purple-300 w-full p-3 rounded-lg mb-4 border border-white"
                          key={subject._id}
                        >
                          <div className="flex items-start">
                            <div className="ml-4">
                              <div
                                className="col-span-2"
                                style={{ width: "150px" }}
                              >
                                <strong>Subject </strong> <br />
                              </div>
                            </div>
                            <div
                              className="col-span-2"
                              style={{ width: "600px" }}
                            >
                              <strong>{subject.name}</strong> <br />
                            </div>
                            <div className="ml-4 flex items-center">
                              <button
                                className="rounded-full bg-purple-900 text-white px-6 py-2
                             flex flex-col items-center justify-center mr-2"
                                onClick={() => openModal(subject)}
                              >
                                <FontAwesomeIcon
                                  icon={faEdit}
                                  style={{ fontSize: "24px" }}
                                />
                              </button>
                              <button
                                className="rounded-full bg-purple-900 text-white px-6 py-2 
                    flex flex-col items-center justify-center"
                                onClick={() => openDeleteModal(subject._id)}
                              >
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  style={{ fontSize: "24px" }}
                                />
                              </button>
                              {/* Delete Modal */}
                              <DeleteModal
                                show={showModal}
                                onClose={() => setShowModal(false)}
                                onDelete={handleDelete}
                              />
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

export default Subject;
