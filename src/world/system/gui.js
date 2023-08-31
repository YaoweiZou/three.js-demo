import Stats from "three/examples/jsm/libs/stats.module.js";
import { GUI } from "dat.gui";

function createGUI() {
    const gui = new GUI({width: 260});

    const stats = new Stats();
    stats.domElement.style.position = "static";
    [].forEach.call(stats.dom.children, child => child.style.display = "");

    // Performance GUI
    const perfGui = gui.addFolder("Performance");
    const perfLi = document.createElement("li");
    perfLi.classList.add("gui-stats");
    perfLi.appendChild(stats.domElement);
    perfGui.__ul.appendChild(perfLi);
    perfGui.open();

    gui.tick = (delta, radiansPerSecons) => {
        stats.update();
    };

    return gui;
}

export { createGUI };
