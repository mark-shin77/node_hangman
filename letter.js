var Letter = function(letter){
    // Property to store letters
    this.letter = letter;
    // Boolean to check whether or not letter has been guessed
    this.appear = false;
    // Function to populate correct info to user
    this.letterGuesser = function (){
        // Makes sure to not read the blanks 
        if(this.letter == " "){
            this.appear = true;
            return " ";
        }
        // Returns an underscore if letter is not in the word
        if(this.appear === false){
            return " _ ";
        } 
        // Returns letter if it is part of the word
        else {
            return this.letter
        }
    }
};
// Export to words.js
module.exports = Letter;
