// Calling to inquirer npm
var inquirer = require('inquirer');
// Calling to isLetter npm
var isLetter = require('is-letter');
// Calling to word.js file
var Word = require("./word");
// List of random words
var wordList = ["BULBASAUR", "IVYSAUR", "VENUSAUR", "CHARMANDER", "CHARMELEON", "CHARIZARD", "SQUIRTLE", "WARTORTLE", "BLASTOISE", 
"CATERPIE", "METAPOD", "BUTTERFREE", "WEEDLE", "KAKUNA", "BEEDRILL", "PIDGEY", "PIDGEOTTO", "PIDGEOT", "RATTATA", "RATICATE", "SPEAROW", 
"FEAROW", "EKANS", "ARBOK", "PIKACHU", "RAICHU", "SANDSHREW", "SANDSLASH", "NIDORINA", "NIDOQUEEN", "NIDORAN", "NIDORINO", "NIDOKING", 
"CLEFAIRY", "CLEFABLE", "VULPIX", "NINETALES", "JIGGLYPUFF", "WIGGLYTUFF", "ZUBAT", "GOLBAT", "ODDISH", "GLOOM", "VILEPLUME", "PARAS", 
"PARASECT", "VENONAT", "VENOMOTH", "DIGLETT", "DUGTRIO", "MEOWTH", "PERSIAN", "PSYDUCK", "GOLDUCK", "MANKEY", "PRIMEAPE", "GROWLITHE", 
"ARCANINE"];
// Hangman Graphic
var hangmanDisplay = [ "\n\n\n\n\n\n\n-------------", "\n |\n |\n |\n |\n |\n |\n |\n-------------", 
"____________\n |         |\n |\n |\n |\n |\n |\n-------------", 
"____________\n |         |\n |         O\n |\n |\n |\n |\n |\n-------------",
"____________\n |         |\n |         O\n |         |\n |         |\n |\n |\n |\n-------------",
"____________\n |         |\n |         O\n |         |\n |         |\n |        ---\n |\n |\n-------------", 
"____________\n |         |\n |         O\n |       __|\n |         |\n |        ---\n |\n |\n-------------", 
"____________\n |         |\n |         O\n |       __|__\n |         |\n |        ---\n |\n |\n-------------", 
"____________\n |         |\n |         O\n |       __|__\n |         |\n |        ---\n |        |\n |\n-------------",
"____________\n |         |\n |         O\n |       __|__\n |         |\n |        ---\n |        | |\n |\n-------------"]

//set the maxListener
require('events').EventEmitter.prototype._maxListeners = 100;

var hangman = {
    wordBank: wordList,
    guessesRemaining: 10,
    guessedLetters: [],
    display: 0,
    currentWord: null,

    startGame: function(){
        var that = this;
        if (this.guessedLetters.length > 0){
            this.guessedLetters = [];
        }

        inquirer.prompt([
            {
                name: "play",
                type: "confirm",
                message: "Ready to play??"
            }
        ]).
        then(function(answer){
            if(answer.play){
                that.newGame();
            } else{
                console.log("Let me know when you're ready!")
            }
        })
    },

    newGame: function(){
        if(this.guessesRemaining === 10) {
            console.log("Ok! Let's Get It!" + "\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            var ranNum = Math.floor(Math.random()*this.wordBank.length);
            this.currentWord = new Word (this.wordBank[ranNum]);
            this.currentWord.pushLetters();
            console.log(this.currentWord.wordRender());
            this.keepPromptingUser();
        } 
        else{
            this.resetGuessesRemaining();
            this.newGame();
        }        
    },

    resetGuessesRemaining: function(){
        this.guessesRemaining = 10;
    },

    keepPromptingUser: function(){
        inquirer.prompt([
            {
                name: "chosenLetter",
                type: "input",
                message: "Pick a letter!",
                validate: function(value){
                    if (isLetter(value)){
                        return true;
                    }
                    else{
                        return false;
                    }
                }
            }. 
            then(function(lttr){
                var letterReturned = (lttr.chosenLetter).toUpperCase();
                var alreadyGuessed = false;
                for (var x = 0; x < this.guessedLetters.length; x++){
                    if (letterReturned === this.guessedLetters[x]){
                        alreadyGuessed = true;
                    }
                }
                if(alreadyGuessed === false){
                    this.guessedLetters.push(letterReturned);

                    var found = this.currentWord.checkIfLetterGuessed(letterReturned);
                    if(found === 0){
                        console.log("Nope, There is no " + letterReturned + "in the word!");
                        this.guessesRemaining--;
                        this.display++;
                        console.log("Guesses remaining: " + this.guessesRemaining);
                        console.log(hangmanDisplay[(this.display)-1]);
                        console.log("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~")
                        console.log(this.currentWord.wordRender());
                        console.log("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~")
                        console.log("Letters guessed: " + this.guessedLetters);
                    }
                    else{
                        console.log("Correct!");
                        if(this.currentWord.allLettersFound() === true){
                            console.log(this.currentWord.wordRender());
                            console.log("Congratulations! You are a true Pokémon Master!")
                        }
                        else{
                            console.log("Guesses Remaining: " + this.guessesRemaining);
                            console.log(this.currentWord.wordRender());
                            console.log("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~")
                            console.log("Letters guessed: " + this.guessedLetters);
                        }
                    }

                    if(this.guessesRemaining > 0 && this.currentWord.wordFound === false){
                        this.keepPromptingUser();
                    } 
                    else if (this.guessesRemaining === 0) {
                        console.log("Game over :(")
                        console.log("The word you were guessing was: " + this.currentWord.word)
                    }
                    else{
                        console.log("You've guessed that letter already! Try again!");
                        this.keepPromptingUser();
                    }
                }
            })
        ])
    }
}

hangman.startGame();