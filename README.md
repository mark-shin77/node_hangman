# Hangman Node.js
### Short Video Presentation
- 

### Requirements

- [x] Use Inquirer & Node.js to create a hangman game ran on the terminal.
- [x] Create two constructors and name them word.js & letter.js

### Technologies Used

- Node.js
- Inquirer NPM Package - https://www.npmjs.com/package/inquirer
- is-letter NPM Package - https://www.npmjs.com/package/is-letter

### Code Explanation

- Letter.js constructor is used to generate the correctly guessed letter or underscores ( _ ) when a word is chosen from the words array.

- Word.js constructor has multiple functions 
   * pushLetters - runs the guessed letter through the Letter constructor.
   * allLettersFound - checks if all letters in the word have been correctly guessed.
   * checkIfLettersFound - goes through each letter to check if it matches the guessed letter.
   * wordRender - renders in the correctly guessed letters as they are guessed.
   
- Index.js is where all of the code starts coming together. A start, prompt, reset, and new function are used to interact with the user and run through the game. 

### Extras

- Hangman graphic is displayed on terminal for a more aesthetically pleasing game design.
- Console.reset function (found online) is used to keep terminal clean and easier to read for the user.
- Used var that = this in order fix error "this.property" is not defined.
