import React, { useState,useEffect } from "react";
import standardStore from "../stores/standardStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faSearch,
  faTimes,
  faEdit,
  faTrash,

} from "@fortawesome/free-solid-svg-icons";
import logo from "../images/rcms_logo_small.jpg";
//import random_profile_pic1 from "../images/random_profile_pic.jpg";
//import random_profile_pic2 from "../images/random_profile_pic2.jpg";
import Modal from "../modals/Modal";

const Standards = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [modalStandardId, setModalStandardId] = useState('');
  const [modalStandardName, setModalStandardName] = useState('');

  const openModal = (standard) => {
    setIsOpen(true);
    setModalStandardId(standard._id)
    setModalStandardName(standard.name)
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalStandardId('');
    setModalStandardName('')
  };


  const [showProfile, setShowProfile] = useState(false);
  const [name,setName]=useState("");
  
    const { standards, loading, error, getStandards,addStandard,deleteStandard,updateStandard } = standardStore();
  
    useEffect(() => {
     getStandards();
    }, [getStandards]);
  
    if (loading) {
      return <p>Loading...</p>;
    }
  
    if (error) {
      return <p>Error: {error}</p>;
    }
  
    if (!standards) {
      return null; // Or show a loading indicator
    }
    //  else
     // console.log(standards.data);
    

  
  
  const handleProfileClick = () => {
    setShowProfile(!showProfile);
  };

  const handleLogout = () => {
    // Logic for handling logout
  };

  

  // const handleInputChange = (e) => {
  //  const { name, value } = e.target;
  //   setStudentData((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //  }));
  // };

  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for handling form submission
    //console.log(studentData);
    // Reset form after submission
    // setStudentData({
    //   student_name: "",
    //   birth_date: "",

    //   parent_name: "",
    //   contact: "",
    //   roll_no: "",
    //   email: "",
    //   address: "",
    //   image: null,
    // });
  };
 
  const handleClick=(e)=>{
      e.preventDefault();
      addStandard(name);
      setName("");
  }
   

  return (
    <>
    <Modal isOpen={isOpen} onClose={closeModal} data={modalStandardId} data2={modalStandardName}>
      <div className="items-center justify-center">
      <div className="mb-4">
        <div className="h-10 w-40 mb-4">
        <h2 className="text-2xl ">Enter Standard</h2>
      </div>
      <input
                            type="text"
                            id="standard_name"
                            name="standard_name"
                            value={modalStandardName}
                            placeholder="Enter standard"
                           onChange={(e)=>{ setModalStandardName(e.target.value)}}
                            className="rounded-lg border border-gray-300 px-2 py-1
                             focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
        </div>
        <button className="rounded-full bg-purple-900 text-white px-6 py-2 
                            flex flex-col items-center justify-center" 
                            onClick={()=>updateStandard(modalStandardId,modalStandardName)}
                            >
                              Update Standard
                            </button>

                            </div>
      </Modal>
    
    <div style={{ backgroundColor: "white" }}>
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
                  className="rounded-full pl-10 pr-32 py-2 border border-gray-300 focus:outline-none 
                  focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                />
              </div>
             
            </div>
           
            <div className=" grid grid-cols-12 mt-4 ml-1">
              <div className="col-span-10 flex">
                <div className="mt-4 w-full">
                  <div className="bg-purple-300 p-3 rounded-lg">
                    <form onSubmit={handleSubmit}>
                      <div className="grid px-8 grid-cols-6 lg:grid-cols-12 gap-4">
                        <div className="col-span-6">
                          <label htmlFor="standard_name"><strong>Standard &nbsp; </strong></label>
                          <input
                            type="text"
                            id="standard_name"
                            name="standard_name"
                            value={name}
                            placeholder="Enter standard"
                            onChange={(e)=>setName(e.target.value)}
                            className="rounded-lg border border-gray-300 px-2 py-1
                             focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                      className="rounded-full bg-purple-900 text-white px-6 py-2 
                      flex flex-col items-center justify-center"
                      style={{ fontSize: "13px", borderRadius: "8px" }}
                      onClick={handleClick}
                    >
                      <FontAwesomeIcon
                        icon={faPlus}
                        className="text-white"
                        style={{ fontSize: "24px" }}
                      />
                      <span style={{ marginTop: "4px" }}>Add Standard</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-12 mt-4 ml-1">
              <div className="col-span-12 grid">
                <div className="bg-purple-300 p-3 rounded-lg">
                  <div className="mt-4 ml-1">
                    {standards.map((standard) => (
                      <div
                        className="bg-purple-300 w-full p-3 rounded-lg mb-4 border border-white"
                        key={standard._id}
                      >
                        <div className="flex items-start">
                                                  
                          <div className="ml-4">
                            <div
                              className="col-span-2"
                              style={{ width: "150px" }}
                            >
                              <strong>Standard </strong> <br />
                                                  
                            </div>
                            </div>
                            <div
                              className="col-span-2"
                              style={{ width: "600px" }}
                            >
                              <strong>{standard.name}</strong> <br />
                                                           
                            </div>
                          <div className="ml-4 flex items-center">
                            <button className="rounded-full bg-purple-900 text-white px-6 py-2
                             flex flex-col items-center justify-center mr-2" onClick={()=>openModal(standard)} >
                              <FontAwesomeIcon
                                icon={faEdit}
                                style={{ fontSize: "24px" }}
                              />
                            </button>
                            <button className="rounded-full bg-purple-900 text-white px-6 py-2 
                            flex flex-col items-center justify-center" onClick={()=>deleteStandard(standard._id)}>
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

export default Standards;