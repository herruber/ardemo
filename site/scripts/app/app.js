
world.initialize();

var arRenderer = new renderers.sandy()
arRenderer.start(document.getElementById("view-render"));

arRenderer.camera.position.set(0, 1, 10);
arRenderer.camera.lookAt(0, 1, 0);
var controls = new mobileControls(arRenderer.element, arRenderer.camera);
debugger;
measurements.rulers.createRulers();

if (!settings.useSpeech) world.createBox()
//Events

