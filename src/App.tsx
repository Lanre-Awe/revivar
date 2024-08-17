import axios from "axios";
import html2canvas from "html2canvas";
import { useEffect, useRef, useState } from "react";
import ImageSidebar from "./components/ImageSideBar";
import ImageDisplay from "./components/ImageDisplay";
import Controls from "./components/Controls";
import ColorPickers from "./components/ColorPickers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Image {
  id: string;
  urls: {
    thumb: string;
    small: string;
  };
}

const App = () => {
  const [imageArr, setImageArr] = useState<Image[]>([]);
  const [textColor, setTextColor] = useState({ r: 0, g: 0, b: 0 });
  const [blurColor, setBlurColor] = useState({ r: 255, g: 0, b: 0 });
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [download, setDownload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [text, setText] = useState("");
  const [showText, setShowText] = useState(false);
  const imageRef = useRef(null);
  //fetch random images

  const fetchRandom = async () => {
    setError(false);
    setImageArr([]);
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://api.unsplash.com/photos/random?count=4",
        {
          headers: {
            Authorization: `Client-ID ${import.meta.env.VITE_SPLASH_API_KEY}`,
          },
        }
      );
      console.log(response);
      if (response.status == 200) {
        setIsLoading(false);
        setImageArr(response.data);
      } else {
        setIsLoading(false);
        setError(true);
      }
    } catch (error) {
      setIsLoading(false);
      setErrorText(error.response.data);
      setError(true);
    }
  };
  //use effect to fetch images on load
  useEffect(() => {
    fetchRandom();
  }, []);

  //download the edited image
  const downloadImage = async () => {
    if (imageRef.current) {
      const canvas = await html2canvas(imageRef.current?.getElement(), {
        useCORS: true,
      });

      // Desired aspect ratio (4:5)
      const aspectRatio = 1.25;

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

  //clear all function
  const handleClear = () => {
    setShowText(false);
    setDownload(false);
  };

  return (
    <>
      <ToastContainer />
      <div className="flex md:flex-row sm:flex-col sm:items-center md:items-start sm:gap-5 min-h-screen bg-gray-50 p-6">
        <ImageSidebar
          imageArr={imageArr}
          selectedImage={selectedImage}
          loading={isLoading}
          error={error}
          errorText={errorText}
          setSelectedImage={setSelectedImage}
          fetchRandom={fetchRandom}
        />

        <div className="flex flex-col items-center md:w-2/4 sm:w-full md:pl-6 sm:pl-0">
          <ImageDisplay
            ref={imageRef}
            selectedImage={selectedImage}
            textColor={textColor}
            download={download}
            blurColor={blurColor}
            text={text}
            showText={showText}
            setText={setText}
            setShowText={setShowText}
            setDownload={setDownload}
          />

          {selectedImage && download && (
            <div className="flex gap-4 mt-5 justify-center">
              <Controls
                downloadImage={downloadImage}
                handleClear={handleClear}
              />
            </div>
          )}
        </div>

        {selectedImage && download && (
          <ColorPickers
            textColor={textColor}
            setTextColor={setTextColor}
            blurColor={blurColor}
            setBlurColor={setBlurColor}
          />
        )}
      </div>
    </>
  );
};

export default App;
