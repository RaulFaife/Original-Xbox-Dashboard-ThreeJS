import * as THREE from "three";
import backgroundImage from "./public/background.jpg";

let holographicMaterials;

export function initScene() {
  const scene = new THREE.Scene();

  // Load background texture
  const loader = new THREE.TextureLoader();
  loader.load(backgroundImage, function (texture) {
    // Create a large plane to hold the background
    const planeGeometry = new THREE.PlaneGeometry(32, 18);
    const planeMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
      transparent: true,
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);

    // Position the plane behind all other objects
    plane.position.z = -5;
    scene.add(plane);
  });

  // Set up camera with 16:9 aspect ratio
  const aspectRatio = 1280 / 720;
  const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);

  // Calculate renderer size while maintaining aspect ratio
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  updateRendererSize(renderer, aspectRatio);
  renderer.setClearColor(0x000000, 0); // Set clear color to transparent
  document.body.appendChild(renderer.domElement);

  // Adjust camera position to view the entire scene
  camera.position.set(0, 0, 5);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  return { scene, camera, renderer };
}

export function animate(renderer, scene, camera) {
  function tick() {
    holographicMaterials.forEach((material) => {
      if (material && material.update) {
        material.update();
      }
    });
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }

  tick();
}

// Function to update renderer size
function updateRendererSize(renderer, aspectRatio) {
  const width = Math.min(window.innerWidth, window.innerHeight * aspectRatio);
  const height = width / aspectRatio;
  renderer.setSize(width, height);
}

// Updated resize handler
export function handleResize(camera, renderer) {
  const aspectRatio = 1280 / 720;
  updateRendererSize(renderer, aspectRatio);
  camera.aspect = aspectRatio;
  camera.updateProjectionMatrix();
}

// New function to set the holographic material
export function setHolographicMaterial(material) {
  holographicMaterials = material;
}
