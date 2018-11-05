var Letter = function(letter){
    this.letter = letter;
    this.appear = false;
    this.letterGuesser = function (){
        if(this.letter == " "){
            this.appear = true;
            return " ";
        }
        if(this.appear = false){
            return "_ ";
        } else {
            return this.letter
        }
    }
}

module.exports = Letter;
