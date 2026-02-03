import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import {useState} from "react";
import Log from "./components/Log.jsx";
import {WINNING_COMBINATIONS} from "./wining-combinations.js";
import GameOver from "./components/GameOver.jsx";

const INITIAL_GAMEBOARD = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
];

const PLAYERS = {
    X: 'Player 1',
    O: 'Player 2'
};

function findWinner(gameBoard, players) {
    let winner = '';

    for (const combination of WINNING_COMBINATIONS) {
        const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
        const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
        const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
        if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
            winner = players[firstSquareSymbol];
        }
    }

    return winner;
}

function buildGameBoard(initialGameBoard, gameTurns) {
    const board = [...initialGameBoard.map((row => [...row]))];
    for (const turn of gameTurns) {
        const {square, symbol} = turn;
        const {row, col} = square;
        board[row][col] = symbol;
    }
    return board;
}
function getCurrentSymbol(gameTurns) {
    let currentSymbol = 'X';
    if (gameTurns.length > 0) {
        const lastTurn = gameTurns[gameTurns.length - 1];
        currentSymbol = lastTurn.symbol === 'X' ? 'O' : 'X';
    }
    return currentSymbol;
}

function App() {
    const [gameTurns, setGameTurns] = useState([]);
    const currentPlayer = getCurrentSymbol(gameTurns);
    const [players, setPlayers] = useState(PLAYERS);

    const gameBoard = buildGameBoard(INITIAL_GAMEBOARD, gameTurns)

    const winner = findWinner(gameBoard, players);

    const isDraw = gameTurns.length === 9 && !winner;

    function handleSelectCell(rowIndex, colIndex) {
        setGameTurns((prevTurns) => {
            return [...prevTurns, {square: {row: rowIndex, col: colIndex}, symbol: getCurrentSymbol(prevTurns)}];
        })
    }
    function handleResetGame() {
        setGameTurns([]);
    }

    function handlePlayerNameChange(symbol, newName) {
        setPlayers((prevPlayers) => {
            return {...prevPlayers, [symbol]: newName};
        });
    }
    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player initialName={PLAYERS.X} symbol={'X'} isActive={currentPlayer ==='X'} onChangeName={handlePlayerNameChange}/>
                    <Player initialName={PLAYERS.O} symbol={'O'}  isActive={currentPlayer ==='O'} onChangeName={handlePlayerNameChange}/>
                </ol>
                {(winner || isDraw) && <GameOver winner={winner} onRestart={handleResetGame}/>}
                <GameBoard onSelectCell={handleSelectCell} board={gameBoard} />
            </div>
            <Log turns={gameTurns} />
        </main>
    )
}

export default App
