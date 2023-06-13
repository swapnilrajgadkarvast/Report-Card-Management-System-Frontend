import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };

  return (
    <div
      className="fixed inset-0
        
       backdrop-blur-sm flex justify-center 
       items-center"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="w-[400px] flex flex-col bg-slate-400">
        <button
          className="text-white text-xl place-self-end"
          onClick={() => onClose()}
        >
          X
        </button>
        <div className="rounded-lg p-8 z-50 bg-slate-200">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
