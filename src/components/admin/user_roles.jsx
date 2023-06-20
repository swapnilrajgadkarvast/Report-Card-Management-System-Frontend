import React, { useState } from "react";
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
//import random_profile_pic1 from "../images/random_profile_pic.jpg";
//import random_profile_pic2 from "../images/random_profile_pic2.jpg";
import userrolesStore from "../../stores/userrolesStore";
import { useEffect } from "react";
import Modal from "../../modals/Modal";

const UserRoles = () => {
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedStandard, setSelectedStandard] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const {
    userroles,
    userRolesDataToDisplay,
    userRoleIds,
    users,
    roles,
    subjects,
    standards,
    divisions,
    getUserRoles,
    addUserRole,
    deleteUserRole,
  } = userrolesStore();

  useEffect(() => {
    getUserRoles();
  }, []);

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
    // console.log(selectedUser);
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
    // console.log(selectedRole);
  };

  const handleStandardChange = (e) => {
    setSelectedStandard(e.target.value);
    // console.log(selectedStandard);
  };

  const handleDivisionChange = (e) => {
    setSelectedDivision(e.target.value);
    // console.log(selectedDivision);
  };

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
    // console.log(selectedSubject);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    // console.log(selectedYear);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userrolesobj = {
      user: selectedUser,
      role: selectedRole,
      standard: selectedStandard,
      division: selectedDivision,
      subject: selectedSubject,
      year: selectedYear,
    };

    const isDuplicate = userroles.some((currentObj) => {
      // Compare the current object with the input object
      return (
        userrolesobj.user === currentObj.user &&
        userrolesobj.role === currentObj.role &&
        userrolesobj.standard === currentObj.standard &&
        userrolesobj.division === currentObj.division &&
        userrolesobj.subject === currentObj.subject &&
        userrolesobj.year === currentObj.year
      );
    });

    if (!isDuplicate) {
      try {
        await addUserRole(userrolesobj);
        console.log("New User role added");

        // Reset form after successful submission
        // Reset your form fields here if needed
      } catch (error) {
        console.error("Error adding user role:", error);
      }
    }
  };

  const handleDeleteUserRole = async (userRoleId) => {
    try {
      await deleteUserRole(userRoleId);
    } catch (error) {}
  };

  const [isOpen, setIsOpen] = useState(false);
  const [modalUserName, setModalUserName] = useState("");
  const [modalRole, setModalRole] = useState("");
  const [modalStandard, setModalStandard] = useState("");
  const [modalDivision, setModalDivision] = useState("");
  const [modalSubject, setModalSubject] = useState("");
  const [modalYear, setModalYear] = useState("");

  const openModal = (role) => {
    setIsOpen(true);
    //setModalRoleId(role._id);
    //setModalRoleName(role.name);
  };

  const closeModal = () => {
    setIsOpen(false);
    //setModalRoleId("");
    //setModalRoleName("");
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        // data={modalGradeId}
        // data2={modalGradeName}
        // data3={modalGradeStart}
        // data4={modalGradeEnd}
      >
        <div className="mb-2 bg-slate-200">
          <div className="h-10 w-40 mb-2">
            <h2 className="text-xl ">Update User Role</h2>
          </div>
          <div className="mb-2">
            <label className="ml-8">Enter User Name :</label>
            <input
              type="text"
              value={modalUserName}
              onChange={(e) => {
                //setModalUserName(e.target.value);
              }}
              className="mr-2 rounded-lg border border-gray-300 px-2 py-1
                         focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="mb-2">
            <label>Enter Role :</label>
            <input
              type="text"
              //  value={modalGradeStart}
              onChange={(e) => {
                // setModalGradeStart(e.target.value);
              }}
              className="rounded-lg border border-gray-300 px-2 py-1
                         focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label>Standard :</label>
            <input
              type="text"
              // value={modalGradeEnd}
              onChange={(e) => {
                // setModalGradeEnd(e.target.value);
              }}
              className="rounded-lg border border-gray-300 px-2 py-1
                         focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
        <button
          className="rounded-full bg-purple-900 text-white px-6 py-2 
                        flex flex-col items-center justify-center"
          // onClick={() =>{
          //   console.log(modalGradeName);
          //   updateGrade(modalGradeId, {
          //     name:modalGradeName,
          //     start:modalGradeStart,
          //     end:modalGradeEnd,
          //   })}
          // }
        >
          Update
        </button>
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
                    className="absolute top-1/2 left-3 transform -translate-y-1/2
                   text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Search"
                    className="rounded-full pl-10 pr-32 py-2 border border-gray-300 
                  focus:outline-none focus:ring-2 focus:ring-purple-500
                   focus:border-transparent"
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2
                   text-gray-400 cursor-pointer"
                  />
                </div>
              </div>
              <div className="grid grid-cols-12 mt-4 ml-1"></div>
              <div className=" grid grid-cols-12 mt-4 ml-1">
                <div className="col-span-12 flex">
                  <div className="mt-4">
                    <div className="bg-purple-300 p-3 rounded-lg col-span-12">
                      <form onSubmit={handleSubmit}>
                        <div className="grid px-8 grid-cols-6 lg:grid-cols-12 gap-4">
                          <div className="col-span-8">
                            <label htmlFor="student_name">User </label>
                            <select
                              value={selectedUser}
                              onChange={handleUserChange}
                              className="rounded-lg border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                              style={{ width: "450px", padding: "8px" }}
                            >
                              <option value="">Select a User</option>
                              {users.map((username) => (
                                <option key={username._id} value={username._id}>
                                  {username.firstName +
                                    "   " +
                                    username.lastName}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="col-span-4">
                            <label htmlFor="birth_date">Roles </label>
                            <select
                              value={selectedRole}
                              onChange={handleRoleChange}
                              className="rounded-lg border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                              style={{ width: "200px", padding: "8px" }}
                            >
                              <option value="">Select a role</option>
                              {roles.map((role) => (
                                <option key={role._id} value={role._id}>
                                  {role.name}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="col-span-3">
                            <label htmlFor="parent_name">Std </label>
                            <select
                              value={selectedStandard}
                              onChange={handleStandardChange}
                              className="rounded-lg border border-gray-300 px-2 py-1 focus:outline-none 
                            focus:ring-2 focus:ring-purple-500"
                              style={{ width: "100px", padding: "8px" }}
                            >
                              <option value="">Select</option>
                              {standards.map((standard) => (
                                <option key={standard._id} value={standard._id}>
                                  {standard.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="col-span-3">
                            <label htmlFor="contact">Div </label>

                            <select
                              value={selectedDivision}
                              onChange={handleDivisionChange}
                              className="rounded-lg border border-gray-300 px-2 py-1
                             focus:outline-none focus:ring-2 focus:ring-purple-500"
                              style={{ width: "100px", padding: "8px" }}
                            >
                              <option value="">Select</option>
                              {divisions.map((division) => (
                                <option key={division._id} value={division._id}>
                                  {division.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="col-span-3">
                            <label htmlFor="roll_no">Sub </label>

                            <select
                              value={selectedSubject}
                              onChange={handleSubjectChange}
                              className="rounded-lg border border-gray-300 px-2 py-1 
                            focus:outline-none focus:ring-2 focus:ring-purple-500"
                              style={{ width: "100px", padding: "8px" }}
                            >
                              <option value="">Select</option>
                              {subjects.map((subject) => (
                                <option key={subject._id} value={subject._id}>
                                  {subject.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="col-span-3">
                            <label htmlFor="email">Year</label>

                            <select
                              value={selectedYear}
                              onChange={handleYearChange}
                              className="rounded-lg border border-gray-300 px-2 py-1 
                            focus:outline-none focus:ring-2 focus:ring-purple-500"
                              style={{ width: "100px", padding: "8px" }}
                            >
                              <option value="">Select</option>
                              <option value="2022" key="2022">
                                2022
                              </option>
                              <option value="2023" key="2023">
                                2023
                              </option>
                              {/* Add more division options as needed */}
                            </select>
                          </div>
                        </div>
                        <div className="col-span-2 ml-6 mt-4 flex items-end justify-end">
                          <button
                            type="submit"
                            className="rounded-full bg-purple-900 text-white
                           px-6 py-2 flex flex-col items-center justify-center"
                            style={{ fontSize: "13px", borderRadius: "8px" }}
                            onSubmit={handleSubmit}
                          >
                            <FontAwesomeIcon
                              icon={faPlus}
                              className="text-white"
                              style={{ fontSize: "24px" }}
                            />
                            <span style={{ marginTop: "4px" }}>Add User</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" grid grid-cols-12 mt-4 ml-1"></div>
              <div className="grid grid-cols-12 mt-4 ml-1">
                <div className="col-span-12 grid">
                  <div className="bg-purple-300 p-3 rounded-lg">
                    <div className="mt-4 ml-1">
                      {userRolesDataToDisplay.map((data) => (
                        <div
                          className="bg-purple-300 w-full p-3 rounded-lg mb-4 border border-white"
                          key={data.Id}
                        >
                          <div className="flex items-start">
                            <div>
                              <div
                                className="col-span-2 text-gray-400"
                                style={{ width: "100px" }}
                              >
                                <strong>Name</strong> <br />
                              </div>
                              <div
                                className="col-span-2"
                                style={{ width: "200px" }}
                              >
                                <strong>{data.username}</strong> <br />
                              </div>
                            </div>

                            <div>
                              <div
                                className="col-span-2 text-gray-400"
                                style={{ width: "100px" }}
                              >
                                <strong>Role </strong> <br />
                              </div>
                              <div
                                className="col-span-2"
                                style={{ width: "200px" }}
                              >
                                <strong>{data.role}</strong> <br />
                              </div>
                            </div>

                            <div>
                              <div
                                className="col-span-2 text-gray-400"
                                style={{ width: "100px" }}
                              >
                                <strong>Std</strong> <br />
                              </div>
                              <div
                                className="col-span-2"
                                style={{ width: "50px" }}
                              >
                                <strong>{data.standard}</strong> <br />
                              </div>
                            </div>

                            <div className="ml-4">
                              <div
                                className="col-span-2 text-gray-400"
                                style={{ width: "100px" }}
                              >
                                <strong>Div</strong> <br />
                              </div>
                              <div
                                className="col-span-2"
                                style={{ width: "50px" }}
                              >
                                <strong>{data.division}</strong> <br />
                              </div>
                            </div>

                            <div className="ml-4">
                              <div
                                className="col-span-2 text-gray-400"
                                style={{ width: "100px" }}
                              >
                                <strong>Subject </strong> <br />
                              </div>
                              <div
                                className="col-span-2"
                                style={{ width: "100px" }}
                              >
                                <strong>{data.subject}</strong> <br />
                              </div>
                            </div>

                            <div className="ml-4">
                              <div
                                className="col-span-2 text-gray-400"
                                style={{ width: "100px" }}
                              >
                                <strong>Year </strong> <br />
                              </div>
                              <div
                                className="col-span-2"
                                style={{ width: "100px" }}
                              >
                                <strong>{data.year}</strong> <br />
                              </div>
                            </div>

                            <div className="ml-4 flex items-center">
                              <button
                                className="rounded-full bg-purple-900 text-white px-6 py-2 flex flex-col 
                            items-center justify-center mr-2"
                                onClick={() => openModal(data)}
                              >
                                <FontAwesomeIcon
                                  icon={faEdit}
                                  style={{ fontSize: "24px" }}
                                />
                              </button>
                              <button
                                className="rounded-full bg-purple-900 text-white px-6 py-2 flex flex-col
                             items-center justify-center"
                                onClick={() => handleDeleteUserRole(data.Id)}
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

export default UserRoles;
