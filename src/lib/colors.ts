export const generateRandomColor = (): string => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const generateMultipleColors = (count: number = 20, colors?: string[]): string[] => {
  const urlParams = new URLSearchParams(window.location.search);
  const encodedColors = urlParams.get("colors");
  colors = decodeColors(encodedColors);
  getHash(colors, window);
  if (colors) return colors;
  colors = Array(count).fill(null).map(() => generateRandomColor());
  return colors;
};

export const isColorLight = (color: string): boolean => {
  const hex = color.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128;
};


export function getHash(colors, window) {
  // Update URL with base64 encoded colors
  const colorsString = JSON.stringify(colors);
  const encodedColors = btoa(colorsString);
  const newUrl = new URL(window.location);
  newUrl.searchParams.set("colors", encodedColors);
  window.history.pushState({}, "", newUrl);
}
export function decodeColors(encodedColors) {
  if (encodedColors) {
    try {
      const colorsString = atob(encodedColors);
      const colors = JSON.parse(colorsString);
      if (Array.isArray(colors) && colors.length > 0) {
        return colors;
      }
    } catch (e) {
      console.error("Error loading colors from URL:", e);
    }
  }
}

export function getHarmonyColors(harmonyType, baseHue) {
  let colors = [];
  switch (harmonyType) {
    case "monochromatic":
      for (let i = 0; i < 20; i++) {
        const lightness = 10 + i * 5;
        colors.push(`hsl(${baseHue}, 80%, ${lightness}%)`);
      }
      break;
    case "analogous":
      const hues = [baseHue, (baseHue + 30) % 360, (baseHue - 30 + 360) % 360];
      const colorsPerHue = Math.floor(20 / hues.length);
      hues.forEach((hue) => {
        for (let i = 0; i < colorsPerHue; i++) {
          const lightness = 20 + i * 10;
          colors.push(`hsl(${hue}, 80%, ${lightness}%)`);
        }
      });
      while (colors.length < 20) {
        colors.push(colors[colors.length - 1]);
      }
      break;
    case "complementary":
      const complementaryHue = (baseHue + 180) % 360;
      const complementaryColors = [baseHue, complementaryHue];
      complementaryColors.forEach((hue) => {
        for (let i = 0; i < 10; i++) {
          const lightness = 20 + i * 10;
          colors.push(`hsl(${hue}, 80%, ${lightness}%)`);
        }
      });
      break;
    case "triadic":
      const triadicHues = [
        baseHue,
        (baseHue + 120) % 360,
        (baseHue + 240) % 360,
      ];
      const colorsPerTriadicHue = Math.floor(20 / triadicHues.length);
      triadicHues.forEach((hue) => {
        for (let i = 0; i < colorsPerTriadicHue; i++) {
          const lightness = 20 + i * 10;
          colors.push(`hsl(${hue}, 80%, ${lightness}%)`);
        }
      });
      while (colors.length < 20) {
        colors.push(colors[colors.length - 1]);
      }
      break;
    case "tetradic":
      const tetradicHues = [
        baseHue,
        (baseHue + 90) % 360,
        (baseHue + 180) % 360,
        (baseHue + 270) % 360,
      ];
      const colorsPerTetradicHue = Math.floor(20 / tetradicHues.length);
      tetradicHues.forEach((hue) => {
        for (let i = 0; i < colorsPerTetradicHue; i++) {
          const lightness = 20 + i * 10;
          colors.push(`hsl(${hue}, 80%, ${lightness}%)`);
        }
      });
      while (colors.length < 20) {
        colors.push(colors[colors.length - 1]);
      }
      break;
    case "qualitative":
      colors = generateQualitativeColors(20);
      break;
    case "spatial":
      colors = generateSpatialColors(20);
      break;
    default:
      // If no harmony type matches, generate a monochromatic palette
      for (let i = 0; i < 20; i++) {
        const lightness = 10 + i * 5;
        colors.push(`hsl(${baseHue}, 80%, ${lightness}%)`);
      }
  }
  return colors;
}

function generateQualitativeColors(count) {
  const colors = [];
  const hueStep = 360 / count;
  for (let i = 0; i < count; i++) {
    const hue = i * hueStep;
    colors.push(`hsl(${hue}, 80%, 60%)`);
  }
  return colors;
}

function generateSpatialColors(count) {
    const colors = [];
  for (let i = 0; i < count; i++) {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 80 + 20);
    const lightness = Math.floor(Math.random() * 60 + 20);
    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  }
  return colors;
}
