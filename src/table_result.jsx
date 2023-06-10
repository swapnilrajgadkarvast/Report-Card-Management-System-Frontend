//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Table = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      {/* mr-4 mb-6 ml-8 */}
      <div className="w-full flex">
        <table className="w-full ">
          <thead class="border-b font-medium dark:border-neutral-500 bg-gray-200">
            {/* <tr>
              <th scope="col" class="px-6 py-4">#</th>
              <th scope="col" class="px-6 py-4">First</th>
              <th scope="col" class="px-6 py-4">Last</th>
              <th scope="col" class="px-6 py-4">Handle</th>
            </tr> */}
          </thead>
          <tbody>
            <tr class="border-1 transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
              {/* <td class="whitespace-nowrap px-6 py-4 font-medium">1</td> */}
              <td class="whitespace-nowrap px-6 py-4 w-20">Test</td>
              <td class="whitespace-nowrap px-6 py-4 w-96">Class Test 1</td>
              <td class="whitespace-nowrap px-6 py-4 w-10">
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </td>
              <td class="whitespace-nowrap px-6 py-4 w-10">
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </td>
            </tr>
            <tr class="border transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
              <td class="whitespace-nowrap px-6 py-4 font-medium">Test</td>
              <td class="whitespace-nowrap px-6 py-4">Unit Test 1</td>
              <td class="whitespace-nowrap px-6 py-4">
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </td>
              <td class="whitespace-nowrap px-6 py-4">
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </td>
            </tr>
            <tr class="border transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
              <td class="whitespace-nowrap px-6 py-4 font-medium">Test</td>
              <td class="whitespace-nowrap px-6 py-4">Class Test 2</td>

              <td class="whitespace-nowrap px-6 py-4">
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </td>
              <td class="whitespace-nowrap px-6 py-4">
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
