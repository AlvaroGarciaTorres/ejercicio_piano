
const sentence = "El perro del hortelano ni come ni deja comer";
const timeout = 200;
let currentLetterIndex = 0;
let stopfn = function () {

};

const createLetterList = () => {

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

const createList = () => { 
    const lettersDiv = document.createElement("div");
    lettersDiv.classList.add("lettersDiv");
    const lettersUl = document.createElement("ul");
    lettersUl.appendChild(lettersList);
    lettersDiv.appendChild(lettersUl);
    document.body.appendChild(lettersDiv);
    return lettersUl;
}

const createPrintButton = () => {
    const button = document.createElement("button");
    button.id = "print";
    button.innerHTML = "Print";
    document.body.appendChild(button);
}

function colorLetter(letterLi) {
    letterLi.classList.add("paint");
}

function colorLetters(){
    //Array.prototype.forEach.call(lettersList.children, element => console.log(element))
    
    const numberOfLetters = lettersList.childElementCount;

    const interval = setInterval(function(){
        const letterLi = lettersList.children[currentLetterIndex];            
        colorLetter(letterLi);
        
        currentLetterIndex++;
        if (currentLetterIndex >= numberOfLetters) {
            clearInterval(interval);
            currentLetterIndex = 0;
            return;
        }
    }, timeout);

    return function stop() {
        const letterLi = lettersList.children[currentLetterIndex];
        letterLi.classList.add("paint"); //marca la nota que se está reproduciendo cuando se pulsa stop
        clearInterval(interval);
    };
}


const lettersList = createLetterList();

createPrintButton();
const lettersUl = createList();

const printButton = document.getElementById("print");
printButton.onclick = function(event){
    event.preventDefault();
    stopfn = colorLetters;
}