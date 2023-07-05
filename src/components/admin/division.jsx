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
import logo from "../../images/rcms_logo_small.jpg";
import { useEffect } from "react";
import divisionStore from "../../stores/divisionStore";
import Modal from "../../modals/Modal1";
import DeleteModal from "../../modals/DeleteModal";

const Division = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalDivisionId, setModalDivisionId] = useState("");
  const [modalDivisionName, setModalDivisionName] = useState("");
  const {
    divisions,
    loading,
    error,
    getDivisions,
    addDivision,
    deleteDivision,
    updateDivision,
  } = divisionStore();
  const [name, setName] = useState("");

  const openModal = (division) => {
    setIsOpen(true);
    setModalDivisionId(division._id);
    setModalDivisionName(division.name);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalDivisionId("");
    setModalDivisionName("");
  };

  useEffect(() => {
    getDivisions();
  }, [getDivisions]);

  const [nameError, setNameError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.trim() === "") {
      // Empty standard name
      setNameError("Please enter a division name");
      return;
    }

    const divisionNameExists = divisions.some(
      (division) => division.name === name
    );
    if (divisionNameExists) {
      // Standard name already exists
      setNameError("Division name already exists");
      return;
    }

    // Reset the error message
    setNameError("");

    await addDivision(name);
    setName("");
  };

  const [searchText, setSearchText] = useState("");

  // Filter the tests based on the search text
  const searchedDivisions = divisions.filter((div) =>
    div.name.toLowerCase().includes(searchText.toLowerCase())
  );
  // console.log(searchedTests)

  const [showModal, setShowModal] = useState(false);
  const [divisionToDelete, setDivisionToDelete] = useState(null);

  const handleDelete = () => {
    if (divisionToDelete) {
      // Perform the deletion logic here
      deleteDivision(divisionToDelete);
      setDivisionToDelete(null);
      setShowModal(false); // Close the modal after deletion
    }
  };

  const openDeleteModal = (divisionId) => {
    setDivisionToDelete(divisionId);
    setShowModal(true);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        data={modalDivisionId}
        data2={modalDivisionName}
      >
        <div className="items-center justify-center">
          <div className="mb-4">
            <div className="h-10 w-40 mb-4">
              <h2 className="text-xl ">Enter Division</h2>
            </div>
            <input
              type="text"
              id="standard_name"
              name="standard_name"
              value={modalDivisionName}
              placeholder="Enter standard"
              onChange={(e) => {
                setModalDivisionName(e.target.value);
              }}
              className="rounded-lg border border-gray-300 px-2 py-1
                             focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            className="rounded-full bg-purple-900 text-white px-6 py-2 
                            flex flex-col items-center justify-center"
            onClick={() => updateDivision(modalDivisionId, modalDivisionName)}
          >
            Update Division
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
              <div className="flex items-center justify-end mt-4  ">
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
              <div className="grid grid-cols-12 mt-4 ml-1">
                <div className="col-span-3"></div>
                <div className="col-span-3"></div>
              </div>
              <div className=" grid grid-cols-12 mt-4 ml-1">
                <div className="col-span-10 flex">
                  <div className="mt-4">
                    <div className="bg-purple-300 p-3 rounded-lg">
                      <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-16">
                          <div className="flex items-center">
                            <span className="font-bold text-lg mr-2 ml-2">
                              Division{" "}
                            </span>
                            <div className="mr-4 ml-2">
                              <input
                                type="text"
                                placeholder="Enter Division"
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
                        <span style={{ marginTop: "4px" }}>Add Division</span>
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
                      {searchedDivisions.map((division) => (
                        <div
                          className="bg-purple-300 w-full p-3 rounded-lg mb-4 border border-white"
                          key={division._id}
                        >
                          <div className="flex items-start">
                            <div className="ml-4">
                              <div
                                className="col-span-2"
                                style={{ width: "150px" }}
                              >
                                <strong>Division :</strong> <br />
                              </div>
                            </div>
                            <div
                              className="col-span-2"
                              style={{ width: "600px" }}
                            >
                              <strong>{division.name}</strong> <br />
                            </div>
                            <div className="ml-4 flex items-center">
                              <button
                                className="rounded-full bg-purple-900 text-white px-6 py-2 
                            flex flex-col items-center justify-center mr-2"
                                onClick={() => openModal(division)}
                              >
                                <FontAwesomeIcon
                                  icon={faEdit}
                                  style={{ fontSize: "24px" }}
                                />
                              </button>
                              <button
                                className="rounded-full bg-purple-900 text-white px-6 py-2 
                    flex flex-col items-center justify-center"
                                onClick={() => openDeleteModal(division._id)}
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

export default Division;
