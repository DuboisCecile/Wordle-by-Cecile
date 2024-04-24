import { useState, useEffect } from 'react';
import './App.css';
import Board from './components/Board/Board';
import KeyBoard from './components/Keyboard/KeyBoard';
import { WORDS } from './assets/words';

const BASE_BOARD = JSON.parse(
  JSON.stringify([...Array(6)].fill([...Array(5)])) // with fill, there has only been one row, which had internally been referenced six times. So when I changed the first index in "the second" row, it effectively changed all rows. use JSON.parse(JSON.stringify([...Array(6)].map(() => [...Array(5)])) instead
);

function App() {
  const [board, setBoard] = useState(BASE_BOARD);
  const [tries, setTries] = useState({ row: 0, column: 0 });

  console.log({ board, tries });
  const chosenWord = WORDS[Math.floor(Math.random() * WORDS.length)].split('').map((n) => n.toUpperCase());

  useEffect(() => {
    if (tries.column > 4) {
      console.log('tries.column > 4');
    }
  }, [tries]);
  return (
    <div className="flex w-full flex-col items-center gap-2 bg-slate-700">
      {/* h-screen */}
      <Board board={board} chosenWord={chosenWord} />
      <KeyBoard chosenWord={chosenWord} setBoard={setBoard} setTries={setTries} tries={tries} />
    </div>
  );
}

export default App;
