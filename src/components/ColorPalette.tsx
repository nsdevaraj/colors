import { useEffect, useState } from "react";
import { ColorBlock } from "./ColorBlock";
import { generateMultipleColors, generateRandomColor } from "@/lib/colors";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";

interface ColorState {
  hex: string;
  locked: boolean;
}

export const ColorPalette = () => {
  const [numberOfColors, setNumberOfColors] = useState<number>(20);
  const [colors, setColors] = useState<ColorState[]>(
    generateMultipleColors(numberOfColors).map((hex, index) => ({ hex, locked: false }))
  );

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();
        generateNewColors();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [colors]);

  const generateNewColors = () => {
    console.log("generateNewColors");

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

  const handleNumberChange = (newValue: number) => {
    const validValue = Math.max(1, Math.min(100, newValue));
    setNumberOfColors(validValue);
    setColors(generateMultipleColors(validValue).map((hex, index) => ({ hex,locked: false })));
  };

  const handleColorChange = (index: number, newColor: string) => {
    console.log("newColor", newColor, colors, index);
    setColors((prevColors) =>
      prevColors.map((color, i) => (i === index ? { ...color, hex: newColor } : color))
    );
  };

  return (
    <div className="flex flex-col min-h-screen"> 
      <div className="flex flex-wrap flex-1">
        {colors.map((color, index) => { console.log(color,index); return (
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