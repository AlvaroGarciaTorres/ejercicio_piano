import "../css/main.css";
import "../css/key.css";
import "../css/octave.css";
import "../css/piano.css";
import { createPiano, octaveSelection, octaveSelected } from "./piano.js";
import { musicSheet, readMusicSheet, playMusicSheet } from "./music-sheet.js";

const pianoDOM = createPiano();

document.getElementById("piano").appendChild(pianoDOM);
octaveSelection(octaveSelected);
readMusicSheet(musicSheet);

const play = document.getElementById("play");
const stop = document.getElementById("stop");
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

