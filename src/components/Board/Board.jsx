import BoardSquare from './BoardSquare';

export default function Board({ board, chosenWord }) {
    console.log(chosenWord);

    return (
        <div className='grid grid-cols-5 grid-flow-rows gap-2'>
            {board.map((row, i) => {
                return row?.map((cell, j) => {
                    return (
                        <BoardSquare
                            key={`${i}-${j}`}
                            line={i}
                            column={j}
                            cell={cell}
                        />
                    );
                });
            })}
        </div>
    );
}
