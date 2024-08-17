import axios from "axios";
import html2canvas from "html2canvas";
import { useEffect, useRef, useState } from "react";
import { RgbColorPicker } from "react-colorful";
import { FaDownload } from "react-icons/fa";
import { MdClear } from "react-icons/md";

const App = () => {
  const [imageArr, setImageArr] = useState([]);
  const [textColor, setTextColor] = useState({ r: 0, g: 0, b: 0 });
  const [blurColor, setBlurColor] = useState({ r: 255, g: 0, b: 0 });
  const [selectedImage, setSelectedImage] = useState(null);
  const [download, setDownload] = useState(false);
  const [text, setText] = useState("");
  const [showText, setShowText] = useState(false);
  const inputRef = useRef(null);
  const captureRef = useRef(null);
  const fetchRandom = async () => {
    try {
      const response = await axios.get(
        "https://api.unsplash.com/photos/random?count=4",
        {
          headers: {
            Authorization:
              "Client-ID ccWXT_3DZvp4WppYMevY0WY_TsvCoaxWF6l7ph_gpbg",
          },
        }
      );
      console.log(response);
      if (response.status == 200) {
        setImageArr(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRandom();
  }, []);

  const generateCard = () => {
    const inputValue = inputRef.current.value.trim();
    setText(inputValue);
    setShowText(true);
    setDownload(true);
  };

  const formatRgb = (rgbObject) => {
    return `rgb(${rgbObject.r},${rgbObject.g},${rgbObject.b})`;
  };

  const downloadImage = async () => {
    if (captureRef.current) {
      const canvas = await html2canvas(captureRef.current, {
        useCORS: true,
      });

      // Desired aspect ratio (4:5)
      const aspectRatio = 4 / 5;

      // Calculate the target dimensions
      const width = canvas.width;
      const height = width * aspectRatio;

      // Create a new canvas to adjust the aspect ratio
      const croppedCanvas = document.createElement("canvas");
      croppedCanvas.width = width;
      croppedCanvas.height = height;

      const ctx = croppedCanvas.getContext("2d");

      // Draw the original canvas onto the new one, with the desired aspect ratio
      ctx!.drawImage(canvas, 0, 0, width, height);

      // Trigger download
      const link = document.createElement("a");
      link.href = croppedCanvas.toDataURL("image/png");
      link.download = "image.png";
      link.click();
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
      <div className="flex gap-4 items-center mb-6">
        {imageArr.length > 0 &&
          imageArr.map((item: any) => (
            <img
              onClick={() => setSelectedImage(item)}
              src={item.urls.thumb}
              key={item.id}
              className={`w-28 h-28 object-cover rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${
                selectedImage && selectedImage.id === item.id
                  ? "border-4 border-blue-600"
                  : "border-2 border-transparent"
              }`}
            />
          ))}
      </div>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg px-4 py-2 mb-6 transition-colors duration-300 ease-in-out"
        onClick={fetchRandom}
      >
        Fetch Random Images
      </button>

      {selectedImage && (
        <div className="w-full max-w-lg relative mb-6" ref={captureRef}>
          {showText && (
            <p
              style={{
                color: formatRgb(textColor),
                textShadow: `0px 0px 10px ${formatRgb(blurColor)}`,
                filter: "blur(1px)",
              }}
              className="absolute top-5 text-3xl font-bold left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
            >
              Thank you
            </p>
          )}
          <img
            src={selectedImage.urls.small}
            className="w-full rounded-lg shadow-md"
            alt="Selected"
          />
          {showText && (
            <p
              style={{
                color: formatRgb(textColor),
                textShadow: `0px 0px 10px ${formatRgb(blurColor)}`,

                filter: "blur(1px)",
              }}
              className="absolute bottom-5 text-3xl font-bold left-1/2 transform -translate-x-1/2 z-50"
            >
              {text}
            </p>
          )}
        </div>
      )}

      {selectedImage && !download && (
        <div className="w-full max-w-lg mb-6">
          <input
            type="text"
            placeholder="Enter your name"
            ref={inputRef}
            className="w-full px-4 py-2 mb-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-colors duration-300 ease-in-out"
          />
          <button
            className="bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-lg px-4 py-2 transition-colors duration-300 ease-in-out w-full"
            onClick={generateCard}
          >
            Generate Card
          </button>
        </div>
      )}
      {selectedImage && download && (
        <div>
          <div className="flex gap-6">
            <div>
              <p>Text color</p>
              <RgbColorPicker color={textColor} onChange={setTextColor} />
            </div>
            <div>
              <p>Blur color</p>
              <RgbColorPicker color={blurColor} onChange={setBlurColor} />
            </div>
          </div>
          <div className="flex gap-4 my-5">
            <button
              className="bg-green-500 w-36 flex gap-2 items-center justify-center hover:bg-green-600 text-white rounded-lg shadow-lg px-4 py-2 transition-colors duration-300 ease-in-out"
              onClick={downloadImage}
            >
              <FaDownload />
              Download
            </button>
            <button
              className="bg-gray-500 w-36 flex gap-2 items-center justify-center hover:bg-gray-600 text-white rounded-lg shadow-lg px-4 py-2 transition-colors duration-300 ease-in-out"
              onClick={generateCard}
            >
              Clear All
              <MdClear />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
