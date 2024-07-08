import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';

import { degreesToRadians } from './utils';

let mixer;
let root;
let action;

function loadModel(scene, onLoadCallback) {
    const gltfLoader = new GLTFLoader();
    gltfLoader.load("src/resources/models/untitled.glb", (gltf) => {
        root = gltf.scene;
        root.scale.set(5, 5, 5);
        root.rotateY(degreesToRadians(180));
        scene.add(root);

        mixer = new THREE.AnimationMixer(root);
        action = mixer.clipAction(gltf.animations[0]);

        if (onLoadCallback) onLoadCallback();
    });
}

export { loadModel, mixer, root, action };