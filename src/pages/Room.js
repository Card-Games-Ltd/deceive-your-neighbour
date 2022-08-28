import React, {useEffect, useState} from 'react';
import './Room.css'
import {useParams, useSearchParams} from "react-router-dom";
import Player from '../components/Player';
import GamePanel from '../components/GamePanel';
import {getPlayerPosition} from "../modules/PlayerPosition";

export default function Room({ user }) {
    const startGameIn = 10 * 1000; // 10 secs;

    const [searchParams] = useSearchParams();
    const { id } = useParams();

    const [room, setRoom] = useState(null);
    const [game, setGame] = useState(null);
    const [players, setPlayers] = useState([]);
    const [arePlayersSorted, setArePlayersSorted] = useState(false);

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
    
    useEffect(() => {
        if (room) {
            sortPlayers(room);
            if (!room.game) {
                setTimeout(async () => {
                    await startGame(room.hash);
                }, startGameIn);
            } else {
                setGame(room.game);
            }
        }
    }, [room, startGameIn]);

    const sortPlayers = (room) => {
        if (!arePlayersSorted) {
            const myPlayer = room.players.find(item => item.id === user.id);
            const k = room.players.indexOf(myPlayer);
            setPlayers(room.players.splice(k).concat(room.players));
            setArePlayersSorted(true);
        }
    }

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

                {players.map((item, index) => (
                    index ? <Player key={index} position={getPlayerPosition(players, index)} player={item} /> :  '' 
                ))}
            </div>

            <GamePanel {...user}/>

        </div>
    );
}