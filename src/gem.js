import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const canvas = document.querySelector("#gem");
const size = {
    width: 200,
    height: 200
}
const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader();
const gemTexture = textureLoader.load("/gem/roughness.jpeg");

const loader = new GLTFLoader();
loader.load("/gem/gem.gltf", gltf => {
  const h = gltf.scene.children[6];
  // h.material.roughnessMap = gemTexture;
  // h.material.displacementScale = 0.15;
  // h.material.emissiveIntensity = 0.4;
  // h.material.refractionRatio = 1;
  // h.rotation.z = 0;
  scene.add(h);
  const gem = gltf.scene.children[0];
  scene.add(gem);
});

const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

const light1 = new THREE.DirectionalLight(0xffffff, 3);
light1.position.set(1, 1, 1);
scene.add(light1);

const light2 = new THREE.DirectionalLight(0xffffff, 3);
light2.position.set(-1, -1, -1);
scene.add(light2);

const camera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 100);
camera.position.set(2, 2, 6);
scene.add(camera);

let controls = new OrbitControls(camera, canvas);
controls.target.set(0, 0.75, 0);
controls.enableZoom = false;
// 是否启用阻尼
controls.enableDamping = true;
// 是否启用平移
controls.enablePan = false;
// 设为相同值禁止垂直旋转，并保持该值。
controls.minPolarAngle = Math.PI / 2;
controls.maxPolarAngle = Math.PI / 2;
// 自动旋转，控制器实例需要调用 update()
controls.autoRotate = true;
// 自动旋转速度
controls.autoRotateSpeed = 8;
// 是否响应用户操作
controls.enabled = true;
// 是否启用水平或垂直旋转
controls.enableRotate = true;

const renderer = new THREE.WebGLRenderer({
  precision: "highp",
  antialias: true,
  alpha: true,
  canvas
});
renderer.setClearColor("#000000", 0);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const animate = () => {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

animate();

const helper = () => {
  const axesHelper = new THREE.AxesHelper(100);
  scene.add(axesHelper);
};

// helper();
