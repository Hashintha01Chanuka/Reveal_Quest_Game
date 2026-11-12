import React from 'react';

const Modal = ({ isOpen, title, children, onClose, buttonText = "OK", onButtonClick, buttonColor = "bg-[#FFD93D]" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#0b1b36] w-full max-w-[400px] rounded-2xl p-6 shadow-2xl border border-white/10 flex flex-col gap-4 text-center transform transition-all scale-100">

        <h3 className="text-white text-2xl font-bold m-0">{title}</h3>

        <div className="text-gray-300 text-sm">
          {children}
        </div>

        <button
          onClick={onButtonClick || onClose}
          className={`w-full mt-2 ${buttonColor} text-[#0b1b36] py-3 rounded-lg font-bold hover:brightness-110 active:scale-[0.98] transition-all`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Modal;
