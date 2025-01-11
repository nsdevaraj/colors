import { LockClosedIcon, LockOpen1Icon } from "@radix-ui/react-icons";
import { SunDim, Palette, MoonStar } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";
import tinycolor from "tinycolor2";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { HexColorPicker } from "react-colorful";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ColorBlockProps {
  color: string;
  isLocked: boolean;
  onToggleLock: () => void;
  onGenerateNew: (newColor: string) => void;
}

export const ColorBlock = ({
  color,
  isLocked,
  onToggleLock,
  onGenerateNew,
}: ColorBlockProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [tempColor, setTempColor] = useState(color);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(color);
    toast.success("Color code copied to clipboard!");
  };

  const handleColorPicker = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsColorPickerOpen(true);
  };

  const handleColorChange = (newColor: string) => {
    setTempColor(newColor);
  };

  const confirmColorChange = () => {
    onGenerateNew(tempColor);
    setIsColorPickerOpen(false);
    toast.success("Color updated", {
      description: `${color} → ${tempColor}`
    });
  };

  const adjustColor = (color: string, amount: number): string => {
    // Use tinycolor's built-in lighten and darken methods for more consistent results
    const tc = tinycolor(color);
    return tc[amount > 0 ? 'lighten' : 'darken'](Math.abs(amount)).toHexString();
  };

  const handleShadeChange = (e: React.MouseEvent, currentColor: string, shadeType: 'lighter' | 'darker') => {
    e.stopPropagation();
    const shadeAmount = shadeType === 'lighter' ? 10 : -10;
    const newColor = adjustColor(currentColor, shadeAmount);
    onGenerateNew(newColor);
    toast.success(`Generated ${shadeType} shade`, {
      description: `${currentColor} → ${newColor}`
    });
  };

  const textColor = isColorLight(color) ? "text-gray-900" : "text-white";

  return (
    <div
      className={cn(
        "relative flex-1 h-screen transition-all duration-300 animate-color-change cursor-pointer group",
        isHovered ? "flex-[1.2]" : "flex-1"
      )}
      style={{ backgroundColor: color }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={copyToClipboard}
    >
      <div
        className={cn(
          "absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0",
          textColor
        )}
      >
        <div className="flex flex-col gap-2 mb-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleLock();
            }}
            className={cn(
              "p-3 rounded-full backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all"
            )}
          >
            {isLocked ? (
              <LockClosedIcon className="w-5 h-5" />
            ) : (
              <LockOpen1Icon className="w-5 h-5" />
            )}
          </button>
          <Dialog open={isColorPickerOpen} onOpenChange={setIsColorPickerOpen}>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogTrigger asChild>
                  <button
                    onClick={handleColorPicker}
                    className={cn(
                      "p-3 rounded-full backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all",
                      "group"
                    )}
                    aria-label="Open Color Picker"
                  >
                    <Palette className="w-5 h-5 group-hover:text-purple-300 transition-colors" />
                  </button>
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Choose Color</p>
              </TooltipContent>
            </Tooltip>
            <DialogContent className="sm:max-w-[425px] flex flex-col items-center justify-center">
              <div className="p-4 bg-white rounded-lg shadow-lg">
                <HexColorPicker 
                  color={tempColor} 
                  onChange={handleColorChange} 
                  className="mb-4"
                />
                <div className="flex justify-between space-x-4">
                  <button 
                    onClick={() => setIsColorPickerOpen(false)}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={confirmColorChange}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={(e) => handleShadeChange(e, color, 'lighter')}
                className={cn(
                  "p-3 rounded-full backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all",
                  "group"
                )}
                aria-label="Lighten Color"
              >
                <SunDim className="w-5 h-5 group-hover:text-yellow-300 transition-colors" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Lighten Shade</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={(e) => handleShadeChange(e, color, 'darker')}
                className={cn(
                  "p-3 rounded-full backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all",
                  "group"
                )}
                aria-label="Darken Color"
              >
                <MoonStar className="w-5 h-5 group-hover:text-indigo-300 transition-colors" style={{ transform: 'rotate(180deg)' }} />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Darken Shade</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <p className="text-2xl font-medium tracking-wider animate-slide-up">
          {color.toUpperCase()}
        </p>
      </div>
    </div>
  );
};

// Helper function to determine if a color is light or dark
const isColorLight = (color: string): boolean => {
  const hex = color.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128;
};