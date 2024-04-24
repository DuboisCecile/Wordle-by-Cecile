import { useRef } from 'react';

export default function KeyboardSquare({ children, setBoard, setTries, tries }) {
  const keyRef = useRef(null);
  const onClick = () => {
    if (tries.column > 4) return;
    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      newBoard[tries.row][tries.column] = { value: keyRef.current.value };
      return newBoard;
    });
    setTries((prevTries) => {
      const { column, row } = prevTries;
      const newTries = { column: column + 1, row };
      return newTries;
    });
  };

  return (
    <button
      className="group relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-md bg-gray-800 font-bold tracking-tighter text-white"
      onClick={onClick}
      ref={keyRef}
      value={children}
    >
      <span className="absolute h-0 w-0 rounded-full bg-cyan-400 transition-all duration-500 ease-out group-hover:h-56 group-hover:w-56"></span>
      <span className="absolute inset-0 -mt-1 h-full w-full rounded-lg bg-gradient-to-b from-transparent via-transparent to-gray-700 opacity-30"></span>
      <span className="relative">{children}</span>
    </button>
  );
}
