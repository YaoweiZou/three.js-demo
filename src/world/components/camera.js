import { PerspectiveCamera } from "three";

function createCamera() {
    const camera = new PerspectiveCamera(45, 1, 1, 500);
    camera.position.set(0, 0, 10);
    return camera;
}

export { createCamera };
