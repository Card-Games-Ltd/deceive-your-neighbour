import React from 'react';
import './Join.css';
import GameAvailable from "../components/GameAvailable";

export default function Create() {
    return (
        <div className='join-main'> 
            <div className='join-header'></div>
                <div className='join-list'>
                    <div className='list-header'>Присоединиться к игре</div>
                    <div className='games-container'>
                        <GameAvailable />
                        <GameAvailable />
                        <GameAvailable />
                    </div>
                </div>
        </div>

    )
}