import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function getHash(colors, window){
  // Update URL with base64 encoded colors
  const colorsString = JSON.stringify(colors);
  const encodedColors = btoa(colorsString);
  const newUrl = new URL(window.location);
  newUrl.searchParams.set('colors', encodedColors);
  window.history.pushState({}, '', newUrl);
}
window.onload = function() {
  const urlParams = new URLSearchParams(window.location.search);
  const encodedColors = urlParams.get('colors');
  
  if (encodedColors) {
      try {
          const colorsString = atob(encodedColors);
          const colors = JSON.parse(colorsString);
          if (Array.isArray(colors) && colors.length > 0) {
             // generateColors(colors);
              return;
          }
      } catch (e) {
          console.error('Error loading colors from URL:', e);
      }
  }
 // generateColors(); // Generate new colors if URL params are invalid or missing
};
export function getHarmonyColors(harmonyType, baseHue) {
  let colors = [];
  switch (harmonyType) {
      case 'monochromatic':
          for (let i = 0; i < 20; i++) {
              let lightness = 10 + i * 5;
              colors.push(`hsl(${baseHue}, 80%, ${lightness}%)`);
          }
          break;
      case 'analogous':
          const hues = [baseHue, (baseHue + 30) % 360, (baseHue - 30 + 360) % 360];
          const colorsPerHue = Math.floor(20 / hues.length);
          hues.forEach(hue => {
              for (let i = 0; i < colorsPerHue; i++) {
                  let lightness = 20 + i * 10;
                  colors.push(`hsl(${hue}, 80%, ${lightness}%)`);
              }
          });
          while (colors.length < 20) {
              let hue = hues[Math.floor(Math.random() * hues.length)];
              let lightness = 20 + Math.floor(Math.random() * 80);
              colors.push(`hsl(${hue}, 80%, ${lightness}%)`);
          }
          break;
      case 'complementary':
          const complement = (baseHue + 180) % 360;
          for (let i = 0; i < 10; i++) {
              let lightness = 20 + i * 8;
              colors.push(`hsl(${baseHue}, 80%, ${lightness}%)`);
              colors.push(`hsl(${complement}, 80%, ${lightness}%)`);
          }
          break;
      case 'split-complementary':
          const complement1 = (baseHue + 180 - 30 + 360) % 360;
          const complement2 = (baseHue + 180 + 30) % 360;
          const splitHues = [baseHue, complement1, complement2];
          const splitColorsPerHue = Math.floor(20 / splitHues.length);
          splitHues.forEach(hue => {
              for (let i = 0; i < splitColorsPerHue; i++) {
                  let lightness = 20 + i * 10;
                  colors.push(`hsl(${hue}, 80%, ${lightness}%)`);
              }
          });
          while (colors.length < 20) {
              let hue = splitHues[Math.floor(Math.random() * splitHues.length)];
              let lightness = 20 + Math.floor(Math.random() * 80);
              colors.push(`hsl(${hue}, 80%, ${lightness}%)`);
          }
          break;
      case 'triadic':
          const triadicHues = [baseHue, (baseHue + 120) % 360, (baseHue + 240) % 360];
          const triadicColorsPerHue = Math.floor(20 / triadicHues.length);
          triadicHues.forEach(hue => {
              for (let i = 0; i < triadicColorsPerHue; i++) {
                  let lightness = 20 + i * 10;
                  colors.push(`hsl(${hue}, 80%, ${lightness}%)`);
              }
          });
          while (colors.length < 20) {
              let hue = triadicHues[Math.floor(Math.random() * triadicHues.length)];
              let lightness = 20 + Math.floor(Math.random() * 80);
              colors.push(`hsl(${hue}, 80%, ${lightness}%)`);
          }
          break;
      case 'tetradic-3':
          const tetradicHues = [baseHue, (baseHue + 90) % 360, (baseHue + 180) % 360, (baseHue + 270) % 360];
          const tetradicColorsPerHue = Math.floor(20 / tetradicHues.length);
          tetradicHues.forEach(hue => {
              for (let i = 0; i < tetradicColorsPerHue; i++) {
                  let lightness = 20 + i * 10;
                  colors.push(`hsl(${hue}, 80%, ${lightness}%)`);
              }
          });
          while (colors.length < 20) {
              let hue = tetradicHues[Math.floor(Math.random() * tetradicHues.length)];
              let lightness = 20 + Math.floor(Math.random() * 80);
              colors.push(`hsl(${hue}, 80%, ${lightness}%)`);
          }
          break;
      case 'square':
          const squareHues = [baseHue, (baseHue + 90) % 360, (baseHue + 180) % 360, (baseHue + 270) % 360];
          const squareColorsPerHue = Math.floor(20 / squareHues.length);
          squareHues.forEach(hue => {
              for (let i = 0; i < squareColorsPerHue; i++) {
                  let lightness = 20 + i * 10;
                  colors.push(`hsl(${hue}, 80%, ${lightness}%)`);
              }
          });
          while (colors.length < 20) {
              let hue = squareHues[Math.floor(Math.random() * squareHues.length)];
              let lightness = 20 + Math.floor(Math.random() * 80);
              colors.push(`hsl(${hue}, 80%, ${lightness}%)`);
          }
          break;
      case 'sequential':
          colors = generateSequentialColors(baseHue, 20, 80, 20);
          break;
      case 'diverging':
          colors = generateDivergingColors(baseHue, (baseHue + 180) % 360, 50, 20);
          break;
      case 'qualitative':
          colors = generateQualitativeColors(20);
          break;
      case 'spatial':
          colors = generateSpatialColors(20);
          break;
      case 'grid':
          colors = generateGridColors(4, 5);
          break;
      default:
          colors = generateQualitativeColors(20);
          break;
  }
  return colors;
}

function generateSequentialColors(baseHue, startLightness, endLightness, count) {
  let colors = [];
  let lightnessStep = (endLightness - startLightness) / (count - 1);
  for (let i = 0; i < count; i++) {
      let l = startLightness + lightnessStep * i;
      colors.push(`hsl(${baseHue}, 80%, ${l}%)`);
  }
  return colors;
}

function generateDivergingColors(hue1, hue2, midpointLightness, count) {
  let half = Math.floor(count / 2);
  let colors1 = generateSequentialColors(hue1, midpointLightness, 100, half);
  let colors2 = generateSequentialColors(hue2, midpointLightness, 0, count - half);
  return colors1.concat(colors2);
}

function generateQualitativeColors(count) {
  let colors = [];
  let hueStep = 360 / count;
  for (let i = 0; i < count; i++) {
      let hue = i * hueStep;
      colors.push(`hsl(${hue}, 80%, 60%)`);
  }
  return colors;
}

function generateSpatialColors(count) {
  let colors = [];
  for (let i = 0; i < count; i++) {
      let hue = Math.floor(Math.random() * 360);
      let saturation = Math.floor(Math.random() * 80 + 20);
      let lightness = Math.floor(Math.random() * 60 + 20);
      colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  }
  return colors;
}

function generateGridColors(rows, cols) {
  let colors = [];
  let hueStep = 360 / rows;
  let saturationStep = 100 / cols;
  for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
          let hue = row * hueStep;
          let saturation = col * saturationStep;
          colors.push(`hsl(${hue}, ${saturation}%, 50%)`);
      }
  }
  return colors;
}
