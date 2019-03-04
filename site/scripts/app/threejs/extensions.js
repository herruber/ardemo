
var logger = document.getElementById("logger")

console.log = function (obj) {
    var element = document.createElement("div");
    var txt = document.createTextNode(JSON.stringify(obj, null, 2));

    element.appendChild(txt);
    logger.appendChild(element);
}


THREE.Object3D.prototype.setQuaternionFromDevice = function (quaternion, alpha, beta, gamma, orient) {

    var zee = new THREE.Vector3(0, 0, 1);

    var euler = new THREE.Euler();

    var q0 = new THREE.Quaternion();

    var q1 = new THREE.Quaternion(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5)); // - PI/2 around the x-axis

    beta = THREE.Math.degToRad(beta);
    alpha = THREE.Math.degToRad(alpha);
    gamma = THREE.Math.degToRad(gamma);

    euler.set(beta, alpha, -gamma, 'YXZ'); // 'ZXY' for the device, but 'YXZ' for us

    quaternion.setFromEuler(euler); // orient the device

    quaternion.multiply(q1).normalize(); // camera looks out the back of the device, not the top

}


THREE.Object3D.prototype.directions = {
    forward: new THREE.Vector3(),
    up: new THREE.Vector3(),
    right: new THREE.Vector3()
}

THREE.Object3D.prototype.getDirections = function () {

    var up = this.up;
    var forward = new THREE.Vector3(0, 0, -1).applyQuaternion(this.quaternion).normalize();
    var right = new THREE.Vector3().cross(forward.normalize(), up.normalize());

    this.directions.forward.set(forward.x, forward.y, forward.z);
    this.directions.up.set(up.x, up.y, up.z);
    this.directions.right.set(right.x, right.y, right.z);
    return this.directions;

}

THREE.Scene.prototype.create = function (obj) { //Like add but also sets the object as your manipulated target
    controls.userTarget.set(obj)
    this.add(obj);

}


THREE.Camera.prototype.getSizeAtDepth = function (dist) {
    camera = arRenderer.camera;
    var vFOV = THREE.Math.degToRad(camera.fov); // convert vertical fov to radians

    var height = 2 * Math.tan(vFOV / 2) * dist; // visible height

    var width = height * camera.aspect;           // visible width

    return new THREE.Vector2(width, height)
}
