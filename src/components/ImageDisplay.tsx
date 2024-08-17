import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import Loader from "./Loader";
import { renderErrorToast } from "../utils";
// import html2canvas from "html2canvas";

interface Image {
  id: string;
  urls: {
    small: string;
  };
}

interface ImageDisplayProps {
  selectedImage: Image | null;
  textColor: { r: number; g: number; b: number };
  blurColor: { r: number; g: number; b: number };
  text: string;
  showText: boolean;
  download: boolean;
  setText: (text: string) => void;
  setShowText: (show: boolean) => void;
  setDownload: (download: boolean) => void;
}

interface ImageDisplayHandle {
  getElement: () => HTMLDivElement | null;
}

const ImageDisplay = forwardRef<ImageDisplayHandle, ImageDisplayProps>(
  (
    {
      selectedImage,
      textColor,
      blurColor,
      download,
      text,
      showText,
      setText,
      setShowText,
      setDownload,
    },
    ref
  ) => {
    const captureRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const loadingTexts = [
      "Preparing your image...",
      "Almost there...",
      "Just a moment...",
    ];

    useImperativeHandle(ref, () => ({
      getElement: () => captureRef.current,
    }));

    const generateCard = () => {
      const inputValue = inputRef.current?.value.trim() || "";
      if (inputValue == "") {
        renderErrorToast("Please add a name to proceed");
        return;
      }
      setIsLoading(true);

      setTimeout(() => {
        setText(inputValue);
        setShowText(true);
        setDownload(true);
        setIsLoading(false);
      }, 6000);
    };

    const formatRgb = (rgbObject: { r: number; g: number; b: number }) => {
      return `rgb(${rgbObject.r},${rgbObject.g},${rgbObject.b})`;
    };

    return (
      <>
        {selectedImage && (
          <div
            className="md:w-96 sm:w-72 md:max-w-3xl sm:max-w-xl relative mb-6"
            ref={captureRef}
          >
            {isLoading && <Loader loadingTexts={loadingTexts} />}
            {showText && (
              <p
                style={{
                  color: formatRgb(textColor),
                  textShadow: `0px 0px 10px ${formatRgb(blurColor)}`,
                  filter: "blur(1px)",
                }}
                className="absolute top-10  md:text-3xl sm:text-xl  font-montserratBold left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
              >
                Thank you
              </p>
            )}
            <img
              src={selectedImage.urls.small}
              className="w-full md:h-96 sm:h-72 rounded-lg shadow-md"
              alt="Selected"
            />
            {showText && (
              <p
                style={{
                  color: formatRgb(textColor),
                  textShadow: `0px 0px 10px ${formatRgb(blurColor)}`,
                  filter: "blur(1px)",
                }}
                className="absolute bottom-5 md:text-3xl sm:text-xl font-montserratBold left-1/2 transform -translate-x-1/2 z-50"
              >
                {text}
              </p>
            )}
          </div>
        )}

        {selectedImage && !download && (
          <div className="md:w-96 sm:w-72 md:max-w-3xl sm:max-w-xl mb-6">
            <input
              type="text"
              placeholder="Enter your name"
              ref={inputRef}
              className="w-full px-4 py-2 mb-4 border-2 font-montserratRegular border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-colors duration-300 ease-in-out"
            />
            <button
              disabled={isLoading}
              className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 disabled:cursor-not-allowed font-montserratSemiBold text-white rounded-lg shadow-lg px-4 py-2 transition-colors duration-300 ease-in-out w-full"
              onClick={generateCard}
            >
              {isLoading ? "Generating...." : "Generate Card"}
            </button>
          </div>
        )}
      </>
    );
  }
);

export default ImageDisplay;
