import React from "react";

export default function Modal({ isOpen, image, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <img
        src={image}
        alt="Preview"
        className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      />

      <button
        className="absolute top-5 right-5 text-white text-3xl"
        onClick={onClose}
      >
        ✕
      </button>
    </div>
  );
}