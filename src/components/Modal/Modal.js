import React from 'react';


const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-[10%] left-[30%] w-[35%] h-[80%] p-[100px] flex items-center justify-center overflow-y-auto overflow-x-auto mt-3  bg-black">
      <div className="bg-white p-[50px] rounded-md">
        <button className="absolute top-2 right-2 text-white" onClick={onClose}>
          Close
        </button>
       {children}
      </div>
    </div>
  );
};

export default Modal;
