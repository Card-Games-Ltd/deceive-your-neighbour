import React, {useEffect, useState} from 'react';
import './Room.css'
import {useParams, useSearchParams} from "react-router-dom";

export default function Room({ user }) {
    const [searchParams] = useSearchParams();
    const { id } = useParams();

    const [room, setRoom] = useState(null);

    const [gameStarted, setGameStarted] = useState(false);

    useEffect(() => {
        if (!room) {
            fetch(
                process.env.REACT_APP_API_PREFIX +
                `/api/rooms/${id}?password=${searchParams.get("password")}&session_token=${user.session_token}`
            )
                .then(response => response.json())
                .then(data => {
                    setRoom(data);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, []);

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

                {!gameStarted ? 
                <div className='waitNote'>Ждем всех игроков...</div> 
                : ''}

                <div className='player player-left' playerid='2'>
                    <div className='table'></div>
                    <div className='player-avatar player-avatar-left'>{user.name}</div>
                    <div className='player-cards player-cards-left' attention='PLACEHOLDER'></div>
                    <div className='cards-left'>3</div>
                </div>
                <div className='player player-top' playerid='3'>
                    <div className='table'></div>
                    <div className='player-avatar player-avatar-top'>{user.name}</div>
                    <div className='player-cards player-cards-top' attention='PLACEHOLDER'></div>
                    <div className='cards-left cards-left-top'>3</div>
                </div>
                <div className='player player-right' playerid='4'>
                    <div className='table'></div>
                    <div className='player-avatar player-avatar-right'>{user.name}</div>
                    <div className='player-cards player-cards-right' attention='PLACEHOLDER'></div>
                    <div className='cards-left cards-left-right'>3</div>
                </div>

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