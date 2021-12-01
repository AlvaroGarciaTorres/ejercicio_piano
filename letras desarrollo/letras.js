
//VARIABLES GLOBALES

const sentence = "El perro del hortelano ni come ni deja comer";
let timeout = 1000;
let currentLetterIndex = 0;
let stopfn = function () {

};

//FUNCIONES

const createLetterList = () => { //Crea una lista con las letras de la frase

    const lettersList = document.createElement("ul");
    lettersList.classList.add("lettersList");
    
    const letters = sentence.split("");
    
    for(let i in letters){
        const letter = document.createElement("li");
        letter.innerHTML = letters[i];
        lettersList.appendChild(letter);
    }

    console.log("Hecho!");

    return lettersList;
}

const createList = () => { //crea la lista del DOM
    const lettersDiv = document.createElement("div");
    lettersDiv.classList.add("lettersDiv");
    const lettersUl = document.createElement("ul");
    lettersDiv.appendChild(lettersUl);
    document.body.appendChild(lettersDiv);
    return lettersUl;
}

const createButton = (str) => { //función genérica para crear bootones con id y nombre del argumento
    const button = document.createElement("button");
    button.id = `${str}`;
    button.innerHTML = `${str}`;
    document.body.insertAdjacentElement("afterbegin", button);
}

/*function printLetters(){ //añade las letras a la lista del DOM    
    
    const interval = setInterval(function(){
        const letterLi = lettersList.children[0];
        lettersUl.appendChild(letterLi);
        console.log("hola");
        
        currentLetterIndex++;
        if (currentLetterIndex >= numberOfLetters) {
            clearInterval(interval);
            currentLetterIndex = 0;
            return;
        }
    }, timeout);

    return function stop() {
        clearInterval(interval);
    };
}*/

/*
let t = null;

function printLetters(cbk){ //añade las letras a la lista del DOM  
    
    t = setTimeout(function(){
        const letterLi = lettersList.children[0];
        lettersUl.appendChild(letterLi);
        currentLetterIndex++;
        if (currentLetterIndex >= numberOfLetters) {
            currentLetterIndex = 0;
            cbk();
            return;
        }
        printLetters(cbk);

    }, timeout);
    

    return function stop() {
        console.log("yes");
        clearTimeout(t);
    };
}
*/

//SOLUCION PARA PODER PARAR EL TIMEOUT

function newstop() { //SE HCE GLOBAL PORQUE NO ES NECESARIO QUE SE CREEN TANTAS FUNCIONES STOP
    console.log("yes");
    clearTimeout(t);
};

let t = null; //SE HACE GLOBAL PARA QUE SE PUEDA ACCEDER A LA ACTUAL

function printLetters(cbk){ //añade las letras a la lista del DOM      
    t = setTimeout(function(){
        const letterLi = lettersList.children[0];
        lettersUl.appendChild(letterLi);
        currentLetterIndex++;
        if (currentLetterIndex >= numberOfLetters) {
            currentLetterIndex = 0;
            cbk();
            return;
        }
        printLetters(cbk);
    }, timeout);
}

//CREACION DEL DOM/CTES GLOBALES

const lettersList = createLetterList();
const numberOfLetters = lettersList.childElementCount;
const lettersUl = createList();

//BOTONES

createButton("slower");
createButton("faster");
createButton("stop");
createButton("print");

const print = document.getElementById("print");
print.onclick = function(event){
    event.preventDefault();
    print.disabled = true;
    stop.disabled = false;
    //faster.disabled = true;
    //slower.disabled = true;
    stopfn = printLetters(function(){
        print.disabled = false;
        stop.disabled = true;
    });
}

const stop = document.getElementById("stop");
stop.onclick = function(event){
    print.disabled = false;
    stop.disabled = true;
    faster.disabled = false;
    slower.disabled = false;
    event.preventDefault();
    //stopfn();
    newstop();
}

const faster = document.getElementById("faster");
faster.onclick = function (event){
    event.preventDefault();
    timeout /= 2;
    console.log(`Velocidad: ${timeout/1000} segundos`);
}

const slower = document.getElementById("slower");
slower.onclick = function(event){
    event.preventDefault();
    timeout *= 2;
    console.log(`Velocidad: ${timeout/1000} segundos`);
}