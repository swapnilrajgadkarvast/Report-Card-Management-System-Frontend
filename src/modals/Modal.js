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
      {/* className="fixed inset-0 backdrop-blur-sm flex justify-center items-center"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="w-[400px] flex flex-col bg-slate-400">
        <div className="flex justify-end p-4">
          <button
            className="h-8 w-8 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white border border-white rounded-full"
            onClick={() => onClose()}
          >
            <span className="text-white text-lg">X</span>
          </button>
        </div>
        <div className="p-4">{children}</div> */}
      </div>
    </div>
  );
};

export default Modal;
