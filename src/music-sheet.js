import { currentPiano } from ".";
import "../css/music-sheet.css";
import { octaveSelected, octaveSelection, playKey } from "./piano.js";

let actualKeyIndex = 0;

export let timeout = 500;

export let t = null;

export const musicSheet = "A1,C#3,B1,C4,F5,C3,A#2,C1";

export function readMusicSheet(musicSheet){
    const musicSheetDOM = document.getElementById("music-sheet");
    if(musicSheetDOM.childElementCount != 0){
        const childrenNumber = musicSheetDOM.childElementCount;
        for(let i = 0; i < childrenNumber; i++){
            musicSheetDOM.removeChild(musicSheetDOM.childNodes[0]);
        }
    };
    musicSheetDOM.classList.add("music-sheet");
    const keys = musicSheet.split(",");

    keys.forEach(key => {
        const keyDOM = document.createElement("li");
        keyDOM.classList.add("music-sheet-key");
        keyDOM.innerHTML = key;

        musicSheetDOM.appendChild(keyDOM);
    });
    actualKeyIndex = 0;
}

export function playMusicSheet(callback) {
    const musicSheetDOM = document.getElementById("music-sheet");
    const musicSheetKeysDOM = musicSheetDOM.childNodes;

    /*const interval = setInterval(function () {
        const musicSheetKeyDOM = musicSheetKeysDOM[actualKeyIndex];
        musicSheetKeyDOM.classList.add("play");
        const key = musicSheetKeyDOM.innerText;
        let octave = key.substr(-1);
        console.log(octave);
        octaveSelection(currentPiano - 1, octave);
        playKey(key, true);

        setTimeout(function () {
            playKey(key, false);
            musicSheetKeyDOM.classList.remove("play");
        }, 450);

        actualKeyIndex++;

        if (actualKeyIndex >= musicSheetKeysDOM.length) {
            clearInterval(interval);
            actualKeyIndex = 0;
            callback();
            return;
        }
    }, timeout);*/

    t = setTimeout(function(){
        const musicSheetKeyDOM = musicSheetKeysDOM[actualKeyIndex];
        musicSheetKeyDOM.classList.add("play");
        const key = musicSheetKeyDOM.innerText;
        let octave = key.substr(-1);
        console.log(octave);
        octaveSelection(currentPiano - 1, octave);
        playKey(key, true);

        setTimeout(function () {
            playKey(key, false);
            musicSheetKeyDOM.classList.remove("play");
        }, 450);

        actualKeyIndex++;

        if (actualKeyIndex >= musicSheetKeysDOM.length) {
            clearTimeout(t);
            actualKeyIndex = 0;
            callback();
            return;
        }

        playMusicSheet(callback);
    }, timeout);

    return function stop() {
        const musicSheetKeyDOM = musicSheetKeysDOM[actualKeyIndex];
        musicSheetKeyDOM.classList.add("play"); //marca la nota que se est?? reproduciendo cuando se pulsa stop
        //clearInterval(interval);
        clearTimeout(t);
    };
}

export function changeTimeout(code){
    if(code == 1) timeout /= 2;
    else if (code == 0) timeout *= 2;
}