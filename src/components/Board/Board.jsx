import BoardSquare from './BoardSquare';

export default function Board({ board }) {
  return (
    <div className="grid-flow-rows grid grid-cols-5 gap-2">
      {board.map((row, rowIndex) => {
        return row?.map((cell, colIndex) => {
          return <BoardSquare key={`${rowIndex}-${colIndex}`} line={rowIndex} column={colIndex} cell={cell} />;
        });
      })}
    </div>
  );
}
