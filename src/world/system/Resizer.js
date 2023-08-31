class Resizer {
    #setSize = (camera, renderer, width, height) => {
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }
    
    constructor(container, camera, renderer) {
        this.#setSize(camera, renderer, container.clientWidth, container.clientHeight);
        window.onresize = () => {
            this.#setSize(camera, renderer, container.clientWidth, container.clientHeight);
//            this.onResize();
        };
    }
    
    // hooks
    onResize() { }
}

export default Resizer;
