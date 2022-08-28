import React from 'react';
import "./Player.css";

export default function Player({ player, position }) {
    return (
        <div className = {`player player-${position}`} playerid={position + 1}>
            <div className='table'></div>
            <img
                className={`player-avatar player-avatar-${position}`}
                src={player.avatar}
            ></img>
            <div
                className={`player-cards player-cards-${position}`}
                attention='PLACEHOLDER'
            >{player.name}</div>
            <div
                className={`cards-left cards-left-${position}`}
            >3</div>
        </div>
    )
}

