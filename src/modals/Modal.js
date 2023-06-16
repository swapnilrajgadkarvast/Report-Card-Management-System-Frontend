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
      <div className="w-64 sm:w-[35rem] flex flex-col bg-slate-400 mt-[35rem]">
        <button
          className="text-white text-xl place-self-end"
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
