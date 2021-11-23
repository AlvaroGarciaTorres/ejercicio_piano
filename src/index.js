import "../css/main.css";
import "../css/key.css";
import "../css/octave.css";
import "../css/piano.css";
import { createPiano, octaveSelection, octaveSelected } from "./piano.js";
import { musicSheet, readMusicSheet, playMusicSheet } from "./music-sheet.js";
import { playLigato } from "./ligato.js";

/*const pianoDOM = createPiano();

document.getElementById("piano").appendChild(pianoDOM);
octaveSelection(octaveSelected);*/
readMusicSheet(musicSheet);

let currentPiano = 1;

const play = document.getElementById("play");
const stop = document.getElementById("stop");
const ligato = document.getElementById("ligato");
const newPiano = document.getElementById("createPiano");
let stopfn = function () {

};

play.onclick = function (event) {
    stopfn = playMusicSheet();
    event.preventDefault();
}

stop.onclick = function (event) {
    stopfn();
    event.preventDefault();
}

ligato.onclick= function (event) { 
    event.preventDefault();
    stopfn = playLigato(currentPiano);
    event.preventDefault();   
}

newPiano.onclick= function (event) { 
    createNewPiano();
    event.preventDefault();   
}

const createNewPiano = () => {
    const pianoDOM = createPiano();
    const numberOfPianos = document.getElementsByClassName("piano_div").length;
    document.getElementsByClassName("piano_div")[numberOfPianos-1].appendChild(pianoDOM);
    pianoDOM.dataset.number = numberOfPianos;
    const button = document.createElement("button");
    button.innerHTML = `Piano ${numberOfPianos}`;
    button.dataset.number = numberOfPianos;
    document.body.appendChild(button);
    button.addEventListener("click", function (event){
        currentPiano = event.target.dataset.number;
        console.log(`Piano selected: ${currentPiano}`);
    })
}





