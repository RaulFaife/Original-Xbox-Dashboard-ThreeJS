export function handleKeyPress(
  event,
  selectedIndex,
  menuItemsLength,
  changeSelectionCallback
) {
  if (event.key === "ArrowUp" && selectedIndex > 0) {
    return changeSelectionCallback(selectedIndex, selectedIndex - 1);
  } else if (event.key === "ArrowDown" && selectedIndex < menuItemsLength - 1) {
    return changeSelectionCallback(selectedIndex, selectedIndex + 1);
  }
  return selectedIndex;
}

export function handleResize(camera, renderer) {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
