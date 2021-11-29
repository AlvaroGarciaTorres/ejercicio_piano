import { currentPiano, allDOMPianos } from "./index.js";

export const checkPiano = () => {
    if(allDOMPianos == undefined){ // Si no se ha creado ningún piano
        alert("Cree un piano por favor");
        return false;
    } else if(currentPiano == 0){ // Si no se ha seleccionado ningún piano 
        alert("Seleccione un piano por favor");
        return false;
    } else return true;
}