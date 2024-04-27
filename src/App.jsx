import { useState, useEffect, useCallback, useRef } from 'react';
import './App.css';
import Board from './components/Board/Board';
import KeyBoard from './components/Keyboard/KeyBoard';
import { WORDS, KEYS } from './assets/words';
import { Particles, initParticlesEngine } from '@tsparticles/react';
import { loadFireworksPreset } from '@tsparticles/preset-fireworks';
import MissingCharactersModal from './components/Modal/MissingCharactersModal';
import WinnerModal from './components/Modal/WinnerModal';
import GameOverModal from './components/Modal/GameOverModal';
import particlesCustomizedOptions from './assets/particlesCustomizedOptions.json';

function App() {
  const [board, setBoard] = useState([...Array(6)].map(() => [...Array(5)]));
  const [tries, setTries] = useState({ row: 0, column: 0 });
  const [winOrLose, setWinOrLose] = useState('');
  const [initParticles, setInitParticles] = useState(false);
  const [missing, setMissing] = useState(false);
  const [chosenWord, setChosenWord] = useState(
    WORDS[Math.floor(Math.random() * WORDS.length)].split('').map((n) => n.toUpperCase())
  );
  const containerRef = useRef(null);

  const handleClickEnter = useCallback(() => {
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

      if (wordToCheck.map((letter) => letter.value).join('') === chosenWord.join('')) {
        setWinOrLose('win');
        return;
      }

      if (tries.row === 5) {
        setTries({ row: 0, column: 0 });
        setWinOrLose('lose');
      } else {
        setTries((prevTries) => {
          const newTries = { column: 0, row: prevTries.row + 1 };
          return newTries;
        });
      }
    }
  }, [tries, board]);

  const handleKey = useCallback(
    // can be used either by key press, or by clicking on the keyboard
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
        if (tries.column < 5 && winOrLose === '') {
          setMissing(true);
        } else {
          handleClickEnter();
        }
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
    // this should be run only once per application lifetime
    initParticlesEngine(async (engine) => {
      await loadFireworksPreset(engine);
    }).then(() => {
      setInitParticles(true);
    });
  }, []);

  useEffect(() => {
    console.log('Mot choisi (pour tests !) : ', chosenWord.join(''));
  }, [chosenWord]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
      containerRef.current?.destroy();
    };
  }, [handleKeydown]);

  const particlesLoaded = useCallback(async (container) => {
    containerRef.current = container;
  }, []);

  const handleRestart = () => {
    containerRef.current?.destroy();
    setWinOrLose('');
    setTries({ row: 0, column: 0 });
    setChosenWord(WORDS[Math.floor(Math.random() * WORDS.length)].split('').map((n) => n.toUpperCase()));
    setBoard(() => [...Array(6)].map(() => [...Array(5)]));
  };

  const onMissingCharactersModalClose = () => {
    setMissing(false);
  };

  const onGameOverModalClose = () => {
    containerRef.current?.destroy();
    setWinOrLose('');
  };

  const onWinnerModalClose = () => {
    containerRef.current?.destroy();
    setWinOrLose('');
  };

  return (
    <div>
      <div className="flex h-screen w-full flex-col items-center gap-2 bg-slate-700">
        <h1 className="text-2xl font-extrabold text-white">Wordle by Cécile</h1>
        <Board board={board} tries={tries} />
        <KeyBoard board={board} handleKey={handleKey} />
      </div>
      {initParticles && winOrLose === 'win' ? (
        <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={particlesCustomizedOptions} />
      ) : null}
      {winOrLose === 'win' && (
        <WinnerModal
          handleRestart={handleRestart}
          tries={tries}
          chosenWord={chosenWord}
          setWinOrLose={setWinOrLose}
          onClose={onWinnerModalClose}
        />
      )}
      {winOrLose === 'lose' && <GameOverModal handleRestart={handleRestart} onClose={onGameOverModalClose} />}
      {missing && winOrLose === '' && <MissingCharactersModal onClose={onMissingCharactersModalClose} />}
    </div>
  );
}

export default App;
