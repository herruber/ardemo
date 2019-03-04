
var lang = "swedish";
var recognitionIsActive = false;
var synth;
var rec;

if (settings.useSpeech) {

    synth = window.speechSynthesis;

    if (!synth) alert("Speech controls are not supported on this device!");

    var utterance = new SpeechSynthesisUtterance();
    //var rec = new webkitSpeechRecognition();
    rec = new webkitSpeechRecognition();

 
    rec.onresult = function (event) {
       
        var txt = event.results[0][0].transcript;
        txt.replace("Trial version", "").trim();
        if (!txt) {
            restartRecognition();
            return;
        };
        speech.parseVoice(txt)
        console.log(event)
    }

    rec.onspeechstart = function (e) {
        

    }

    function restartRecognition(e) {
      
        if (!recognitionIsActive) {
            rec.start();
            recognitionIsActive = true;
        }
       
    }

    rec.onerror = function (e) {
       // restartRecognition(e);
    }

    rec.onend = function (e) {
        recognitionIsActive = false;
        restartRecognition(e);
    }

    rec.start();

}

function speechAction(name, swedish, english, fn, type) {

    this.name = name;
    this.swedish = swedish;
    this.english = english;
    this.fn = fn;
    this.type = type || 0; //If type is 0 the action will be done every frame untill stopped. If type is 1 it is secondary and happens once, like when setting the current actions speed

    return this;
}

var speech = (function () {

    var currentAction = null;
    var self = this;

    function parseVoice(txt) {

        for (var prop in library) {

            var speechAction = library[prop];

            var grammar = speechAction[lang].split("-");

            for (var i = 0; i < grammar.length; i++) {
                if (txt === grammar[i]) {


                    if (speechAction.name === "stop") {
                        speech.currentAction = null;
                    }
                    else {

                        switch (speechAction.type) {
                            case 0:
                                speech.currentAction = speechAction;
                                break;
                            case 1:
                                speechAction.fn();
                                break;
                            default:

                        }

                        return;
                    }
                }
            }

       
        }
    }

    var library = {
        stop: new speechAction("stop", "stopp", "stop", function (event) {
            utterance.text = 'Hello Treehouse';
            window.speechSynthesis.speak(utterance);
            currentAction = null;
        })
    }

    var addAction = function (action) {

        this.library[action.name] = action;

    }

    return {
        currentAction: currentAction,
        addAction: addAction,
        library: library,
        parseVoice: parseVoice
    }

}())
