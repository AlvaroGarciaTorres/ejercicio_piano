import "../css/main.css";
import "../css/key.css";
import "../css/octave.css";
import "../css/piano.css";
import { allDOMKeys, createPiano, octaveSelection, octaveSelected } from "./piano.js";
import { actualKeyIndex, readMusicSheet, playMusicSheet, musicSheet, changeTimeout } from "./music-sheet.js";
import { playLigato } from "./ligato.js";
import { checkPiano } from "./utilityFunctions.js";

export let currentPiano;
export let allDOMPianos;

//const pianoDOM = createPiano();

//document.getElementById("piano").appendChild(pianoDOM);
//readMusicSheet(musicSheet);

currentPiano = 1;


const createButton = (str) => { //función genérica para crear bootones con id y nombre del argumento
    const button = document.createElement("button");
    button.id = `${str}`;
    button.innerHTML = `${str}`;
    document.body.appendChild(button);
}

function newstop() { //SE HCE GLOBAL PORQUE NO ES NECESARIO QUE SE CREEN TANTAS FUNCIONES STOP
    console.log("yes");
    clearTimeout(t);
};

createButton("Faster");
createButton("Slower");

const play = document.getElementById("play");
const stop = document.getElementById("stop");
const ligato = document.getElementById("ligato");
const newPiano = document.getElementById("createPiano");
const file = document.getElementById("file");
const faster = document.getElementById("Faster");
const slower = document.getElementById("Slower");

let stopfn = function () {

};

play.onclick = function (event) {
    event.preventDefault();
    if(!checkPiano()) return; 
    stop.style.visibility = "visible";
    play.disabled = true;
    stop.disabled = false;
    file.disabled = true;
    stopfn = playMusicSheet(function(){
        play.disabled = false;
        stop.disabled = true; 
        file.disabled = false;
    });
}

stop.onclick = function (event) {
    event.preventDefault();
    if(!checkPiano()) return;
    stop.disabled = true;
    play.disabled = false;
    file.disabled = false;
    stopfn();
}

ligato.onclick = function (event) {
    event.preventDefault();
    if(!checkPiano()) return; 
    stop.style.visibility = "visible";
    stop.disabled = false;
    play.disabled = true;
    file.disabled = true;
    stopfn = playLigato(function(){
        stop.disabled = true;
        play.disabled = false;
        file.disabled = false;
    });   
}

newPiano.onclick= function (event) { 
    allDOMPianos = createNewPiano();
    event.preventDefault();   
}

faster.onclick = function(event){
    event.preventDefault();
    stopfn = changeTimeout(1);
}

slower.onclick = function(event){
    event.preventDefault();
    stopfn = changeTimeout(0);
}

const createNewPiano = () => {    
    const pianoDOM = createPiano();
    const numberOfPianos = document.getElementsByClassName("piano_div").length;
    document.getElementsByClassName("piano_div")[numberOfPianos-1].appendChild(pianoDOM);  
    if(numberOfPianos == 1){
        const p = document.createElement("p");
        p.innerHTML = "Selecciona un piano:";
        p.style.color = "white";
        document.body.appendChild(p);
    }
    const button = document.createElement("button");
    button.innerHTML = `Piano ${numberOfPianos}`;
    button.dataset.number = numberOfPianos;
    document.body.appendChild(button);
    button.addEventListener("click", function (event){
        currentPiano = event.target.dataset.number;
        console.log(`Piano selected: ${currentPiano}`);
    })
    return document.querySelectorAll(".piano");
}
readMusicSheet(musicSheet);
file.addEventListener("change", handleFiles, false);

function handleFiles() {
    const fileList = this.files;
    const file = fileList[0];

    const reader = new FileReader();
    reader.onload = (function(){
        readMusicSheet(reader.result);
    })
    reader.readAsText(file);
    play.style.visibility = "visible";
}







