import React from "react";
import { FaDownload } from "react-icons/fa";
import { MdClear } from "react-icons/md";

interface ControlsProps {
  downloadImage: () => void;
  handleClear: () => void;
}

const Controls: React.FC<ControlsProps> = ({ downloadImage, handleClear }) => {
  return (
    <>
      <button
        className="bg-green-500 w-36 flex gap-2 items-center justify-center hover:bg-green-600 text-white rounded-lg shadow-lg px-4 py-2 font-montserratSemiBold transition-colors duration-300 ease-in-out"
        onClick={downloadImage}
      >
        <FaDownload />
        Download
      </button>
      <button
        className="bg-gray-500 w-36 flex gap-2 items-center justify-center hover:bg-gray-600 text-white rounded-lg shadow-lg px-4 py-2 font-montserratSemiBold transition-colors duration-300 ease-in-out"
        onClick={handleClear}
      >
        Clear All
        <MdClear />
      </button>
    </>
  );
};

export default Controls;
