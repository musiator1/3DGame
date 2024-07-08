import * as THREE from 'three';
import { degreesToRadians } from './utils';
import { MouseController } from './mouse_input';
import { canvas } from "./scene_setup";

const fov = 60;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 100;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.rotateX(degreesToRadians(-10));

const controls = new MouseController(canvas, camera);

const cameraDistance = 15; // Odległość kamery od postaci
const cameraHeight = 10;   // Wysokość kamery nad postacią

function updateCameraPosition(root) {
    const angle = camera.rotation.y;

    camera.position.x = root.position.x + cameraDistance * Math.sin(angle);
    camera.position.z = root.position.z + cameraDistance * Math.cos(angle);
    camera.position.y = root.position.y + cameraHeight;

    camera.rotation.order = 'YXZ';
    camera.rotation.y = angle;

    return angle;
}

export { camera, updateCameraPosition };