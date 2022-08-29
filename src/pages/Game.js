import React from 'react';
import "./Game.css";
import Player from '../components/Player';
import GamePanel from '../components/GamePanel';
import {getPlayerPosition} from "../modules/PlayerPosition";

export default function() {
    return (
        <div className='container'>

        <div className='navbar'>
            <div className='navbar-info'>
                <div>Пятерки</div>
                <div>Карт на столе: 12</div>
            </div>
            <div className='navbar-info'>
                <div>{room && room.name}</div>
                {searchParams.password && <div>Пароль: {searchParams.password}</div>}
            </div>
        </div>

        <div className='game-main'>

            {players.map((item, index) => (
                index ? <Player key={index} position={getPlayerPosition(players, index)} player={item} /> :  '' 
            ))}
        </div>

        <GamePanel/>

    </div>
    )
}