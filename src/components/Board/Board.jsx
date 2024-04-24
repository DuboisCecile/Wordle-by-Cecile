import BoardSquare from './BoardSquare';

export default function Board({ board }) {
  return (
    <div className="grid-flow-rows grid grid-cols-5 gap-2">
      {board.map((row, i) => {
        return row?.map((cell, j) => {
          return <BoardSquare key={`${i}-${j}`} line={i} column={j} cell={cell} />;
        });
      })}
    </div>
  );
}
