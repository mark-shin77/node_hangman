// Calling to inquirer npm
var inquirer = require('inquirer');
// Calling to isLetter npm
var isLetter = require('is-letter');
// Calling to word.js file
var Word = require("./word");
// List of random words
var wordList = ["Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard", "Squirtle", "Wartortle", "Blastoise", 
"Caterpie", "Metapod", "Butterfree", "Weedle", "Kakuna", "Beedrill", "Pidgey", "Pidgeotto", "Pidgeot", "Rattata", "Raticate", "Spearow", 
"Fearow", "Ekans", "Arbok", "Pikachu", "Raichu", "Sandshrew", "Sandslash", "Nidorina", "Nidoqueen", "Nidoran", "Nidorino", "Nidoking", 
"Clefairy", "Clefable", "Vulpix", "Ninetales", "Jigglypuff", "Wigglytuff", "Zubat", "Golbat", "Oddish", "Gloom", "Vileplume", "Paras", 
"Parasect", "Venonat", "Venomoth", "Diglett", "Dugtrio", "Meowth", "Persian", "Psyduck", "Golduck", "Mankey", "Primeape", "Growlithe", 
"Arcanine"];
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
        
    }
}