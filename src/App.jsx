import { useState, useEffect, useCallback } from 'react';
import './App.css';
import Board from './components/Board/Board';
import KeyBoard from './components/Keyboard/KeyBoard';
import { WORDS, KEYS } from './assets/words';
import { Particles, initParticlesEngine } from '@tsparticles/react';
import { loadFireworksPreset } from '@tsparticles/preset-fireworks';
import MissingCharactersModal from './components/Modal/MissingCharactersModal';

const chosenWord = WORDS[Math.floor(Math.random() * WORDS.length)].split('').map((n) => n.toUpperCase());
console.log(chosenWord.join(''));

function App() {
  const [board, setBoard] = useState([...Array(6)].map(() => [...Array(5)]));
  const [tries, setTries] = useState({ row: 0, column: 0 });
  const [winOrLose, setWinOrLose] = useState('');
  const [init, setInit] = useState(false);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFireworksPreset(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesOptions = {
    preset: 'fireworks',
    emitters: {
      autoPlay: true,
      fill: true,
      life: {
        wait: false,
        count: 30,
        delay: 0.1,
        duration: 0.1
      },
      rate: {
        quantity: 1,
        delay: 0.15
      },
      shape: {
        options: {},
        replace: {
          color: false,
          opacity: false
        },
        type: 'square'
      },
      startCount: 0,
      size: {
        mode: 'percent',
        height: 0,
        width: 100
      },
      direction: 'top',
      particles: {},
      position: {
        x: 50,
        y: 100
      }
    }
  };

  const handleKey = useCallback(
    (value) => {
      if (value === 'Backspace') {
        if (tries.column === 0) return;
        setTries((prevTries) => ({ column: prevTries.column - 1, row: prevTries.row }));
        setBoard((prevBoard) => {
          const newBoard = [...prevBoard];
          newBoard[tries.row][tries.column - 1] = null;
          return newBoard;
        });
        return;
      }
      if (value === 'Enter') {
        if (tries.column < 5) {
          setMissing(true);
        }
        return;
      }
      if (tries.column > 4 || !KEYS.map((key) => key.id).includes(value.toUpperCase())) return;
      setBoard((prevBoard) => {
        const newBoard = [...prevBoard];
        newBoard[tries.row][tries.column] = { value: value.toUpperCase() };
        return newBoard;
      });
      setTries((prevTries) => ({ column: prevTries.column + 1, row: prevTries.row }));
    },
    [tries]
  );

  const handleKeydown = useCallback(
    (event) => {
      handleKey(event.key);
    },
    [handleKey]
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
      setBoard(() => [...Array(6)].map(() => [...Array(5)]));
    } else if (winOrLose === 'lose') {
      alert('You Lose!');
      setBoard(() => [...Array(6)].map(() => [...Array(5)]));
    }
  }, [winOrLose]);

  return (
    <div id="root">
      <div className="flex w-full flex-col items-center gap-2 bg-slate-700">
        {/* h-screen */}
        <Board board={board} />
        <KeyBoard board={board} handleKey={handleKey} />
      </div>
      {init && winOrLose === 'win' && <Particles id="tsparticles" options={particlesOptions} />}
      {['win', 'lose'].includes(winOrLose) && (
        <div className="flex w-full flex-col items-center gap-2 bg-slate-700">
          <button
            className="relative z-10 flex items-center justify-center rounded-md bg-green-800 p-2 font-bold text-white"
            onClick={() => {
              setWinOrLose('');
              setInit(false);
            }}
          >
            Start again
          </button>
        </div>
      )}
      {missing && <MissingCharactersModal setMissing={setMissing} />}
    </div>
  );
}

export default App;
