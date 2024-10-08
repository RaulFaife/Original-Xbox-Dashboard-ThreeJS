import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export function initScene() {
  const scene = new THREE.Scene();

  //Load background texture
  const textureImage = require("./public/background.png");
  const loader = new THREE.TextureLoader().load(textureImage);
  loader.load(textureImage, function (texture) {
    scene.background = texture;
  });

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Adjust camera position to view the entire scene
  camera.position.set(0, 0, 5);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  const controls = new OrbitControls(camera, renderer.domElement);

  return { scene, camera, renderer, controls };
}

export function animate(renderer, scene, camera, controls) {
  requestAnimationFrame(() => animate(renderer, scene, camera, controls));
  controls.update();
  renderer.render(scene, camera);
}
