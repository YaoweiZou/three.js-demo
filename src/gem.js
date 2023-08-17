import { GUI } from "dat.gui";
import {
  AmbientLight,
  AxesHelper,
  DirectionalLight,
  PCFSoftShadowMap,
  PerspectiveCamera,
  Scene,
  TextureLoader,
  WebGLRenderer
} from "three";
import WebGL from "three/examples/jsm/capabilities/WebGL";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function main() {
  render();
}

const size = {
  width: innerWidth,
  height: innerHeight
}

const scene = new Scene();

const loader = new GLTFLoader();
loader.load("/gem/gem.gltf", gltf => {
  // gltf.scene.children.forEach(item => {
  //   console.log(item);
  // })
  const gem = gltf.scene.children[0];
  gem.material.roughnessMap = new TextureLoader().load("/gem/roughness.jpeg");
  gem.material.displacementScale = 0.15;
  gem.material.emissiveIntensity = 0.4;
  gem.material.refractionRatio = 1;
  scene.add(gem);
});

const ambientLight = new AmbientLight(0xffffff, 2);
scene.add(ambientLight);

const light1 = new DirectionalLight(0xffffff, 3);
light1.position.set(1, 1, 1);
scene.add(light1);

const light2 = new DirectionalLight(0xffffff, 3);
light2.position.set(-1, -1, -1);
scene.add(light2);

const camera = new PerspectiveCamera(75, size.width / size.height, 0.1, 100);
camera.position.set(2, 2, 6);
scene.add(camera);

const renderer = new WebGLRenderer({
  precision: "highp",
  antialias: true,
  alpha: true
});
renderer.setClearColor("#000000", 0);
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

let controls = new OrbitControls(camera, renderer.domElement);
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
controls.autoRotateSpeed = 7;
// 是否响应用户操作
controls.enabled = true;
// 是否启用水平或垂直旋转
controls.enableRotate = true;

window.onresize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

let stats = null;

function showGUI() {
  if (stats === null) {
    stats = new Stats();
    stats.domElement.style.position = "static";
    [].forEach.call(stats.dom.children, child => (child.style.display = ''));
  }
  const gui = new GUI({ width: 260 });

  // Display GUI
  const displayGui = gui.addFolder("Display");
  displayGui.add(controls, "autoRotate").name("自动旋转");

  // Light GUI
  const lightGui = gui.addFolder("Light");
  lightGui.add(ambientLight, "intensity", 0, 10).step(0.1).name("环境光强度");

  // Performance GUI
  const perfGui = gui.addFolder("Performance");
  const perfLi = document.createElement("li");
  perfLi.classList.add("gui-stats");
  perfLi.appendChild(stats.domElement);
  // TODO remove event listener
  // perfLi.firstChild.removeEventListener("click", )
  perfGui.__ul.appendChild(perfLi);
  perfGui.open();
}
showGUI();

function render() {
  if (stats !== null) {
    stats.update();
  }
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};

function helper() {
  const axesHelper = new AxesHelper(100);
  scene.add(axesHelper);
};
helper();

// WebGL 是否可用
if (WebGL.isWebGLAvailable()) {
  main();
} else {
  const errorMessage = WebGL.getWebGLErrorMessage();
  document.body.appendChild(errorMessage);
}
