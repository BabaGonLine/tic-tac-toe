export default function Log({ turns }) {
  return (
    <ol id="log">
      {turns.map((turn) => (
        <li key={`${turn.squre.row}${turn.squre.col}`}>
          Player: {turn.player}, Play: {turn.squre.row} / {turn.squre.col}
        </li>
      ))}
    </ol>
  );
}
