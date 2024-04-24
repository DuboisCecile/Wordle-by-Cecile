export default function BoardSquare({ cell, line, column, status }) {
    return (
        <div
            className={`flex justify-center items-center text-white text-lg border border-white h-12 w-12 rounded-md font-bold ${
                status || ''
            }`}
            id={`cell-${line}-${column}`}
        >
            {cell?.value}
        </div>
    );
}
