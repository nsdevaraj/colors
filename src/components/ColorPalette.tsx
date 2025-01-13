import { useEffect, useState } from "react";
import { ColorBlock } from "./ColorBlock";
import { generateMultipleColors, generateRandomColor, getHash } from "@/lib/colors";

interface ColorState {
  hex: string;
  locked: boolean;
}

export const ColorPalette = () => {
  const [numberOfColors, setNumberOfColors] = useState<number>(20);
  const [colors, setColors] = useState<ColorState[]>(
    generateMultipleColors(numberOfColors).map((hex) => ({ hex, locked: false }))
  );

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();
        generateNewColors();
      }
    };
    getHash(colors.map((color) => color.hex),window)
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [colors]);

  const generateNewColors = () => {
    setColors((prevColors) =>
      prevColors.map((color) =>
        color.locked ? color : { ...color, hex: generateRandomColor() }
      )
    );
  };

  const toggleLock = (index: number) => {
    setColors((prevColors) =>
      prevColors.map((color, i) =>
        i === index ? { ...color, locked: !color.locked } : color
      )
    );
  };

  const handleColorChange = (index: number, newColor: string) => {
    setColors((prevColors) =>
      prevColors.map((color, i) => (i === index ? { ...color, hex: newColor } : color))
    );
  };

  return (
    <div className="flex flex-col min-h-screen"> 
      <div className="flex flex-wrap flex-1">
        {colors.map((color, index) => { return (
          <ColorBlock
            key={index}
            index={index}
            color={color.hex}
            isLocked={color.locked}
            onToggleLock={() => toggleLock(index)}
            onGenerateNew={handleColorChange}
          />
        )})}
      </div>
    </div>
  );
};