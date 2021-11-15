import "../css/main.css";
import "../css/key.css";
import "../css/piano.css";
import { genPianoKeys } from "./piano.js";

const pianoKeyWhiteTemplate = document.createElement("li");
pianoKeyWhiteTemplate.classList.add("white", "key");

const pianoKeyBlackTemplate = document.createElement("li");
pianoKeyBlackTemplate.classList.add("black", "key");


function createPianoKey(key) {
    const pianoKeyDOM = key.includes("#") ?
        pianoKeyBlackTemplate.cloneNode() :
        pianoKeyWhiteTemplate.cloneNode();

    pianoKeyDOM.dataset.key = key;
    return pianoKeyDOM;
}

function createPiano() {
    const pianoDOM = document.createElement("ul");
    pianoDOM.classList.add("piano");

    pianoDOM.addEventListener("mousedown", function (event) {
        if (event.target.dataset.key) {
            console.log(event.target.dataset.key, "pressed");
        }
    }, true);

    pianoDOM.addEventListener("mouseup", function (event) {
        if (event.target instanceof HTMLLIElement) {
            console.log(event.target.dataset.key, "released");
        }
    }, true);


    document.body.onkeydown = function (event) {
        console.log(event.code, event.key, event.shiftKey)
    }

    const pianoKeys = genPianoKeys();
    pianoKeys.map(createPianoKey).forEach(function (pianoKeyDOM) {
        pianoDOM.appendChild(pianoKeyDOM);
    });

    return pianoDOM;
}


const pianoDOM = createPiano();

document.body.appendChild(pianoDOM);

const audio = new AudioContext();

function setFrequency(freq) {

    var waveform = audio.createOscillator(); //darle constancia a las notas
    var volume = audio.createGain(); //sirve para darle volumen a la onda, duracion del sonido
    waveform.connect(volume); //conecta la onda con la duracion del sonido
    waveform.type = "sawtooth"; //tipo de sonido (este es el mas parecido a un piano)
    waveform.frequency.value = freq; //asigna la frecuencia(el sonido exacto de la tecla) con el valor que le pasamos de la frecuencia
    volume.connect(audio.destination); //representa un destino final de todo el audio. a menudo repr un disp de audio real, como los altavoces
    waveform.start(0);
    volume.gain.exponentialRampToValueAtTime(0.00001, audio.currentTime + 1.5);


}
