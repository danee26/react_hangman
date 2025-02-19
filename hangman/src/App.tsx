import { useState } from 'react'
import './App.css'
import AlphabetButtons from './Buttons';

function App() {

 const [randomWord, setRandomWord] = useState("Hangman");
 const [titleString, setTitleString] = useState("Welcome To Hangman!");
 const [correctLetters, setWordReveal] = useState("X".repeat(randomWord.length));
 const [lettersRemaining, setLettersRemaining] = useState(randomWord.length);
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
    console.log(word);

    setRandomWord(word);
    setWordReveal(updateWordReveal())
    setLives(10);
    setTitleString("Welcome To Hangman!");
    setLettersRemaining(randomWord.length);
  };

  return (
    <>
    <h1 style={{ width: "400px", textAlign: "center", wordWrap: "break-word", overflowWrap: "break-word" }}>{titleString}</h1>
    <button type="button" onClick={handleClick}>Generate New Word</button>
    <p>Press a letter below to guess!</p>
   <AlphabetButtons onLetterClick={CheckGuess}/>
   <p>Lives Remaining - {livesRemaining}</p>
    <h2>{correctLetters}</h2>
    <p>{lettersRemaining} letters remaining.</p>
    </>
  )

  function CheckGuess(guessLetter: string): void{

    const normalizedWord = randomWord.toLowerCase();
    const normalizedGuess = guessLetter.toLowerCase();

    if(livesRemaining <= 0){
      setTitleString("You Lose! Try Again...");
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
    //I need to track correct letters here incase the same letter covers more than 1 letter in the random word.
    let correctLetterCount = 0;
    const newWord = randomWord
      .split("")
      .map((char, index) => {
        if (char.toLowerCase() === letter.toLowerCase()) {
          correctLetterCount++;
          return char;
        }
        return prevWord[index];
      })
      .join("");
      setLettersRemaining(lettersRemaining - correctLetterCount)
  return newWord;
  });
}

}





export default App;
