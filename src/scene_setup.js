import * as THREE from "three";

//scene
const scene = new THREE.Scene();

//renderer
const canvas = document.querySelector("#c");
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

//light
const color = 0xFFFFFF;
const intensity = 5;
const light1 = new THREE.DirectionalLight(color, intensity);
light1.position.set(5, 10, 2);

const light2 = new THREE.DirectionalLight(color, intensity);
light2.position.set(-5, 10, -2);

scene.add(light1);
scene.add(light2);

export {scene, renderer, canvas};
