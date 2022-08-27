import React from 'react';
import './Room.css'

export default function Room() {
    return (
        <div className='container'>

            <div className='navbar'>
                <div className='navbar-info'>
                    <div>Пятерки</div>
                    <div>Карт на столе: 12</div>
                </div>
                <div className='navbar-info'>
                    <div>своя игра томаса шелби</div>
                    <div>Пароль: 4323</div>
                </div>
            </div>

            <div className='game-main'>
            <div className='player' playerid = '2'>
                <div className='table'></div>
                <div className='player-avatar'>Никита</div>
                <div className='player-cards' attention='PLACEHOLDER'></div>
                <div className='cards-left'>3</div>
            </div>

            {/* /* <div className='table table-right'></div>
            <div className='table table-top' optional = 'true'></div> */}

            </div>

            <div className='game-bottom-panel'>
            <button className='rules-button'>?</button>
                <div className='buttons-container'>
                    <button className='game-button green'>Верю</button>
                    <button className='game-button'>Проверить</button>
                </div>
                
            </div>
        </div>
    );
}