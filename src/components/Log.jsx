export default function Log({turns}) {
    return (
        <ol id="log">
            {turns.toReversed().map((turn, index) =>
               <li key={`${turn.square.row} - ${turn.square.col} - ${index}`}>
                   {turn.symbol} selected row {turn.square.row + 1}, col {turn.square.col + 1}
               </li>
            )}
        </ol>
    );
}
