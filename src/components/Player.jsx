import {useState} from "react";

export default function Player({initialName, symbol, isActive, onChangeName}) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);

    function handleIsEditing() {
        setIsEditing((prevState) => !prevState);
        if (isEditing) {
            onChangeName(symbol, playerName);
        }
    }

    function handleNameChange(event) {
        setPlayerName(event.target.value);
    }

    const editablePlayerName = isEditing ? (
        <input
            type="text"
            defaultValue={initialName}
            value={playerName}
            required
            className="player-name-input"
            onChange={handleNameChange}
        />
    ) : (
        <span className={'player-name'}>{playerName}</span>
    );
    return (
        <li className={isActive? 'active' : ''}>
            <span className={'player'}>
                {editablePlayerName}
                <span className={'player-symbol'}>{symbol}</span>
            </span>
            <button onClick={handleIsEditing}>
                {isEditing ? 'Save': 'Edit'}
            </button>
        </li>
    );
}
