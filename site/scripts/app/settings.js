var settings = {
    useSpeech: false
}

var audioContext = new AudioContext();
console.log(audioContext.toString())
var buffer = audioContext.createBuffer(2, 22050, 44100);
console.log(buffer.length)