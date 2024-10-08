import * as THREE from "three";
import { createMenuItemTexture } from "./utils.js";
import HolographicMaterial from "./HolographicMaterialVanilla.js";

const menuItems = ["MEMORY", "MUSIC", "XBOX LIVE", "SETTINGS"];
const rectangleWidth = 2.5;
const rectangleHeight = 0.3;
const activeColor = "#00CC00";
const inactiveColor = "#004400";

export function createMenuItems(scene) {
  const menuSpheres = [];
  const menuLabels = [];
  const holographicMaterials = [];

  // Create main sphere
  const mainSphereRadius = 1.8;
  const mainSphereGeometry = new THREE.SphereGeometry(mainSphereRadius, 32, 32);
  const mainHolographicMaterial = new HolographicMaterial({
    hologramColor: "#009900",
  });
  const mainSphere = new THREE.Mesh(
    mainSphereGeometry,
    mainHolographicMaterial
  );
  mainSphere.position.set(-1, 0.5, 0); // Moved slightly to the left
  scene.add(mainSphere);
  holographicMaterials.push(mainHolographicMaterial);

  const menuItemRadius = 0.2;
  const menuItemDistance = mainSphereRadius + menuItemRadius + 0.3;
  const totalAngle = Math.PI * 0.4; // Reduced angle for tighter wrapping
  const startAngle = Math.PI * -0.1; // Start from upper right

  menuItems.forEach((item, index) => {
    const isActive = index === 0;

    // Calculate angle for this menu item
    const angle = startAngle + (index / (menuItems.length - 1)) * totalAngle;

    // Calculate position using spherical coordinates
    const x = Math.cos(angle) * menuItemDistance;
    const y = Math.sin(angle) * menuItemDistance;

    // Outer sphere
    const geometry = new THREE.SphereGeometry(menuItemRadius, 32, 32);

    const menuItemMaterial = new HolographicMaterial({
      hologramColor: activeColor,
    });
    const sphere = new THREE.Mesh(geometry, menuItemMaterial);
    holographicMaterials.push(menuItemMaterial);

    sphere.position.set(
      mainSphere.position.x + x,
      mainSphere.position.y - y,
      0
    );

    scene.add(sphere);
    menuSpheres.push(sphere);

    // Inner sphere (selection indicator)
    const innerGeometry = new THREE.SphereGeometry(
      menuItemRadius * 0.75,
      32,
      32
    );
    const innerMaterial = new THREE.MeshPhongMaterial({
      color: isActive ? activeColor : inactiveColor,
      opacity: 0.8,
    });
    const innerSphere = new THREE.Mesh(innerGeometry, innerMaterial);
    innerSphere.visible = true;
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

    // Position labels to the right of menu item spheres
    const labelDistance = menuItemRadius + rectangleWidth / 2 + 0.1;
    label.position.set(sphere.position.x + labelDistance, sphere.position.y, 0);

    scene.add(label);
    menuLabels.push(label);
  });

  return { menuItems, menuSpheres, menuLabels, holographicMaterials };
}

export function changeSelection(
  currentIndex,
  newIndex,
  menuSpheres,
  menuLabels
) {
  // Deactivate current selection
  menuSpheres[currentIndex].material.updateUniforms({
    hologramColor: activeColor,
  });
  menuSpheres[currentIndex].children[0].material.color.setStyle(inactiveColor);
  menuSpheres[currentIndex].children[0].visible = true;
  menuLabels[currentIndex].material.map = createMenuItemTexture(
    menuItems[currentIndex],
    false
  );
  menuLabels[currentIndex].material.opacity = 0.8;
  menuLabels[currentIndex].material.needsUpdate = true;

  // Activate new selection
  menuSpheres[newIndex].material.updateUniforms({
    hologramColor: activeColor,
  });
  menuSpheres[newIndex].children[0].material.color.setStyle(activeColor);
  menuSpheres[newIndex].children[0].visible = true;
  menuLabels[newIndex].material.map = createMenuItemTexture(
    menuItems[newIndex],
    true
  );
  menuLabels[newIndex].material.opacity = 1;
  menuLabels[newIndex].material.needsUpdate = true;

  return newIndex;
}
