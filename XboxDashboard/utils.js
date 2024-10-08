import * as THREE from "three";

const activeColor = "#00ff00";
const inactiveColor = "#004400";
const activeTextColor = "#ffffff";
const inactiveTextColor = "#009900";

export function createMenuItemTexture(text, isActive) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = 256;
  canvas.height = 64;

  // Draw rectangle
  context.fillStyle = isActive ? activeColor : inactiveColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Draw text
  context.fillStyle = isActive ? activeTextColor : inactiveTextColor;
  context.font = "32px Arial";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  return new THREE.CanvasTexture(canvas);
}
