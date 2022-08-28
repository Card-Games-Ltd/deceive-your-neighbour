import React, {useEffect, useState} from 'react';
import './Room.css'
import {useParams, useSearchParams} from "react-router-dom";
import Player from '../components/Player';

export default function Room({ user }) {
    const startGameIn = 10 * 1000; // 10 secs;

    const [searchParams] = useSearchParams();
    const { id } = useParams();

    const [room, setRoom] = useState(null);
    const [game, setGame] = useState(null);

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

        // if (room) {
        // let players = room.players;
        // let me = players.find(item => item.id === user.id);
        // let k = players.indexOf(me);
        // console.log(k);
        // players=players.splice(k).concat(players);
        // console.log(players);    
        // }
 


    
    useEffect(() => {
        if (room) {
            if (!room.game) {
                setTimeout(async () => {
                    await startGame(room.hash);
                }, startGameIn);
            } else {
                setGame(room.game);
            }
        }
    }, [room]);

    const startGame = async (roomId) => {
        const response = await fetch(process.env.REACT_APP_API_PREFIX + `/api/rooms/${roomId}/games`, {
            method: 'POST'
        });
        const data = await response.json();
        console.log(data);
        setGame(data);
    }

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

                {!game && <div className='waitNote'>Ждем всех игроков...</div>}

                <Player player ='player-left'
                        playerAvatar = 'player-avatar-left'
                        playerCards = 'player-cards-left'
                    />
                <Player player ='player-top'
                        playerAvatar = 'player-avatar-top'
                        playerCards = 'player-cards-top'
                        cardsLeft = 'cards-left-top'
                    />
                <Player player ='player-right'
                        playerAvatar = 'player-avatar-right'
                        playerCards = 'player-cards-right'
                        cardsLeft = 'cards-left-right'
                    />
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