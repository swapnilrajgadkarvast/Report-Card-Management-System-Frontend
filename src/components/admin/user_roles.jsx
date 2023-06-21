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
import Modal1 from "../../modals/Modal1";

const UserRoles = () => {
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
    updateUserRole,
  } = userrolesStore();

  useEffect(() => {
    getUserRoles();
  }, []);

  const [showProfile, setShowProfile] = useState(false);

  const [selectedUser, setSelectedUser] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedStandard, setSelectedStandard] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
  };

  const handleLogout = () => {
    // Logic for handling logout
  };

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
    console.log(selectedUser);
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
    console.log(selectedRole);
  };

  const handleStandardChange = (e) => {
    setSelectedStandard(e.target.value);
    console.log(selectedStandard);
  };

  const handleDivisionChange = (e) => {
    setSelectedDivision(e.target.value);
    console.log(selectedDivision);
  };

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
    console.log(selectedSubject);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    console.log(selectedYear);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for handling form submission
    // console.log("Selected User:", selectedUser);
    // console.log("Selected Role:", selectedRole);
    // console.log("Selected Standard:", selectedStandard);
    // console.log("Selected Division:", selectedDivision);
    // console.log("Selected Subject:", selectedSubject);
    // console.log("Selected Year:", selectedYear);

    const userrolesobj = {
      user: selectedUser,
      role: selectedRole,
      standard: selectedStandard,
      division: selectedDivision,
      subject: selectedSubject,
      year: selectedYear,
    };

    let found = false;
    for (let i = 0; i < userroles.length; i++) {
      let currentObj = userroles[i];
      delete currentObj._id;
      console.log(userrolesobj);
      console.log(currentObj);
      console.log("++++++++++++++++++++++++");
      // Compare the current object with the input object
      if (
        userrolesobj.user === currentObj.user &&
        userrolesobj.role === currentObj.role &&
        userrolesobj.standard === currentObj.standard &&
        userrolesobj.division === currentObj.division &&
        userrolesobj.subject === currentObj.subject &&
        userrolesobj.year === currentObj.year
      ) {
        found = true;
        console.log(found);
        break; // No need to continue iterating if a match is found
      }
    }

    if (!found) {
      addUserRole(userrolesobj);
    }
    // Reset form after submission

    setSelectedUser("");
    setSelectedRole("");
    setSelectedStandard("");
    setSelectedDivision("");
    setSelectedSubject("");
    setSelectedYear("");
  };

  const handleUpdateUserRole = async () => {
    try {
      let user = "";
      let role = "";
      let standard = "";
      let division = "";
      let subject = "";
      let year = "";
      if (selectedUser) user = selectedUser;
      else user = modalUserId;

      if (selectedRole) role = selectedRole;
      else role = modalRoleId;

      if (selectedStandard) standard = selectedStandard;
      else standard = modalStandardId;

      if (selectedDivision) division = selectedDivision;
      else division = modalDivisionId;

      if (selectedSubject) subject = selectedSubject;
      else subject = modalSubjectId;

      if (selectedYear) year = selectedYear;
      else year = modalYear;

      const userrolesobj = {
        user,
        role,
        standard,
        division,
        subject,
        year,
      };
      console.log(userrolesobj);
      await updateUserRole(modalUserRoleId, userrolesobj);
      // Handle success or display a success message
      closeModal();
    } catch (error) {
      // Handle error or display an error message
    }
  };

  const handleDeleteUserRole = async (userRoleId) => {
    try {
      await deleteUserRole(userRoleId);
    } catch (error) {}
  };

  const [isOpen, setIsOpen] = useState(false);
  const [modalUserName, setModalUserName] = useState("");
  const [modalUserId, setModalUserId] = useState("");
  const [modalRoleId, setModalRoleId] = useState("");
  const [modalRole, setModalRole] = useState("");
  const [modalStandardId, setModalStandardId] = useState("");
  const [modalStandard, setModalStandard] = useState("");
  const [modalDivisionId, setModalDivisionId] = useState("");
  const [modalDivision, setModalDivision] = useState("");
  const [modalSubjectId, setModalSubjectId] = useState("");
  const [modalSubject, setModalSubject] = useState("");
  const [modalYear, setModalYear] = useState("");
  const [modalUserRoleId, setModalUserRoleId] = useState("");

  const openModal = (data) => {
    setSelectedUser("");
    setSelectedRole("");
    setSelectedStandard("");
    setSelectedDivision("");
    setSelectedSubject("");
    setSelectedYear("");

    setIsOpen(true);
    setModalUserRoleId(data.Id);
    setModalUserId(data.userId);
    setModalUserName(data.username);
    setModalRoleId(data.roleId);
    setModalRole(data.role);
    setModalStandardId(data.standardId);
    setModalStandard(data.standard);
    setModalDivisionId(data.divisionId);
    setModalDivision(data.division);
    setModalSubjectId(data.subjectId);
    setModalSubject(data.subject);
    setModalYear(data.year);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalUserRoleId("");
    setModalUserId("");
    setModalUserName("");
    setModalRoleId("");
    setModalRole("");
    setModalStandardId("");
    setModalStandard("");
    setModalDivisionId("");
    setModalDivision("");
    setModalSubjectId("");
    setModalSubject("");
    setModalYear("");
  };

  return (
    <>
      <Modal1 isOpen={isOpen} onClose={closeModal}>
        <div className="mb-2 bg-slate-200">
          <div className="h-10 w-40 mb-2">
            <h2 className="text-xl ">Update User Role</h2>
          </div>
          <div className="mb-2">
            <label className="ml-8">Enter User Name :</label>
            <select
              value={selectedUser}
              onChange={handleUserChange}
              className="rounded-lg border border-gray-300 px-2 py-1 
                              focus:outline-none focus:ring-2 focus:ring-purple-500"
              style={{ width: "200px", padding: "8px" }}
            >
              <option value={modalUserId}>{modalUserName}</option>
              {users.map((username) => (
                <option key={username._id} value={username._id}>
                  {username.firstName + "   " + username.lastName}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label className="ml-16 ">Enter Role :</label>
            <select
              value={selectedRole}
              onChange={handleRoleChange}
              className="rounded-lg border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
              style={{ width: "200px", padding: "8px" }}
            >
              <option value={modalRoleId}>{modalRole}</option>
              {roles.map((role) => (
                <option key={role._id} value={role._id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label className="ml-16">Standard :</label>
            <select
              value={selectedStandard}
              onChange={handleStandardChange}
              className="rounded-lg border border-gray-300 px-2 py-1 focus:outline-none 
                            focus:ring-2 focus:ring-purple-500"
              style={{ width: "200px", padding: "8px" }}
            >
              <option value={modalStandardId}>{modalStandard}</option>
              {standards.map((standard) => (
                <option key={standard._id} value={standard._id}>
                  {standard.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label className="ml-8">Enter Division :</label>
            <select
              value={selectedDivision}
              onChange={handleStandardChange}
              className="rounded-lg border border-gray-300 px-2 py-1 focus:outline-none 
                            focus:ring-2 focus:ring-purple-500"
              style={{ width: "200px", padding: "8px" }}
            >
              <option value={modalDivisionId}>{modalDivision}</option>
              {divisions.map((division) => (
                <option key={division._id} value={division._id}>
                  {division.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label className="ml-8">Enter Subject :</label>
            <select
              value={selectedSubject}
              onChange={handleSubjectChange}
              className="rounded-lg border border-gray-300 px-2 py-1 
                            focus:outline-none focus:ring-2 focus:ring-purple-500"
              style={{ width: "200px", padding: "8px" }}
            >
              <option value={modalSubjectId}>{modalSubject}</option>
              {subjects.map((subject) => (
                <option key={subject._id} value={subject._id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label className="ml-16">Enter Year :</label>
            <select
              value={selectedYear}
              onChange={handleYearChange}
              className="rounded-lg border border-gray-300 px-2 py-1 
                            focus:outline-none focus:ring-2 focus:ring-purple-500"
              style={{ width: "200px", padding: "8px" }}
            >
              <option value={modalYear}>{modalYear}</option>
              <option value="2022" key="2022">
                2022
              </option>
              <option value="2023" key="2023">
                2023
              </option>
            </select>
          </div>
        </div>
        <button
          className="rounded-full bg-purple-900 text-white px-6 py-2 
                        flex flex-col items-center justify-center ml-28"
          onClick={handleUpdateUserRole}
        >
          Update
        </button>
      </Modal1>
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
              <div className="grid grid-cols-12 mt-4 ml-1">
                <div className="col-span-10">
                  <div className="bg-purple-300 p-3 rounded-lg col-span-12">
                    <div className="grid px-8 grid-cols-6 lg:grid-cols-12 gap-4">
                      <div className="col-span-8">
                        <strong htmlFor="user">User </strong>
                        <select
                          value={selectedUser}
                          onChange={handleUserChange}
                          className="rounded-lg border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          style={{ width: "426px", padding: "8px" }}
                        >
                          <option value="">Select a User</option>
                          {users.map((username) => (
                            <option key={username._id} value={username._id}>
                              {username.firstName + "   " + username.lastName}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-span-4">
                        <strong htmlFor="role">Roles </strong>
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
                      <div className="col-span-2">
                        <strong htmlFor="standard">Standard </strong>
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
                      <div className="col-span-2">
                        <strong htmlFor="division">Division </strong>
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
                      <div className="col-span-2">
                        <strong htmlFor="subject">Subject </strong>
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
                      <div className="col-span-2">
                        <strong htmlFor="year">Year </strong>
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
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="ml-6 flex items-end justify-end">
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
                      <span style={{ marginTop: "4px" }}>Add User</span>
                    </button>
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
