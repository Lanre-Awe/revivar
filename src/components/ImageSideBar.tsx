import React, { Dispatch, SetStateAction } from "react";
import Loader from "./Loader";

interface Image {
  id: string;
  urls: {
    thumb: string;
    small: string;
  };
}

interface ImageSidebarProps {
  imageArr: Image[];
  error: boolean;
  loading: boolean;
  errorText: string;
  selectedImage: Image | null;
  setSelectedImage: Dispatch<SetStateAction<Image | null>>;
  fetchRandom: () => void;
}

const ImageSidebar: React.FC<ImageSidebarProps> = ({
  imageArr,
  selectedImage,
  error,
  errorText,
  loading,
  setSelectedImage,
  fetchRandom,
}) => {
  return (
    <div className="md:w-1/4 sm:w-full">
      <div className="mb-4">
        <h1 className="md:text-3xl sm:text-2xl font-montserratBold sm:text-center md:text-left text-gray-600 animate-bounce">
          Gratitude Gram
        </h1>
        <p className="text-xs font-montserratSemiBold sm:text-center md:text-left">
          Send Thanks That Make a Lasting Impression!
        </p>
      </div>
      <p className="uppercase font-montserratSemiBold text-sm text-center text-green-700 my-4">
        Click on an image to get started
      </p>
      <div className="flex flex-col gap-4 items-center w-full">
        {imageArr.length > 0 && !loading && !error ? (
          <div className="grid grid-cols-2 gap-4 w-full">
            {imageArr.map((item) => (
              <img
                onClick={() => setSelectedImage(item)}
                src={item.urls.thumb}
                key={item.id}
                className={`w-full h-28 object-cover rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${
                  selectedImage && selectedImage.id === item.id
                    ? "border-4 border-blue-600"
                    : "border-2 border-transparent"
                }`}
              />
            ))}
          </div>
        ) : imageArr.length < 1 && loading && !error ? (
          <div>
            <Loader loadingTexts={["Fetching Images"]} />
          </div>
        ) : (
          <div className="flex items-center justify-center absolute inset-0 bg-white bg-opacity-70 z-50">
            <div className="flex flex-col items-center">
              <p className="mt-4 text-lg font-montserratSemiBold text-gray-700">
                {errorText}
              </p>
              <button
                className="bg-blue-600 hover:bg-blue-700 font-montserratSemiBold text-white rounded-lg shadow-lg px-4 py-2 mt-6 transition-colors duration-300 ease-in-out w-full"
                onClick={fetchRandom}
              >
                Try Again
              </button>
            </div>
          </div>
        )}
        <button
          className="bg-blue-600 hover:bg-blue-700 font-montserratSemiBold text-white rounded-lg shadow-lg px-4 py-2 mt-6 transition-colors duration-300 ease-in-out w-full"
          onClick={fetchRandom}
        >
          Fetch Random Images
        </button>
      </div>
    </div>
  );
};

export default ImageSidebar;
