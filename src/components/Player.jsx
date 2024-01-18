import { useState } from "react";

export default function Player({ initalName, symbol, isActive, onChangeName }) {
  const [playername, setPlayerName] = useState(initalName);
  const [isEditing, setIsEditing] = useState(false);

  function handleChange(e) {
    setPlayerName(e.target.value);
  }

  const handleEditClick = () => {
    setIsEditing((editing) => !editing);
    if (isEditing) {
      onChangeName(symbol, playername);
    }
  };

  let playerNameField = isEditing ? <input type="text" value={playername} onChange={handleChange} /> : <span className="player-name">{playername}</span>;

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {/* <span className="player-name">{name}</span> */}
        {playerNameField}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
