import React from 'react';
import "./GameAvailable.css";

export default function GameAvailable() {
    const gameName = "Игра томаса шелби";
    const playersTotal = 3;
    const playersInRoom = 2;
    return (
        <div className='game-container'>
            <div className='game-name'>{gameName}</div>
            <div className='players-count'>{playersInRoom}/{playersTotal}</div>
        </div>
    )
}
