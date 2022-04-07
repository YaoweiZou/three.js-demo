import {useEffect} from "react";
import { Main, GlobalStyle } from "./styled";
import * as THREE from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

const Gem = () => {
    useEffect(() => {
        const scene = new THREE.Scene();

        // 摄像机
        const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
        camera.position.set(0, 0, 8);

        // 渲染器
        const renderer = new THREE.WebGLRenderer({ precision: "highp", antialias: true });
        renderer.setSize(600, 600, false);
        renderer.setClearColor("#000000", 0);
        document.getElementsByClassName("gem")[0].appendChild(renderer.domElement);

        // 控制器
        // https://threejs.org/docs/index.html#examples/zh/controls/OrbitControls
        let controls = new OrbitControls(camera, renderer.domElement);
        // 自动旋转，控制器实例需要调用 update()
        controls.autoRotate = true;
        // 自动旋转速度
        controls.autoRotateSpeed = 6;
        // 是否响应用户操作
        controls.enabled = true;
        // 是否启用阻尼
        controls.enableDamping = true;
        // 是否启用平移
        controls.enablePan = false;
        // 是否启用缩放
        controls.enableZoom = false;
        // 是否启用水平或垂直旋转
        controls.enableRotate = true;
        // 设为相同值禁止垂直旋转，并保持该值。
        controls.maxPolarAngle = Math.PI / 2;
        controls.minPolarAngle = Math.PI / 2;

        const module = () => {
            // 加载 flTF 模型，模型文件位置必须在 public 目录。
            const loader = new GLTFLoader();
            loader.load(
                process.env.PUBLIC_URL + "/static/gem.gltf",
                (gltf) => {
                    gltf.scene.position.set(0, 0, 0);
                    scene.add(gltf.scene);
                }, (request) => {

                }, (error) => {

                }
            );
        }

        // 灯光
        const light = () => {
            // 设置环境光颜色和光照强度
            const ambientLight = new THREE.AmbientLight(0xffffff, 1);
            scene.add(ambientLight);

            // 设置聚光灯颜色和光照强度，以及聚光灯位置。
            const spotLightTop = new THREE.SpotLight(0x00D959, 2);
            spotLightTop.position.set(0, 100, 0);
            scene.add(spotLightTop);

            const spotLightBottom = new THREE.SpotLight(0x00D959, 2);
            spotLightBottom.position.set(0, -100, 0);
            scene.add(spotLightBottom);

            const spotLightLeft = new THREE.SpotLight(0x00D959, 1.5);
            spotLightLeft.position.set(-100, 0, 0);
            scene.add(spotLightLeft);

            const spotLightRight = new THREE.SpotLight(0x00D959, 1.5);
            spotLightRight.position.set(100, 0, 0);
            scene.add(spotLightRight);

            const spotLightFront = new THREE.SpotLight(0x00D959, 1.5);
            spotLightFront.position.set(0, 0, 100);
            scene.add(spotLightFront);

            const spotLightBack = new THREE.SpotLight(0x00D959, 1.5);
            spotLightBack.position.set(0, 0, -100);
            scene.add(spotLightBack);
        }

        const helper = () => {
            // 三维坐标轴辅助，构造器参数为坐标轴长度
            const axesHelper = new THREE.AxesHelper(20);
            scene.add(axesHelper);
        }

        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
            controls.update();
        }

        module();
        light();
        // helper();
        animate();
    }, [])

    return (
        <Main id="main" role="main" aria-label="网页主体">
            <GlobalStyle/>
            <section className="section-primary">
                <div className="gem"></div>
            </section>
        </Main>
    )
}

export default Gem;
