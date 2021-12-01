const createList = () => { 
    const lettersDiv = document.createElement("div");
    lettersDiv.classList.add("lettersDiv");
    const lettersUl = document.createElement("ul");
    lettersUl.appendChild(lettersList);
    lettersDiv.appendChild(lettersUl);
    document.body.appendChild(lettersDiv);
    return lettersUl;
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
        console.log("hola");
        
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
