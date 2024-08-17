import React from "react";
import Loader from "./Loader";

interface Image {
  id: string;
  urls: {
    thumb: string;
  };
}

interface ImageSidebarProps {
  imageArr: Image[];
  error: boolean;
  loading: boolean;
  selectedImage: Image | null;
  setSelectedImage: (image: Image) => void;
  fetchRandom: () => void;
}

const ImageSidebar: React.FC<ImageSidebarProps> = ({
  imageArr,
  selectedImage,
  error,
  loading,
  setSelectedImage,
  fetchRandom,
}) => {
  return (
    <div className=" w-1/4">
      <div className="mb-4">
        <h1 className="text-3xl font-montserratBold text-gray-600 animate-bounce">
          Gratitude Gram
        </h1>
        <span className="text-xs font-montserratSemiBold">
          Send Thanks That Make a Lasting Impression!
        </span>
      </div>
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
                An Error Occured
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
