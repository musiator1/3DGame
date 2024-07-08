import * as THREE from "three";

class MouseController {
    #isMouseLocked;
    #rotationSpeed;
    #pitch;
    #yaw;

    constructor (canvas, camera) {
        this.canvas = canvas;
        this.camera = camera;
        this.#isMouseLocked = false;
        this.#rotationSpeed = 0.002;
        this.#pitch = 0;
        this.#yaw = 0;

        // Event listeners
        window.addEventListener("keydown", this.#handleKeydown.bind(this), false);
        canvas.addEventListener("click", this.#handleClick.bind(this));
        document.addEventListener("pointerlockchange", this.#handlePointerLockChange.bind(this), false);
        canvas.addEventListener("mousemove", this.#handleMouseMove.bind(this));
    }

    #handleKeydown (event) {
        if (event.key === "Escape" && this.#isMouseLocked) {
            document.exitPointerLock();
            this.#isMouseLocked = false;
        }
    }

    #handleClick() {
        if (!this.#isMouseLocked) {
            this.canvas.requestPointerLock();
        }
    }

    #handlePointerLockChange() {
        this.#isMouseLocked = document.pointerLockElement === this.canvas;
    }

    #handleMouseMove(event) {
        if (!this.#isMouseLocked) return;

        const deltaX = event.movementX;
        const deltaY = event.movementY;

        this.#yaw -= deltaX * this.#rotationSpeed;
        this.#pitch -= deltaY * this.#rotationSpeed;

        this.#pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.#pitch));

        const yawQuat = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), this.#yaw);
        const pitchQuat = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), this.#pitch);

        this.camera.quaternion.copy(yawQuat).multiply(pitchQuat);
    }
}

export { MouseController };
