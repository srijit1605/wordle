import { createContext, useEffect, useState } from "react";
import "./App.css";
import GameOver from "./Component/Gameover/GameOver";
import Keyboard from "./Component/Keyboard/Keyboard";
import { boardDefault, createWordSet } from "./Component/Word";
import Wordgrid from "./Component/Wordgrid/Wordgrid";

export const AppContext = createContext();

function App() {
  const [game, setGame] = useState(boardDefault);
  const [currentAttempt, setCurrentAttempt] = useState({
    attempt: 0,
    letterpos: 0,
  });
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [goodLetters, setGoodLetters] = useState([]);
  const [almostLetters, setAlmostLetters] = useState([]);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });
  const [correctWord, setCorrectWord] = useState("");

  useEffect(() => {
    createWordSet().then((word) => {
      setWordSet(word.wordSet);
      setCorrectWord(
        [...word.wordSet][
          Math.floor(Math.random() * word.wordSet.size)
        ].toUpperCase()
      );
    });
  }, []);

  console.log(correctWord);

  const onSelectLetter = (value) => {
    if (currentAttempt.letterpos > 4) return;
    const currentBoard = [...game];
    currentBoard[currentAttempt.attempt][currentAttempt.letterpos] = value;
    setGame(currentBoard);
    setCurrentAttempt({
      ...currentAttempt,
      letterpos: currentAttempt.letterpos + 1,
    });
  };

  const onDelete = () => {
    if (currentAttempt.letterpos === 0) return;
    const currentBoard = [...game];
    currentBoard[currentAttempt.attempt][currentAttempt.letterpos - 1] = "";
    setGame(currentBoard);
    setCurrentAttempt({
      ...currentAttempt,
      letterpos: currentAttempt.letterpos - 1,
    });
  };

  const onEnter = () => {
    let currentWord = game[currentAttempt.attempt].join("");
    if (currentAttempt.letterpos !== 5) return;
    if (!wordSet.has(currentWord.toLowerCase())) {
      alert("word not found");
      return;
    }

    setCurrentAttempt({ attempt: currentAttempt.attempt + 1, letterpos: 0 });

    if (currentWord === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true });
      return;
    }

    if (currentAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
    }
  };
  return (
    <div className="App">
      <nav>
        <h1>WORDLE</h1>
      </nav>
      <AppContext.Provider
        value={{
          game,
          setGame,
          currentAttempt,
          setCurrentAttempt,
          onSelectLetter,
          onDelete,
          onEnter,
          correctWord,
          disabledLetters,
          setDisabledLetters,
          goodLetters,
          setGoodLetters,
          gameOver,
          setGameOver,
          almostLetters,
          setAlmostLetters,
        }}
      >
        <Wordgrid />
        {gameOver.gameOver ? <GameOver /> : <Keyboard />}
      </AppContext.Provider>
      <div style={{position: 'absolute', bottom: '0', right: '10px'}}>This site was made by <a href={'https://srijit.vercel.app/'}>Srijit</a></div>
    </div>
  );
}

export default App;
