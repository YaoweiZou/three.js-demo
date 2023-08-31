import { createCamera } from "./components/camera";
import { createScene } from "./components/scene";
import { createRenderer } from "./system/renderer";
import { createCube } from "./components/cube";
import Resizer from "./system/Resizer";
import { createLight } from "./components/light";
import Loop from "./system/Loop";

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
        this.#loop.push(cube);
        this.#scene.add(ambientLight, directionalLight, cube);
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
