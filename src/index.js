import "../css/key.css";
import { genPianoKeys } from "./piano.js";

const pianoKeyWhiteTemplate = document.createElement("li");
pianoKeyWhiteTemplate.classList.add("white");

const pianoKeyBlackTemplate = document.createElement("li");
pianoKeyBlackTemplate.classList.add("black");

function createPianoKey(key) {
    const pianoKeyDOM = key.includes("#") ?
        pianoKeyBlackTemplate.cloneNode() :
        pianoKeyWhiteTemplate.cloneNode()

    pianoKeyDOM.innerText = key;
    return pianoKeyDOM;
}

function createPiano() {
    const pianoDOM = document.createElement("ul");
    pianoDOM.classList.add("piano");

    const pianoKeys = genPianoKeys();
    pianoKeys.map(createPianoKey).forEach(function (pianoKeyDOM) {
        pianoDOM.appendChild(pianoKeyDOM);
    });

    return pianoDOM;
}


const pianoDOM = createPiano();

document.body.appendChild(pianoDOM);

