import { useState, useEffect, useCallback } from 'react';
import './App.css';
import Board from './components/Board/Board';
import KeyBoard from './components/Keyboard/KeyBoard';
import { WORDS } from './assets/words';

const chosenWord = WORDS[Math.floor(Math.random() * WORDS.length)].split('').map((n) => n.toUpperCase());
console.log(chosenWord.join(''));

function App() {
  const [board, setBoard] = useState([...Array(6)].map(() => [...Array(5)]));
  const [tries, setTries] = useState({ row: 0, column: 0 });
  const [winOrLose, setWinOrLose] = useState('');

  const handleKeydown = useCallback(
    (event) => {
      if (tries.column > 4) return;
      setBoard((prevBoard) => {
        const newBoard = [...prevBoard];
        newBoard[tries.row][tries.column] = { value: event.key?.toUpperCase() };
        return newBoard;
      });
      setTries((prevTries) => {
        const { column, row } = prevTries;
        const newTries = { column: column + 1, row };
        return newTries;
      });
    },
    [tries]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [handleKeydown]);

  useEffect(() => {
    if (tries.column > 4) {
      const wordToCheck = [...board[tries.row]];
      for (let i = 0; i < wordToCheck.length; i++) {
        if (wordToCheck[i].value === chosenWord[i]) {
          wordToCheck[i].status = 'perfect';
        } else if (chosenWord.includes(wordToCheck[i].value)) {
          wordToCheck[i].status = 'correct';
        } else {
          wordToCheck[i].status = 'wrong';
        }
      }

      const newBoard = [...board];
      newBoard[tries.row] = [...wordToCheck];
      setBoard(() => newBoard);
      const lastTry = tries.row === 5;
      if (lastTry) setTries({ row: 0, column: 0 });
      else
        setTries((prevTries) => {
          const newTries = { column: 0, row: prevTries.row + 1 };
          return newTries;
        });

      if (wordToCheck.map((letter) => letter.value).join('') === chosenWord.join('')) {
        setWinOrLose('win');
        return;
      } else if (lastTry) {
        setWinOrLose('lose');
        return;
      }
    }
  }, [tries, board]);

  useEffect(() => {
    if (winOrLose === 'win') {
      alert('You Win!');
      setBoard(() => [...Array(6)].map(() => [...Array(5)]));
    } else if (winOrLose === 'lose') {
      alert('You Lose!');
      setBoard(() => [...Array(6)].map(() => [...Array(5)]));
    }
  }, [winOrLose]);

  return (
    <div className="flex w-full flex-col items-center gap-2 bg-slate-700">
      {/* h-screen */}
      <Board board={board} />
      <KeyBoard setBoard={setBoard} setTries={setTries} tries={tries} />
    </div>
  );
}

export default App;
