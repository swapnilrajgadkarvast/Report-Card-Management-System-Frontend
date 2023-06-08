import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export default function Dropdown_Result() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    return (
              <div className="relative w-full  h-40 flex bg-slate-50 mr-10">
              <label className='mr-5'> 
                Student
              </label>
              <div className="relative inline-block mr-10">
              <button
              onClick={toggleDropdown}
              className=" w-60 flex items-center justify-between px-4 py-2 rounded-md border border-gray-300 bg-white
                text-gray-700 hover:bg-gray-100 focus:outline-none"
              >
              Select Student
              <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
              </button>
              {isOpen && (
              <div className="absolute top-full left-0 mt-2 w-60 bg-white border border-gray-300 rounded-md shadow-lg">
                <option>ReactJS Dropdown</option>
                <option>Laravel 9 with React</option>
                <option>React with Tailwind CSS</option>
                <option>React With Headless UI</option>
                {/* Dropdown content */}
              </div>
              )}
              </div>

              <label className='mr-5'> 
                Test
              </label>
              <div className="relative inline-block">

              <button
              onClick={toggleDropdown}
              className=" w-60 flex items-center justify-between px-4 py-2 rounded-md border border-gray-300 bg-white
                text-gray-700 hover:bg-gray-100 focus:outline-none"
              >
              Select Test
              <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
              </button>
              {isOpen && (
              <div className="absolute top-full left-0 mt-2 w-60 bg-white border border-gray-300 rounded-md shadow-lg">
                <option>ReactJS Dropdown</option>
                <option>Laravel 9 with React</option>
                <option>React with Tailwind CSS</option>
                <option>React With Headless UI</option>
                {/* Dropdown content */}
              </div>
              )}
              </div>

              <button class=" h-16 w-40 bg-slate-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute right-2.5 ">
              Add Report
              </button>


              </div>
      
    );
  };
      
    