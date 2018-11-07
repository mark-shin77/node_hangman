// Calling to letter.js file
var Letter = require("./letter");

var Word = function (word){
    var that = this;
    // Storing the word
    this.word = word;
    // Collecting all guessed letters
    this.letters = [];
    // Boolean to check if the correct word has been guessed
    this.wordFound = false;
    // Pushing Guessed letters to letters array
    this.pushLetters = function (){
        for (var x = 0; x < that.word.length; x++){
            var newLetter = new Letter (that.word[x])
            this.letters.push(newLetter)
        }       
    }
    // If all letters are guessed correctly, run this function
    this.allLettersFound = function (){
        if(this.letters.every(function(ltr){
            return ltr.appear === true;
        }))
        {
            this.wordFound = true;
            return true;
        }
    };
    // Goes through each letter to check if it matches the guessed letter
    this.checkIfLetterFound = function(guess){
        var whatToReturn = 0;
        this.letters.forEach(function(ltr){
            if(ltr.letter === guess){
                ltr.appear = true;
                whatToReturn++;
            }
        })
        // If guess matches Letter property, the letter shows
        return whatToReturn;
    }
    // Renders letters based on if letters are found or not
    this.wordRender = function (){
        var display = "";
        that.letters.forEach(function(ltr){
            var currentLetter = ltr.letterGuesser();
            display+=currentLetter;
        })
        return display;
    }
}

// Exports to index.js
module.exports = Word;