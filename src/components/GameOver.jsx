export default function GameOver({ winner, onRestart }) {
  return (
    <div id="game-over">
      <h2>Game Over</h2>
      {winner && <p>{winner} won!!!</p>}
      {!winner && <p>It&apos;s a drew!</p>}
      <button onClick={onRestart}>Start Over</button>
    </div>
  );
}
