import React from 'react';
import './Welcome.css';

export default function Welcome() {
    return (
        <div className='welcome-main'>

            <div className='welcome-content'>
            <div className='welcome-header'></div>
                <div className='avatar'></div>
                <input className='name-input' type='text' placeholder='Темоха'></input>
                <button>Создать игру</button>
                <button>Вступить в игру</button>
            </div>
            <div className='service-buttons-container'>
                <button className='service-button'>L</button>
                <button className='service-button'>?</button>
            </div>
        </div>
    )
}