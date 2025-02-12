import { useState } from 'react'
import './App.css'
import AlphabetButtons from './Buttons';

function App() {

 const [randomWord, setRandomWord] = useState("Hangman");

 async function GenerateWord(): Promise<string> {
  const url = "https://random-word-api.vercel.app/api?words=1";

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data[0]);
    return data[0];
  } catch (error) {
    console.error("Error fetching word:", error);
    return "ERROR";
  }
}
  const handleClick = async () => {
    const word = await GenerateWord();
    setRandomWord(word);
  };





  return (
    <>
    <h1>Welcome To Hangman!</h1>
    <button type="button" onClick={handleClick}></button>
    <p>Your word has {randomWord.length} letters.</p>
    <p>Press a letter below to guess!</p>
   <AlphabetButtons onLetterClick={CheckGuess}/>
    <h2>SAUSAGE</h2>
    </>
  )

  function CheckGuess(guessLetter: string): void{

    const normalizedWord = randomWord.toLowerCase();
    const normalizedGuess = guessLetter.toLowerCase();

    if (normalizedWord.indexOf(normalizedGuess) > -1) {
      console.log("That's a correct guess!");
      return;
    }

  console.log("wrong guess");
}
}



export default App;
