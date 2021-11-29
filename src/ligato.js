import { playKey } from "./piano.js";
import { currentPiano, allDOMPianos } from "./index.js";

export function playLigato(callback) {
    const playingPiano = allDOMPianos[currentPiano - 1];
    const allKeys = playingPiano.querySelectorAll(".key");
    let keysArray = [];
    for(let i = 0; i < allKeys.length; i++){
        keysArray.push(allKeys[i].dataset.key);
    }

    let actualKeyIndex = 0;
    let bool = false;

    const interval = setInterval(function () {
        const key = keysArray[actualKeyIndex];
        //console.log(key);
        playKey(key, true);

        setTimeout(function () {
            playKey(key, false);
        }, 450);

        if (actualKeyIndex == keysArray.length -1) {
            bool = true;
            actualKeyIndex--;
        } else if (actualKeyIndex < keysArray.length && bool == false){
            actualKeyIndex++;
        } else if (actualKeyIndex > 0 && bool == true){
            actualKeyIndex--;
        } else {
            clearInterval(interval);
            actualKeyIndex = 0;
            callback();
            return;
        }

    }, 500);

    return function stop() {
        clearInterval(interval);
    };
}