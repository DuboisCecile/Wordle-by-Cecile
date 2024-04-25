import { useRef } from 'react';

export default function KeyboardSquare({ id, children, handleKey, extraClass }) {
  const keyRef = useRef(null);

  const onClick = () => {
    const value = keyRef.current.id;
    handleKey(value);
  };

  return (
    <button
      className={`group relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-md bg-gray-800 font-bold tracking-tighter text-white ${extraClass}`}
      onClick={onClick}
      ref={keyRef}
      id={id}
    >
      <span className="absolute h-0 w-0 rounded-full bg-cyan-400 transition-all duration-500 ease-out group-hover:h-56 group-hover:w-56"></span>
      <span className="absolute inset-0 -mt-1 h-full w-full rounded-lg bg-gradient-to-b from-transparent via-transparent to-gray-700 opacity-30"></span>
      <span className="relative">{children}</span>
    </button>
  );
}
