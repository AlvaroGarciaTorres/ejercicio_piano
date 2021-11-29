
const sentence = "El perro del hortelano ni come ni deja comer";
const timeout = 3000;

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

const createPrintButton = () => {
    const button = document.createElement("button");
    button.id = "print";
    button.innerHTML = "Print";
    document.body.appendChild(button);
}

function printLetters(){
    const lettersDiv = document.createElement("div");
    lettersDiv.classList.add("lettersDiv");
    const lettersUl = document.createElement("ul");
    lettersDiv.appendChild(lettersUl);
    document.body.appendChild(lettersDiv);
    const printLetter = (letterLi) => lettersUl.appendChild(letterLi);

    //Array.prototype.forEach.call(lettersList.children, element => console.log(element))


    const interval = setInterval(function(){
        const letterLi = (lettersList.children[currentLetterIndex]);
        
        setTimeout(printLetter(letterLi), 1000);
        
        currentLetterIndex++;
    }, 2000);
}

let currentLetterIndex = 0;

const lettersList = createLetterList();

createPrintButton();

console.log(lettersList.children[0]);

const printButton = document.getElementById("print");

printButton.addEventListener("click", printLetters);