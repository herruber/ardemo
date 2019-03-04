

var renderers = (function() {

    function sandy() {

        var self = this;
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
        this.size = new THREE.Vector2()
        this.camera = new THREE.PerspectiveCamera(60, 1, 0.5, 100)
        this.scene = new THREE.Scene()
        this.element = null
        this.frameCounter = 0

        this.start = function(element, properties) {
            //Prepare everything related to the renderer
            this.element = element;
            this.scene = world.scene;
            this.scene.add(this.camera);
            this.renderer.setClearColor(0x222222, 1.0);
            element.appendChild(this.renderer.domElement);

            requestAnimationFrame(this.initFrame);
        }

        this.renderFrame = function(scene, camera) {

            this.renderer.render(scene, camera);

            //Count the frame and reset the counter at 100 frames
            this.frameCounter++;
        }

        this.resize = function() {


            this.renderer.getSize(this.size);

            if (this.frameCounter === 4) {
                this.frameCounter = 0;

                if (this.element.clientWidth !== this.size.x || this.element.clientHeight !== this.size.y) {
                    console.log("resizing..")

                    this.camera.aspect = this.element.clientWidth / this.element.clientHeight;
                    this.camera.updateProjectionMatrix();
                    this.renderer.setSize(this.element.clientWidth, this.element.clientHeight);

                }
            }

        }

        this.initFrame = function() {

            //Setup everything needed to draw next frame

            self.resize();
           
            if (speech && speech.currentAction) {
                speech.currentAction.fn();
            }

            //Finally render frame and request the next

            self.renderFrame(self.scene, self.camera);

            requestAnimationFrame(self.initFrame);
        }

        return this;
    }


    return {
        sandy: sandy
    }


}())