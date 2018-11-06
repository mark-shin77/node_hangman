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
            console.log("\nOk! Let's Get It!\nCategory: Generation 1 Pokemon \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            var ranNum = Math.floor(Math.random()*this.wordBank.length);
            this.currentWord = new Word (this.wordBank[ranNum]);
            this.currentWord.pushLetters();
            console.log(this.currentWord.wordRender());
            console.log("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
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
        var that = this;
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
            }]).then(function(lttr){
                var letterReturned = (lttr.chosenLetter).toUpperCase();
                var alreadyGuessed = false;
                for (var x = 0; x < that.guessedLetters.length; x++){
                    if (letterReturned === that.guessedLetters[x]){
                        alreadyGuessed = true;
                    }
                }
                if(alreadyGuessed === false){
                    that.guessedLetters.push(letterReturned);

                    var found = that.currentWord.checkIfLetterGuessed(letterReturned);
                    if(found === 0){
                        console.log("\n=====================================")
                        console.log("Nope, There is no " + letterReturned + " in the word!");
                        that.guessesRemaining--;
                        that.display++;
                        console.log("Guesses remaining: " + that.guessesRemaining + "\n");
                        console.log(hangmanDisplay[(that.display)-1]);
                        console.log("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
                        console.log(that.currentWord.wordRender());
                        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
                        console.log("Letters guessed: " + that.guessedLetters);
                        console.log("=====================================\n")
                    }
                    else{
                        console.log("\nCorrect!");
                        if(that.currentWord.allLettersFound() === true){
                            console.log(that.currentWord.wordRender());
                            console.log("\nCongratulations! You are a true Pokémon Master!\n")
                            process.exit();
                        }
                        else{
                            console.log("\n=====================================")
                            console.log("Guesses Remaining: " + that.guessesRemaining + "\n");
                            console.log(that.currentWord.wordRender());
                            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n")
                            console.log("Letters guessed: " + that.guessedLetters);
                            console.log("\n=====================================\n")
                        }
                    }

                    if(that.guessesRemaining > 0 && that.currentWord.wordFound === false){
                        that.keepPromptingUser();
                    } 
                    else if (that.guessesRemaining === 0) {
                        console.log("Game over :(")
                        console.log("The word you were guessing was: " + that.currentWord.word)
                    }
                    else{
                        console.log("You've guessed that letter already! Try again!");
                        that.keepPromptingUser();
                    }
                }
            })
    }
}

hangman.startGame();