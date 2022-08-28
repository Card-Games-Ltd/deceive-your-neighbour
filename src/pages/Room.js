import React, {useEffect, useState} from 'react';
import './Room.css'
import {useParams, useSearchParams} from "react-router-dom";

export default function Room({ user }) {
    const [searchParams] = useSearchParams();
    const { id } = useParams();

    const [room, setRoom] = useState(null);

    useEffect(() => {
        if (!room) {
            fetch(process.env.REACT_APP_API_PREFIX + `/api/rooms/${id}?password=${searchParams.get("password")}`)
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
                <div className='player' playerid='2'>
                    <div className='table'></div>
                    <div className='player-avatar'>{user.name}</div>
                    <div className='player-cards' attention='PLACEHOLDER'></div>
                    <div className='cards-left'>3</div>
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