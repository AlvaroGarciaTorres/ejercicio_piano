import { playLigato } from "./ligato";
import { currentPiano, allDOMPianos } from "./index.js";
import { checkPiano } from "./utilityFunctions";

export const musicNotes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
export const allDOMKeys = {};

export function genPianoKeys() {
    let pianoKeys = [];

    for (let octave = 0; octave <= 8; octave++) {
        const octaveKeys = [];
        for (let musicNote of musicNotes) {
            octaveKeys.push(musicNote + octave);
        }
        if (octave == 0) {
            octaveKeys.splice(0, 9)
        }

        if (octave == 8) {
            octaveKeys.splice(1)
        }
        pianoKeys.push(octaveKeys);
    }
    return pianoKeys;
}

let oldOctave = 1;
export let octaveSelected = oldOctave;

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
        allDOMKeys[key] = pianoKey;
        pianoOctave.appendChild(pianoKey);
    });
    const pianoOctaveContainer = document.createElement("li");
    pianoOctaveContainer.classList.add("octave");
    pianoOctaveContainer.appendChild(pianoOctave);
    return pianoOctaveContainer;
}


export function createPiano() {
    const pianoDiv = document.createElement("div");
    //pianoDiv.id = "piano"; //el id no se puede usar porque hay varios pianos
    pianoDiv.classList.add("piano_div");
    if(allDOMPianos == undefined) pianoDiv.dataset.pianoNumber = `1`;
    else pianoDiv.dataset.pianoNumber = `${allDOMPianos.length + 1}`;
    document.body.insertAdjacentElement("beforebegin", pianoDiv); //añado el div de los pianos al principio de la página
    const pianoDOM = document.createElement("ul");
    pianoDOM.classList.add("piano");

    pianoDOM.addEventListener("mousedown", function (event) {
        if (event.target.dataset.key) {
            console.log(event.target.dataset.key, "pressed");
            let piano = event.target.parentNode.parentNode.parentNode.parentNode.dataset.pianoNumber;
            octaveSelected = event.target.dataset.key.substr(-1);
            octaveSelection(piano - 1);
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


export function octaveSelection(piano) {
    const octavesDOM = allDOMPianos[piano].getElementsByClassName("octave");//Selecciona las octavas del piano activo
    
    octavesDOM[oldOctave].classList.remove("selected");
    octavesDOM[octaveSelected].classList.add("selected");

    oldOctave = octaveSelected;
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
    playKey(key, isDown);
}

export function playKey(key, isDown) {
    const pianoToPlay = allDOMPianos[currentPiano - 1]; //selecciona el piano actual  
    const keyDOM = pianoToPlay.querySelector(`[data-key='${key}']`);
    
    if (isDown) {
        keyDOM.classList.add("active");
    } else {
        keyDOM.classList.remove("active");
    }
}

