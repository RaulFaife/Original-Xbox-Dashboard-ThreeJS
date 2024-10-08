import { initScene, animate } from "./sceneSetup.js";
import { createMenuItems, changeSelection } from "./menuItems.js";
import { handleKeyPress, handleResize } from "./eventHandlers.js";

const { scene, camera, renderer, controls } = initScene();
const { menuItems, menuSpheres, menuLabels } = createMenuItems(scene);

let selectedIndex = 0;

document.addEventListener("keydown", (event) => {
  selectedIndex = handleKeyPress(
    event,
    selectedIndex,
    menuItems.length,
    (currentIndex, newIndex) => {
      return changeSelection(currentIndex, newIndex, menuSpheres, menuLabels);
    }
  );
});

window.addEventListener("resize", () => handleResize(camera, renderer));

animate(renderer, scene, camera, controls);
