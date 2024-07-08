function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}

function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

export { resizeRendererToDisplaySize, degreesToRadians };