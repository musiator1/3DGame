import { action } from "./hero";
import { degreesToRadians } from "./utils";

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;

let targetAngle = 0; // Docelowy kąt
let currentAngle = 0; // Aktualny kąt

function setupKeyboardControls() {
    window.addEventListener('keydown', _onKeyDown, false);
    window.addEventListener('keyup', _onKeyUp, false);
}

function _onKeyDown(event) {
    if (event.key == "w" && !moveForward) {
        moveForward = true;
    }
    if (event.key == "s" && !moveBackward) {
        moveBackward = true;
    }
    if (event.key == "a" && !moveLeft) {
        moveLeft = true;
    }
    if (event.key == "d" && !moveRight) {
        moveRight = true;
    }
}

function _onKeyUp(event) {
    if (event.keyCode == 87) {
        moveForward = false;
    }
    if (event.keyCode == 83) {
        moveBackward = false;
    }
    if (event.keyCode == 65) {
        moveLeft = false;
    }
    if (event.keyCode == 68) {
        moveRight = false;
    }
}

function updateHeroPosition(root, angle) {
    // Adjusting speed for diagonal movement
    let speed = 0.061;
    if ((moveForward || moveBackward) && (moveLeft || moveRight)) {
        speed /= 2;
    }
    if ((moveForward && moveBackward) || (moveLeft && moveRight)) {
        speed /= Math.sqrt(2);
    }

    targetAngle = _calculateAngle();
    if (currentAngle != targetAngle)
        currentAngle = _lerpAngle(currentAngle, targetAngle, 0.1);

    const finalAngle = degreesToRadians(currentAngle) - angle
    root.rotation.y = finalAngle;

    if (moveForward && _canGo()) {
        root.position.z -= speed * Math.cos(finalAngle);
        root.position.x += speed * Math.sin(finalAngle);
    }
    if (moveBackward && _canGo()) {
        root.position.z -= speed * Math.cos(finalAngle);
        root.position.x += speed * Math.sin(finalAngle);
    }
    if (moveLeft && _canGo()) {
        root.position.x -= speed * Math.cos(finalAngle + Math.PI / 2);
        root.position.z -= speed * Math.sin(finalAngle + Math.PI / 2);
    }
    if (moveRight && _canGo()) {
        root.position.x -= speed * Math.cos(finalAngle + Math.PI / 2);
        root.position.z -= speed * Math.sin(finalAngle + Math.PI / 2);
    }

    _canGo();
}

function _calculateAngle() {
    let angle = targetAngle;

    if (moveForward && !moveBackward) {
        if (moveLeft && !moveRight) angle = 315; // W + A
        else if (moveRight && !moveLeft) angle = 45; // W + D
        else angle = 0; // W
    } else if (moveBackward && !moveForward) {
        if (moveLeft && !moveRight) angle = 225; // S + A
        else if (moveRight && !moveLeft) angle = 135; // S + D
        else angle = 180; // S
    } else if (moveLeft && !moveRight) {
        if (moveForward && !moveBackward) angle = 315; // A + W
        else if (moveBackward && !moveForward) angle = 225; // A + S
        else angle = 270; // A
    } else if (moveRight && !moveLeft) {
        if (moveForward && !moveBackward) angle = 45; // D + W
        else if (moveBackward && !moveForward) angle = 135; // D + S
        else angle = 90; // D
    }

    return angle;
}

function _lerpAngle(start, end, t) {
    start = (start + 360) % 360;
    end = (end + 360) % 360;

    let difference = end - start;

    if (difference > 180) {
        difference -= 360;
    } else if (difference < -180) {
        difference += 360;
    }

    return start + difference * t;
}

function _canGo() {
    if (moveLeft == moveRight && moveBackward == false && moveForward == false) {
        action.stop();
        return false;
    } else if (moveBackward == moveForward && moveLeft == false && moveRight == false) {
        action.stop();
        return false;
    } else if (moveBackward && moveForward && moveLeft && moveRight) {
        action.stop();
        return false;
    } else {
        action.play();
        return true;
    }
}

export { setupKeyboardControls, updateHeroPosition };