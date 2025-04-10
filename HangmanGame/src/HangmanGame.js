import './App.css';
import React from 'react';
import LetterBox from './LetterBox';
import SingleLetterSearchbar from './SingleLetterSearchBar';

const pics = ['noose.png', 'upperBody.png', 'upperandlowerbody.png', '1arm.png', 'botharms.png', '1leg.png', 'Dead.png'];   // Hangman Images
const words = ["Morehouse", "Spelman", "Basketball", "Table", "Museum", "Excellent", "Fun", "React"];                       // Secret Words
const MAX_LIVES = 6;

class HangmanGame extends React.Component {
  state = {
    word_List: words,
    current_Word: "",
    lives_Left: 0,
    used_Letters: [],
    Word_Display: [],
  }

  componentDidMount() {
    this.startNewGame();
  }

  startNewGame = () => {
    const randomWord = this.state.word_List[Math.floor(Math.random() * this.state.word_List.length)];   // Picks a random word from Secret Words list

    this.setState({
      current_Word: randomWord,
      lives_Left: 0,
      used_Letters: [],
      Word_Display: Array(randomWord.length).fill('_'), // Resets the word display
    });
  }

  handleGuesses = (letter) => {
    const { current_Word, used_Letters, lives_Left, Word_Display } = this.state;

    // If the letter has already been guessed, do nothing
    if (used_Letters.includes(letter)) {
      alert("You already guessed that letter!");
      return;
    }

    // Add the letter to used letters
    const updatedUsedLetters = [...used_Letters, letter];

    // Check if the letter is in the word
    let updatedWordDisplay = [...Word_Display];
    let correctGuess = false;

    current_Word.split("").forEach((char, index) => {
      if (char.toLowerCase() === letter.toLowerCase()) {    // Matches each letter regardless of capitalization
        updatedWordDisplay[index] = char;
        correctGuess = true;
      }
    });

    // If incorrect guess, increment lives
    const newLives = correctGuess ? lives_Left : lives_Left + 1;

    // Alert Player if they won
    if (newLives === MAX_LIVES) {
      alert(`GAME OVER. The Secret Word was: "${current_Word}". Press the NEW GAME button to try again!`)
      this.startNewGame();
    }

     // Alert Player if they won
     if (!updatedWordDisplay.includes('_')) {
      alert(`Congratulations! You've guessed the word correctly! Press the NEW GAME button to try again.`);
      this.startNewGame();
    }

    this.setState({
      used_Letters: updatedUsedLetters,    // Updates Letters Used by the Player
      Word_Display: updatedWordDisplay,    // Updates Word Display of the Secret Word
      lives_Left: newLives                 // Updates the amount of lives the player has left
    });
  }

  render() {
    return (
      <div>
        <img src={pics[this.state.lives_Left]} alt="Hangman" />
        <button onClick={this.startNewGame}>New Game</button>

        {/* Displaying the word with blanks and revealed letters */}
        <p>Secret Word: {this.state.Word_Display.join(' ')}</p>

        <SingleLetterSearchbar onSearch={this.handleGuesses} />

        {/* Display guessed letters in their own LetterBox*/}
        <div style={{ display: 'flex', gap: '5px', marginTop: '10px' }}>
          {this.state.used_Letters.map((letter, index) => (
            <LetterBox
              key={index}
              letter={letter}
              isVisible={true}
              boxStyle={{ backgroundColor: 'lightblue', padding: '10px', borderRadius: '5px' }}
              letterStyle={{ color: 'white', fontSize: '30px', fontWeight: 'bold' }}
            />
          ))}
        </div>

          {/* Display Lives Used */}
        <p>Lives Used: {this.state.lives_Left}</p>
      </div>
    );
  }
}

export default HangmanGame;

