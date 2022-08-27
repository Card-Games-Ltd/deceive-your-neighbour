import React from 'react';
import "./GameAvailable.css";

export default function GameAvailable(props) {
    const gameName = "Игра томаса шелби";
    const playersTotal = 3;
    const playersInRoom = 2;
    return (
        <div className='game-container' onClick={props.onClick}>
            <div className='game-name'>{gameName}</div>
            <div className='players-count'>{playersInRoom}/{playersTotal}</div>
        </div>
    )
}
