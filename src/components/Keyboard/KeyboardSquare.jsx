export default function KeyboardSquare({
    children,
    setBoard,
    setTries,
    tries,
}) {
    const onClick = (e) => {
        if (tries.column > 4) return;
        setBoard((prevBoard) => {
            const newBoard = [...prevBoard];
            newBoard[tries.row][tries.column] = { value: e.target.id };
            return newBoard;
        });
        setTries((prevTries) => {
            const { column, row } = prevTries;
            console.log({ column, row });
            const newTries = { column: column + 1, row };
            return newTries;
        });
    };

    return (
        <button
            className={`flex justify-center items-center text-white text-lg border border-white h-12 w-12 rounded-md font-bold`}
            id={`${children}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
