import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center backdrop-blur-sm overflow-y-scroll"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="w-80 sm:w-[35rem] flex flex-col bg-slate-400 mt-[35rem]">
        <button
          className="text-xl place-self-end p-2 text-red-500
          hover:bg-red-500 hover:text-white border border-white rounded-full"
          onClick={() => onClose()}
        >
          X
        </button>
        <div className="rounded-lg p-8 z-50 bg-slate-200 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
