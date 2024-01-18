import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./components/winning-combinations.JS";
import GameOver from "./components/GameOver";

const PLAYERS = { X: "player1", O: "player2" };

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTerns) {
  let currentPlayer = "X";
  if (gameTerns.length > 0 && gameTerns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function derivedWinner(gameBoard, players) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquereSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquereSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquereSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquereSymbol && firstSquereSymbol === secondSquereSymbol && firstSquereSymbol === thirdSquereSymbol) {
      winner = players[firstSquereSymbol];
    }
  }
  return winner;
}

function derivedGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];
  for (const turn of gameTurns) {
    const { squre, player } = turn;
    const { row, col } = squre;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = derivedGameBoard(gameTurns);
  const winner = derivedWinner(gameBoard, players);
  const hasDrew = gameTurns.length === 9 && !winner;

  function handleRestart() {
    setGameTurns([]);
  }

  function handleSquereClick(rowIndex, ColIndex) {
    setGameTurns((prevTurn) => {
      const currentPlayer = deriveActivePlayer(prevTurn);
      const updateTurns = [{ squre: { row: rowIndex, col: ColIndex }, player: currentPlayer }, ...prevTurn];
      return updateTurns;
    });
  }

  function handlePlayerNameChange(symbol, playerName) {
    setPlayers((prevplayers) => {
      return { ...prevplayers, [symbol]: playerName };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initalName={PLAYERS.X} symbol="X" isActive={activePlayer === "X"} onChangeName={handlePlayerNameChange} />
          <Player initalName={PLAYERS.O} symbol="O" isActive={activePlayer === "O"} onChangeName={handlePlayerNameChange} />
        </ol>
        {(winner || hasDrew) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard board={gameBoard} onSquereClick={handleSquereClick} />
      </div>
      log
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
