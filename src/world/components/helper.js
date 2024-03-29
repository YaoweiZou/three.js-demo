import { AxesHelper, GridHelper } from "three";

function createHelper() {
    const axesHelper = new AxesHelper(5);
    const gridHelper = new GridHelper();

    return {
        axesHelper,
        gridHelper
    };
}

export { createHelper };
