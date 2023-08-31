import { WebGLRenderer } from "three";

function createRenderer() {
    const webGLRenderer = new WebGLRenderer({
        antialias: true,
//        alpha: true,
        powerPreference: "high-performance"
    });
    webGLRenderer.setPixelRatio(window.devicePixelRatio);
    return webGLRenderer;
}

export { createRenderer };
