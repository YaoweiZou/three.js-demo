import { Clock, MathUtils } from "three";

class Loop {
    #renderer;
    #scene;
    #camera;
    #updatables = [];
    #clock = new Clock();

    radiansPerSecons = MathUtils.degToRad(30);

    constructor(renderer, scene, camera) {
        this.#renderer = renderer;
        this.#scene = scene;
        this.#camera = camera;
    }

    push(...items) {
        items.forEach(item => this.#updatables.push(item));
    }

    #nextTick = () => {
        const delta = this.#clock.getDelta();
        this.#updatables.map(item => item.tick(delta, this.radiansPerSecons));
    };

    start() {
        this.#renderer.setAnimationLoop(() => {
            this.#renderer.render(this.#scene, this.#camera);
            this.#nextTick();
        });
    }

    stop() {
        this.#renderer.setAnimationLoop(null);
    }
}

export default Loop;
