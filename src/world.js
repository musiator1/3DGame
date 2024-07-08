import * as THREE from "three";
import * as Rapier from '@dimforge/rapier3d';

// three.js plane 
const planeSize = 70;
const loader = new THREE.TextureLoader();
const planeTexture = loader.load("src/resources/textures/tile.png");
planeTexture.wrapS = THREE.RepeatWrapping;
planeTexture.wrapT = THREE.RepeatWrapping;
planeTexture.magFilter = THREE.NearestFilter;
planeTexture.colorSpace = THREE.SRGBColorSpace;

const repeats = planeSize / 2;
planeTexture.repeat.set(repeats, repeats);

const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
const planeMat = new THREE.MeshStandardMaterial({
    map: planeTexture,
    side: THREE.DoubleSide,
});

const planeMesh = new THREE.Mesh(planeGeo, planeMat);
planeMesh.rotation.x = Math.PI * -0.5;

// init rapier world
const gravity = { x: 0.0, y: -9.81, z: 0.0 };
const world = new Rapier.World(gravity);

const groundDesc = Rapier.RigidBodyDesc.fixed();
const ground = world.createRigidBody(groundDesc);
const groundCollider = Rapier.ColliderDesc.cuboid(planeSize / 2, 0.1, planeSize / 2);
world.createCollider(groundCollider, ground);

export {planeMesh, world};