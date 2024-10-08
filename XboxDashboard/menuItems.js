import * as THREE from "three";
import { createMenuItemTexture } from "./utils.js";

const menuItems = ["MEMORY", "MUSIC", "XBOX LIVE", "SETTINGS"];
const rectangleWidth = 1.2;
const rectangleHeight = 0.3;
const activeColor = "#00ff00";
const inactiveColor = "#004400";

export function createMenuItems(scene) {
  const menuSpheres = [];
  const menuLabels = [];

  menuItems.forEach((item, index) => {
    const isActive = index === 0;

    // Outer sphere
    const geometry = new THREE.SphereGeometry(0.2, 32, 32);
    const material = new THREE.MeshPhongMaterial({
      color: isActive ? activeColor : inactiveColor,
      transparent: true,
      opacity: isActive ? 0.8 : 0.5,
    });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(0, -index * 0.5, 0);
    scene.add(sphere);
    menuSpheres.push(sphere);

    // Inner sphere (selection indicator)
    const innerGeometry = new THREE.SphereGeometry(0.1, 32, 32);
    const innerMaterial = new THREE.MeshPhongMaterial({
      color: activeColor,
      transparent: true,
      opacity: 0.8,
    });
    const innerSphere = new THREE.Mesh(innerGeometry, innerMaterial);
    innerSphere.visible = isActive;
    sphere.add(innerSphere);

    // Text label with rectangle background
    const texture = createMenuItemTexture(item, isActive);
    const labelMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: isActive ? 1 : 0.8,
    });
    const labelGeometry = new THREE.PlaneGeometry(
      rectangleWidth,
      rectangleHeight
    );
    const label = new THREE.Mesh(labelGeometry, labelMaterial);
    label.position.set(0.8, -index * 0.5, 0);
    scene.add(label);
    menuLabels.push(label);
  });

  return { menuItems, menuSpheres, menuLabels };
}
export function changeSelection(
  currentIndex,
  newIndex,
  menuSpheres,
  menuLabels
) {
  // Deactivate current selection
  menuSpheres[currentIndex].material.color.setStyle(inactiveColor);
  menuSpheres[currentIndex].material.opacity = 0.5;
  menuSpheres[currentIndex].children[0].visible = false;
  menuLabels[currentIndex].material.map = createMenuItemTexture(
    menuItems[currentIndex],
    false
  );
  menuLabels[currentIndex].material.opacity = 0.8;
  menuLabels[currentIndex].material.needsUpdate = true;

  // Activate new selection
  menuSpheres[newIndex].material.color.setStyle(activeColor);
  menuSpheres[newIndex].material.opacity = 0.8;
  menuSpheres[newIndex].children[0].visible = true;
  menuLabels[newIndex].material.map = createMenuItemTexture(
    menuItems[newIndex],
    true
  );
  menuLabels[newIndex].material.opacity = 1;
  menuLabels[newIndex].material.needsUpdate = true;

  return newIndex;
}
