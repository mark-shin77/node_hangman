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
// Hangman Graphic found online
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
    // Prompt to ask user if they are ready or not to play
    startGame: function(){
        var that = this;
        // Clearing up the guessedLetters array if there is anything leftover
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
                // Starts game if user says they want to play
                that.newGame();
            } else{
                // Game will not start
                console.log("Let me know when you're ready!")
            }
        })
    },
    // Starts a new game
    newGame: function(){
        if(this.guessesRemaining === 10) {
            console.log("\nOk! Let's Get It!\nCategory: Generation 1 Pokemon \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            // Picking a random word from the word bank
            var ranNum = Math.floor(Math.random()*this.wordBank.length);
            // Pushing the randomly selected word through Word/Letter constructors which return 
            // underscores in place of the number of letters in the selected word
            this.currentWord = new Word (this.wordBank[ranNum]);
            this.currentWord.pushLetters();
            // Renders word based on selected word
            console.log(this.currentWord.wordRender());
            console.log("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            // Prompts user to select a letter
            this.keepPromptingUser();
        } 
        else{
            // Resets game if guessesRemaining != 10 then starts a new game
            this.resetGuessesRemaining();
            this.newGame();
        }        
    },
    // Resetting the number of remaining guesses to 10
    resetGuessesRemaining: function(){
        this.guessesRemaining = 10;
    },
    // Prompts user to select a letter
    keepPromptingUser: function(){
        var that = this;
        inquirer.prompt([
            {
                name: "chosenLetter",
                type: "input",
                message: "Pick a letter!",
                // Checks to see if a letter was chosen
                validate: function(value){
                    if (isLetter(value)){
                        return true;
                    }
                    else{
                        return false;
                    }
                }
            }]).then(function(lttr){
                // Capitalizes user's input since all words in array are caps
                var letterReturned = (lttr.chosenLetter).toUpperCase();
                // Boolean for whether or not a  letter has been guessed
                var alreadyGuessed = false;
                // Loops through guessedLetters array to check if a letter has been picked
                for (var x = 0; x < that.guessedLetters.length; x++){
                    if (letterReturned === that.guessedLetters[x]){
                        alreadyGuessed = true;
                        console.log("=====================================");
                        console.log("\nYou've guessed that letter already!\n");
                        console.log("=====================================");
                        // Prompts user to select a letter
                        that.keepPromptingUser();
                    }
                }
                // If letter was not guessed decide what prompt/message is appropriate 
                if(alreadyGuessed === false){
                    // Pushes newly selected letters to guessedLetters array
                    that.guessedLetters.push(letterReturned);
                    // Variable to check if letter has been guessed
                    var found = that.currentWord.checkIfLetterFound(letterReturned);
                    if(found === 0){
                        // If no letters are found, let user know they were wrong
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
                        // Checking to see if user has found all letters or not
                        if(that.currentWord.allLettersFound() === true){
                            // If all letters are found, user wins
                            console.log(that.currentWord.wordRender());
                            console.log("\nCongratulations! You are a true Pokémon Master!\n")
                            // Ending the game
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
                    // After displaying appropriate message to user, run function again if guesses are remaining
                    if(that.guessesRemaining > 0 && that.currentWord.wordFound === false){
                        that.keepPromptingUser();
                    } 
                    // If guessesRemaining = 0 end the game
                    else if (that.guessesRemaining === 0) {
                        console.log("Game over :(")
                        console.log("The word you were guessing was: " + that.currentWord.word)
                    }
                }
            })
    }
}
// Calling function to start the game
hangman.startGame();