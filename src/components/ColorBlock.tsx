import { LockClosedIcon, LockOpen1Icon } from "@radix-ui/react-icons";
import { Palette, SunDim } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";

interface ColorBlockProps {
  color: string;
  isLocked: boolean;
  onToggleLock: () => void;
  onGenerateNew: () => void;
}

export const ColorBlock = ({
  color,
  isLocked,
  onToggleLock,
  onGenerateNew,
}: ColorBlockProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(color);
    toast.success("Color code copied to clipboard!");
  };

  const handleColorPicker = (e: React.MouseEvent) => {
    e.stopPropagation();
    // This will be implemented in a future feature
    toast.info("Color picker feature coming soon!");
  };

  const handleShadeChange = (e: React.MouseEvent) => {
    e.stopPropagation();
    // This will be implemented in a future feature
    toast.info("Shade adjustment feature coming soon!");
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
          <button
            onClick={handleColorPicker}
            className={cn(
              "p-3 rounded-full backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all"
            )}
          >
            <Palette className="w-5 h-5" />
          </button>
          <button
            onClick={handleShadeChange}
            className={cn(
              "p-3 rounded-full backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all"
            )}
          >
            <SunDim className="w-5 h-5" />
          </button>
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