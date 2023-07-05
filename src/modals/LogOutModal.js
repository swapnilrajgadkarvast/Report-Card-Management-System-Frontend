import { faPersonRunning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { useNavigate } from "react-router-dom";

const LogOutModal = ({ show, onClose, setLogin, setShow }) => {
  const navigate = useNavigate();
  return (
    <>
      {show ? (
        <div>
          <div className="absolute flex top-0 right-0 left-0 bottom-0 bg-black bg-opacity-50 z-50 items-center justify-center">
            <div
              className="relative min-w-[80%] min-h-[150px] bg-gray-900 rounded-[1rem] flex items-center justify-center"
              style={{ boxShadow: "0 0 30px black" }}
            >
              <button onClick={onClose} className="absolute top-2 right-2">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="white"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>

              <div
                className="absolute top-10 ml-2 left-4 font-bold text-2xl "
                style={{ color: "white" }}
              >
                <FontAwesomeIcon
                  icon={faPersonRunning}
                  className="mr-2"
                  style={{ color: "red", fontSize: "30px" }}
                />
                Are you sure you want to Logout ?
              </div>
              <div className="mt-28 mb-9">
                <button
                  onClick={() => {
                    navigate("/login");
                    setLogin(false);
                    sessionStorage.clear();
                    setShow(false);
                  }}
                  className="bg-green-700 hover:bg-green-400 text-black font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline border mr-2"
                  style={{ boxShadow: "0 0 10px white" }}
                >
                  Yes
                </button>
                <button
                  onClick={onClose}
                  className="bg-red-700 hover:bg-red-400 text-black font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline border"
                  style={{ boxShadow: "0 0 10px white" }}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default LogOutModal;
