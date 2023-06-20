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
//import random_profile_pic1 from "../images/random_profile_pic.jpg";
//import random_profile_pic2 from "../images/random_profile_pic2.jpg";
import { useEffect } from "react";
import divisionStore from "../../stores/divisionStore";
import Modal from "../../modals/Modal";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Logic for handling form submission
    await addDivision(name);
    setName("");
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
                      {divisions.map((division) => (
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
                                onClick={() => deleteDivision(division._id)}
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

export default Division;
