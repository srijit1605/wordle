import React, { useContext } from 'react'
import { AppContext } from '../../App'
import './GameOver.css'

function GameOver() {
    const {gameOver, setGameOver, correctWord} = useContext (AppContext)
  return (
    <div className='gameover'>
        <h3>{gameOver.guessedWord ? "You Guessed Correct": "Maximum attempt reached"}</h3>
        <h1>{gameOver.guessedWord ? "": "Correct word is: "+ correctWord}</h1>
    </div>
  )
}

export default GameOver