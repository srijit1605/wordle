import React, {useContext, useEffect} from 'react'
import { AppContext } from '../../App'
import './Square.css'

function Square({letterPos, attemptNo}) {
  const {game, correctWord, currentAttempt, disabledLetters, setDisabledLetters, goodLetters, 
    setGoodLetters,almostLetters,setAlmostLetters} = useContext(AppContext);
  const letter = game [attemptNo] [letterPos]

  const right = correctWord[letterPos] === letter
  const ashwatthama = !right && letter !=="" && correctWord.includes(letter)
  const occuredMore = letter > (correctWord[letterPos] ? correctWord[letterPos] : 999);

  const letterState =
   currentAttempt.attempt > attemptNo &&
   ( right && !occuredMore? "right": ashwatthama && !occuredMore? "ashwatthama" : "wrong") ;
   

   useEffect(() => {
     if (letter !== "" && !right && !ashwatthama) {
      const temp = [...disabledLetters, letter]; 
      setDisabledLetters(temp)
     }else if (letter !== "" && right) {
       const gtemp = [...goodLetters, letter];
       setGoodLetters(gtemp);
     } else if (letter !== "" && !right &&ashwatthama) {
       const atemp = [...almostLetters, letter];
       setAlmostLetters(atemp);
     }
   }, [currentAttempt.attempt, game]);
  return (
    <div className='square' id={letterState}>{letter}</div>
  )
}

export default Square