import { World } from "./World";

function main() {
    const containerElement = document.querySelector(".container");

    const world = new World(containerElement);
    world.start();
}

main();
