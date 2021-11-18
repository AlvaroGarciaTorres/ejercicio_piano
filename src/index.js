import "../css/main.css";
import "../css/key.css";
import "../css/octave.css";
import "../css/piano.css";
import { genPianoKeys, musicNotes } from "./piano.js";


let octaveSelected = 1;

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

function createPianoOctave(octave) {
    const pianoOctave = document.createElement("ul");

    octave.forEach(key => {
        const pianoKey = createPianoKey(key);
        pianoOctave.appendChild(pianoKey);
    });

    const pianoOctaveContainer = document.createElement("li");
    pianoOctaveContainer.classList.add("octave");
    pianoOctaveContainer.appendChild(pianoOctave);

    return pianoOctaveContainer;
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
        if (event.key >= "0" && event.key <= "8") {
            octaveSelection(parseInt(event.key));
        } else {
            pulseKey(event, true);
        }
    }

    document.body.onkeyup = function (event) {
        pulseKey(event, false);
    }

    const pianoKeys = genPianoKeys();

    pianoKeys.map(createPianoOctave).forEach(function (pianoOctaveDOM) {
        pianoDOM.appendChild(pianoOctaveDOM);
    });

    return pianoDOM;
}

function octaveSelection(octave) {
    const octavesDOM = document.getElementsByClassName("octave");

    octavesDOM[octaveSelected].classList.remove("selected");
    octavesDOM[octave].classList.add("selected");

    octaveSelected = octave;
}

function pulseKey(event, isDown) {
    const octave = octaveSelected;

    let musicNote = event.key.toUpperCase();
    if (event.shiftKey) {
        musicNote += "#";
    }

    if (!musicNotes.includes(musicNote)) {
        return;
    }
    const key = musicNote + octave;
    const keyDOM = document.querySelector(`[data-key='${key}']`);
    if (isDown) {
        keyDOM.classList.add("active");
    } else {
        keyDOM.classList.remove("active");
    }
}

const pianoDOM = createPiano();

document.body.appendChild(pianoDOM);
octaveSelection(octaveSelected);

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
