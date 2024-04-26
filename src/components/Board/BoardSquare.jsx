export default function BoardSquare({ cell, line, column, tries }) {
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
      <div
        className={`${tries?.row === line && tries?.column === column ? ' h-8 w-6 border-b border-white animate-bounce' : ''} `}
      >
        {cell?.value}
      </div>
    </div>
  );
}
