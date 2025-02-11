import { useState } from 'react'
import './App.css'

function App() {

 const [randomWord, setRandomWord] = useState("Hangman");




  return (
    <>
    <h1>Welcome To Hangman!</h1>
    <button type="button" onClick={()=>setRandomWord(GenerateWord())}></button>
    <p>Your word has {randomWord.length} letters.</p>
    <p>Press a letter below to guess!</p>
    <ul>
      <button>A</button>
      <button>B</button>
      <button>C</button>
      <button>D</button>
      <button>E</button>
      <button>F</button>
      <button>G</button>
      <button>H</button>
      <button>I</button>
      <button>J</button>
      <button>K</button>
      <button>L</button>
      <button>M</button>
      <button>N</button>
      <button>O</button>
      <button>P</button>
      <button>Q</button>
      <button>R</button>
      <button>S</button>
      <button>T</button>
      <button>U</button>
      <button>V</button>
      <button>W</button>
      <button>X</button>
      <button>Y</button>
      <button>Z</button>
    </ul>
    <h2>SAUSAGE</h2>
    </>
  )
}

function GenerateWord(): string {
 const url = "https://random-word-api.vercel.app/api?words=1";

 fetch(url)
 .then((response) => {
   return response.json();
 })
 .then((data) => {
  console.log(data[0]);
  return data[0];
 })

 return "ERROR";
 
}

export default App
