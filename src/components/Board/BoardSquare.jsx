export default function BoardSquare({ cell, line, column }) {
  let currentStatus = '';
  if (cell?.status === 'perfect') {
    currentStatus = 'perfect';
  } else if (cell?.status === 'correct') {
    currentStatus = 'correct';
  } else if (cell?.status === 'wrong') {
    currentStatus = 'wrong';
  }

  return (
    <div
      className={`flip-vertical-right flex h-12 w-12 items-center justify-center rounded-md border border-white text-lg font-bold text-white ${currentStatus}`}
      id={`cell-${line}-${column}`}
      key={currentStatus}
    >
      {cell?.value}
    </div>
  );
}
