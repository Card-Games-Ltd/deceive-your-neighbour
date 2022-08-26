import React from 'react';
import './Join.css';
import GameAvailable from "../components/GameAvailable";
import headerImg from "../textures/header.png";

export default function Create() {
    return (
        <div className='join-main'> 
             <img src={headerImg} className='join-header' alt='header'></img>
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