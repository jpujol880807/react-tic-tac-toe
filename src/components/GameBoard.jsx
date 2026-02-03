export default function GameBoard({onSelectCell, board}) {
    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => (
                <li key={rowIndex} className="game-row">
                    <ol>
                        {row.map((cell, colIndex) => (
                            <li key={colIndex}>
                                <button className="game-cell" onClick={()=>onSelectCell(rowIndex, colIndex)} disabled={!!cell}>
                                    {cell}
                                </button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}
