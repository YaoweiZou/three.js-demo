import { AmbientLight, DirectionalLight } from "three";

function createLight() {
    const ambientLight = new AmbientLight(0xFFFFFF, 2);

    const directionalLight = new DirectionalLight(0xFFFFFF, 8);
    directionalLight.position.set(10, 10, 10);

    return {
        ambientLight,
        directionalLight
    };
}

export { createLight };
