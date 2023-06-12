import React from 'react';

const standardModal = ({ isOpen, closeModal}) => {
  if (!isOpen) return null;

  return (
    <div id="modal-body"
    onClick={(e)=>e.target.id==="modal-body" && closeModal()}
     className="fixed inset-0 flex items-center justify-center z-50">

      <div className="absolute inset-0 bg-black opacity-75"></div>
      <div className="bg-white p-6 rounded-lg z-10">
        <h1>First Modal</h1>

        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={closeModal()}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default standardModal;
