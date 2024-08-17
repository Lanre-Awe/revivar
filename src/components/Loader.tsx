import React, { useEffect, useState } from "react";

interface LoaderProps {
  loadingTexts: string[];
}

const Loader: React.FC<LoaderProps> = ({ loadingTexts }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % loadingTexts.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [loadingTexts.length]);

  return (
    <div className="flex items-center justify-center absolute inset-0 bg-white bg-opacity-70 z-50">
      <div className="flex flex-col items-center">
        <div className="loader"></div>
        <p className="mt-4 text-lg font-montserratSemiBold text-gray-700">
          {loadingTexts[currentTextIndex]}
        </p>
      </div>
    </div>
  );
};

export default Loader;
