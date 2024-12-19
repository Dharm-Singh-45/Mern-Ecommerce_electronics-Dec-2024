import React from "react";
import { IoMdClose } from "react-icons/io";

const DisplayImage = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      {/* Close Button */}
      <div 
        className="absolute top-5 right-5 text-white text-3xl cursor-pointer p-2 rounded-full hover:bg-red-600 transition-colors"
        onClick={onClose}
      >
        <IoMdClose />
      </div>

      {/* Image Container */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-2xl w-full mx-auto">
        <div className="flex justify-center items-center p-4 max-w-[80vw] max-h-[90vh]">
          <img 
            src={imageUrl} 
            alt="Preview" 
            className="object-contain max-w-full max-h-full rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default DisplayImage;
