import { PerspectiveCamera } from "three";

function createCamera() {
    const camera = new PerspectiveCamera(45, 1, 1, 500);
    camera.position.set(5, 5, 10);
    return camera;
}

export { createCamera };
