import { BoxGeometry, Mesh, MeshStandardMaterial } from "three";

function createCube() {
    const geometry = new BoxGeometry(2, 2, 2);
    const material = new MeshStandardMaterial({
        color: "gray"
    });
    const cube = new Mesh(geometry, material);
    cube.rotation.set(-0.5, -0.1, 0.8);
    cube.tick = (delta, radiansPerSecons) => {
        cube.rotation.x += delta * radiansPerSecons;
        cube.rotation.y += delta * radiansPerSecons;
        cube.rotation.z += delta * radiansPerSecons;
    };
    return cube;
}

export { createCube };
