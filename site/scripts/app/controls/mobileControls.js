var localForward = new THREE.Vector3(0, 0, -1);

function mobileControls(element, camera) {
    
    this.element = element;
    this.userTarget = {
        value: new THREE.Object3D(),
        set: function (obj) {

            if (obj === self.userTarget.value) return;

            measurements.rulers.updateRulers(obj);

            self.userTarget.value = obj;
        },
        get: function () {
            return self.userTarget.value;
        }
    };
    this.actionSpeed = 0.0025;
    this.camera = camera;
    this.start = new THREE.Vector2();
    this.end = new THREE.Vector2();
    this.dir = new THREE.Vector2();
    this.speed = new THREE.Vector2();
    this.rotationDampening = 100;
    var self = this;

    this.onStart = function(e){
        self.start.set(e.x, e.y);
        e.preventDefault();
    }

    this.updateCamera = function () {
       
       var dirs = self.camera.getDirections();

        var stroke = self.dir.clone().multiply(self.speed).divideScalar(self.rotationDampening);
       
        self.camera.rotation.y -= stroke.x / (self.rotationDampening);
        self.camera.rotation.x -= stroke.y / (self.rotationDampening);
        self.camera.updateMatrixWorld();
        self.camera.updateMatrix();
        //self.camera.quaternion.multiply(new THREE.Quaternion(stroke.y, stroke.x, 0, 1))
    }

    this.onMove = function (e) {

        e.preventDefault();
        self.dir.set(e.movementX, e.movementY).normalize();
        self.speed.set(Math.abs(e.movementX), Math.abs(e.movementY));

        self.updateCamera();
    }

    this.onEnd = function (e) {
        self.end.set(e.x, e.y);
    }

    this.lookSpeech = function (e) {

    }

    this.gyroscope = function (event) {
        var absolute = event.absolute;
        var alpha = event.alpha;
        var beta = event.beta;
        var gamma = event.gamma;
        var sensitivity = 0.1

        self.camera.setQuaternionFromDevice(self.camera.quaternion, event.alpha, event.beta, event.gamma, event.absolute)
    }

    this.addEvents = function () {

        if (settings.useSpeech) {
            
            speech.addAction(new speechAction("y", "y-i", "y-i", function () {
                self.userTarget.value.translateY(self.actionSpeed);

            }));

            speech.addAction(new speechAction("x", "x-ex-EX", "x", function () {
                self.userTarget.value.translateX(self.actionSpeed);

            }));

            //Secondary
            speech.addAction(new speechAction("createBox", "gör kub", "make cube", function () {

                world.createBox();
            }, 1));

            speech.addAction(new speechAction("increase", "öka-eka", "increase", function () {

                self.actionSpeed += 0.0025;
            }, 1));

            speech.addAction(new speechAction("decrease", "minska", "decrease", function () {

                self.actionSpeed -= 0.0025;
            }, 1))
        }
        else {
            this.element.onpointerdown = self.onStart;
            this.element.onpointermove = self.onMove;
            this.element.onpointerup = self.onEnd;
        }

        window.addEventListener("deviceorientation", self.gyroscope, true);


    }

    this.addEvents();

    return this;
}