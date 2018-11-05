var Letter = require("./letter");

var Word = function (word){
    this.word = word;
    this.letters = [];
    this.wordFound = false;

    this.pushLetters = function (){
        for (var x = 0; x < this.word.length; x++){
            var newLetter = new Letter (this.word[x])
            this.letters.push(newLetter)
        }       
    }

    this.allLettersFound = function (){
        if(this.letters.every(function(ltr){
            return ltr.appear === true;
        }))
        {
            this.wordFound = true;
            return true;
        }
    }


}

module.exports = Word;