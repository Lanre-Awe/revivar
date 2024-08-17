import React from "react";
import { RgbColorPicker } from "react-colorful";

interface ColorPickersProps {
  textColor: { r: number; g: number; b: number };
  setTextColor: (color: { r: number; g: number; b: number }) => void;
  blurColor: { r: number; g: number; b: number };
  setBlurColor: (color: { r: number; g: number; b: number }) => void;
}

const ColorPickers: React.FC<ColorPickersProps> = ({
  textColor,
  setTextColor,
  blurColor,
  setBlurColor,
}) => {
  return (
    <div className="w-1/4 mb-6">
      <div className="flex flex-col gap-6 justify-center">
        <div className="flex flex-col items-center">
          <p className="font-montserratSemiBold">Text color</p>
          <RgbColorPicker color={textColor} onChange={setTextColor} />
        </div>
        <div className="flex flex-col items-center">
          <p className="font-montserratSemiBold">Blur color</p>
          <RgbColorPicker color={blurColor} onChange={setBlurColor} />
        </div>
      </div>
    </div>
  );
};

export default ColorPickers;
