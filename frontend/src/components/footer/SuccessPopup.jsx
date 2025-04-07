//Zahra src/components/SuccessPopup.jsx
import React from "react";

const SuccessPopup = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-[6px] flex items-center justify-center z-50">
      <div className="bg-white/70 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl p-8 max-w-md w-[90%] text-center animate-fadeIn">
        <h3 className="text-2xl font-semibold text-[#116769] mb-4 font-playfair">
          {message}
        </h3>
        <button
          onClick={onClose}
          className="mt-4 bg-gradient-to-r from-[#116769] to-[#14b8a6] text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          Schließen
        </button>
      </div>
    </div>
  );
};

export default SuccessPopup;
