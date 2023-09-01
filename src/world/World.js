import { createCamera } from "./components/camera";
import { createScene } from "./components/scene";
import { createRenderer } from "./system/renderer";
import { createCube } from "./components/cube";
import Resizer from "./system/Resizer";
import { createLight } from "./components/light";
import Loop from "./system/Loop";
import { createGUI } from "./system/gui";
import {createControls} from "./system/controls";
import {createHelper} from "./components/helper";

class World {
    #scene;
    #camera;
    #renderer;
    #loop;

    constructor(container) {
        this.#scene = createScene();
        this.#camera = createCamera();
        this.#renderer = createRenderer();
        container.appendChild(this.#renderer.domElement);
        this.#loop = new Loop(this.#renderer, this.#scene, this.#camera);

        new Resizer(container, this.#camera, this.#renderer)
//        const resizer = new Resizer(container, this.#camera, this.#renderer);
//        resizer.onResize = () => this.render();

        const { ambientLight, directionalLight } = createLight();
        const cube = createCube();
        const { axesHelper, gridHelper } = createHelper();
        
        this.#scene.add(ambientLight, directionalLight, cube, axesHelper, gridHelper);

        const controls = createControls(this.#camera, this.#renderer.domElement);

        const gui = createGUI();
        // Display GUI
        const displayGui = gui.addFolder("Display");
        displayGui
            .addColor({ color: 0x0 }, "color")
            .onChange(color => this.#renderer.setClearColor(color))
            .name("背景颜色");
        displayGui.open();
        // Light GUI
        const lightGui = gui.addFolder("Light");
        lightGui.add(ambientLight, "intensity", 0, 10).step(1).name("环境光亮度");
        lightGui.open();

        this.#loop.push(cube, controls, gui);
    }

    render() {
        this.#renderer.render(this.#scene, this.#camera);
    }

    start() {
        this.#loop.start();
    }

    stop() {
        this.#loop.stop();
    }
}

export { World };
