import { useState } from 'react'
import './App.css'
import AlphabetButtons from './Buttons';

function App() {

 const [randomWord, setRandomWord] = useState("Hangman");
 const [correctLetters, setWordReveal] = useState("X".repeat(randomWord.length));
 const [livesRemaining, setLives] = useState(10);


 async function GenerateWord(): Promise<string> {
  const url = "https://random-word-api.vercel.app/api?words=1";

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error("Error fetching word:", error);
    return "ERROR";
  }
}
  const handleClick = async () => {
    const word = await GenerateWord();
    setWordReveal(updateWordReveal())
    setRandomWord(word);
    setLives(10);
  };

  return (
    <>
    <h1>Welcome To Hangman!</h1>
    <button type="button" onClick={handleClick}>Generate New Word</button>
    <p>Your word has {randomWord.length} letters.</p>
    <p>Press a letter below to guess!</p>
   <AlphabetButtons onLetterClick={CheckGuess}/>
   <p>Lives Remaining - {livesRemaining}</p>
    <h2>{correctLetters}</h2>
    </>
  )

  function CheckGuess(guessLetter: string): void{

    const normalizedWord = randomWord.toLowerCase();
    const normalizedGuess = guessLetter.toLowerCase();

    if(livesRemaining <= 0){
      return;
    }

    setLives(livesRemaining - 1);

    if (normalizedWord.indexOf(normalizedGuess) > -1) {
      console.log("That's a correct guess!");
      correctGuess(guessLetter);
      return;
    }

  console.log("wrong guess");
}

function updateWordReveal(): string {

   const tempString = "X".repeat(randomWord.length);

   return tempString;
}

// Updates the revealed word by replacing 'X's with correctly guessed letters
function correctGuess(letter: string) {
  setWordReveal((prevWord) => {
    return randomWord
      .split("")
      .map((char, index) => (char.toLowerCase() === letter.toLowerCase() ? char : prevWord[index]))
      .join("");
  });
}

}





export default App;
