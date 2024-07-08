import * as THREE from "three";
import {scene, renderer} from "./scene_setup";
import {planeMesh, world} from "./world";
import {loadModel, mixer, root} from "./hero";
import {camera, updateCameraPosition,} from "./camera";
import {resizeRendererToDisplaySize} from "./utils";
import {setupKeyboardControls, updateHeroPosition} from './keyboard_input.js';
import {StaticGameObject} from "./static_game_object.js";
import {DynamicGameObject} from "./dynamic_game_object";

scene.add(planeMesh);

const tree1 = new StaticGameObject(
    "src/resources/models/Low_Poly_Tree_Blender.glb",
    new THREE.Vector3(5, 0, 5),
    scene, 
    world
);

let hero1;

const clock = new THREE.Clock();

function render(time) {
    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    const delta = clock.getDelta();
    if (mixer) {
        mixer.update(delta);
    }

    world.step();

    const cameraAngle = updateCameraPosition(root);
    updateHeroPosition(root, cameraAngle);

    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

setupKeyboardControls();

loadModel(scene, () => {
    // Initialize the hero object after the model is loaded
    hero1 = new DynamicGameObject(
        "src/resources/models/untitled.glb",
        new THREE.Vector3(0, 0, 0),
        scene,
        world,
        () => {
            // Start rendering once the hero model is fully loaded
            requestAnimationFrame(render);
        }
    );
});