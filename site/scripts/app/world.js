
var world = (function(){

    var scene = new THREE.Scene();

    function createBox(size, position, rotation) {

        size = size || new THREE.Vector3(1, 1, 1)
        var box = new THREE.Mesh(new THREE.BoxGeometry(size.x, size.y, size.z), new THREE.MeshBasicMaterial());

        scene.create(box);
        return box;

    }

    function initialize(){

        
    }

    return {
        initialize: initialize,
        createBox: createBox,
        scene: scene
    }

}())