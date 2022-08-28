import React from 'react';
import "./Player.css";

export default function Player(props) {
    return (
        <div className = {`player ${props.player}`} playerid='2'>
            <div className='table'></div>
            <div className={`player-avatar ${props.playerAvatar}`}></div>
            <div className={`player-cards ${props.playerCards}`} attention='PLACEHOLDER'></div>
            <div className={`cards-left ${props.cardsLeft}`}>3</div>
        </div>
    )
}

