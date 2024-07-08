import * as THREE from 'three';
import * as RAPIER from '@dimforge/rapier3d';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

class StaticGameObject {
    constructor(modelPath, initialPosition, scene, world) {
        this.scene = scene;
        this.world = world;
        this.model = null;

        // Load the 3D model using Three.js
        const loader = new GLTFLoader();
        loader.load(modelPath, (gltf) => {
            this.model = gltf.scene;
            this.model.position.set(initialPosition.x, initialPosition.y, initialPosition.z);
            this.model.scale.set(10, 10, 10);
            this.scene.add(this.model);

            // Create the Rapier rigid body and collider after model is loaded
            this.createPhysics(initialPosition);
        });
    }

    createPhysics(initialPosition) {
        // Create the Rapier rigid body
        const rigidBodyDesc = RAPIER.RigidBodyDesc.fixed();
        this.rigidBody = this.world.createRigidBody(rigidBodyDesc);
        this.rigidBody.setTranslation(initialPosition.x, initialPosition.y, initialPosition.z);

        // Create the Rapier collider
        const bbox = new THREE.Box3().setFromObject(this.model);
        const size = new THREE.Vector3();
        bbox.getSize(size);
        const halfExtents = size.multiplyScalar(0.5);

        const colliderDesc = RAPIER.ColliderDesc.cuboid(
            halfExtents.x,
            halfExtents.y,
            halfExtents.z
        );
        this.collider = this.world.createCollider(colliderDesc, this.rigidBody);
    }

    update() {
        if (this.model) {
            // Get the position from Rapier and update the Three.js model position
            const position = this.rigidBody.translation();
            this.model.position.set(position.x, position.y, position.z);
        }
    }
}

export { StaticGameObject };
