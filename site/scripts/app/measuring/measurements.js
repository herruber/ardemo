var measurements = (function () {


    var rulers = {
        axes: {
            up: new THREE.LineSegments(new THREE.Geometry()),
            down: new THREE.LineSegments(new THREE.Geometry()),
            left: new THREE.LineSegments(new THREE.Geometry()),
            right: new THREE.LineSegments(new THREE.Geometry())
        },
        updateRulers: function(obj) {

        
    var s = arRenderer.camera.getSizeAtDepth(obj.position.distanceTo(arRenderer.camera.position));

            this.axes.up.scale.set(1, s.y, 1);
            this.axes.down.scale.set(1, s.y, 1);
            this.axes.right.scale.set(s.x, 1, 1);
            this.axes.left.scale.set(s.x, 1, 1);

        },
        createRulers: function () {



            this.axes.up.geometry.vertices = [
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(0, 1, 0)
            ];

            this.axes.down.geometry.vertices = [
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0, -1, 0)
            ];

            this.axes.left.geometry.vertices = [
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(-1, 0, 0)
            ];

            this.axes.right.geometry.vertices = [
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(1, 0, 0)
            ];

            for (var ax in this.axes) {
                this.axes[ax].geometry.verticesNeedUpdate = true;
                arRenderer.scene.add(this.axes[ax]);
            }

        }
    }

    return {
         rulers: rulers
    }

}())