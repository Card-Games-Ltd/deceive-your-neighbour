import React, {createContext, useContext, useEffect, useState} from 'react';
import './Room.css'
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import Player from '../components/Player';
import {getPlayerPosition} from "../modules/PlayerPosition";
import {UserContext} from "../App";
import RoomPanel from "../components/RoomPanel";

export const RoomContext = createContext();

export default function Room() {
    const navigate = useNavigate();
    const user = useContext(UserContext);

    const [startGameIn, setStartGameIn] = useState(10); // 10 secs;

    const [searchParams] = useSearchParams();
    const { id } = useParams();

    const [hash, setHash] = useState("");
    const [name, setName] = useState("");
    const [host, setHost] = useState({});
    const [playersNumber, setPlayersNumber] = useState(3);
    const [players, setPlayers] = useState([]);
    const [isCounterGoingDown, setIsCounterGoingDown] = useState(false);

    useEffect(() => {
        if (!hash) { getRoom() }
    }, [hash])

    const getRoom = async () => {
        const response = await fetch(
            process.env.REACT_APP_API_PREFIX +
            `/api/rooms/${id}?password=${searchParams.get("password")}&session_token=${user.session_token}`
        );
        if (response.ok) {
            const data = await response.json();
            setHash(data.hash);
            setName(data.name);
            setHost(data.host);
            setPlayersNumber(data.players_number);
            setPlayers(sortPlayers(data.players));
            if (data.game) {
                navigate(`/rooms/${data.hash}/game?password=${searchParams.get("password")}`)
            }
        } else {
            console.error(response.errored);
        }
    }

    if (playersNumber === players.length && !isCounterGoingDown) {
        console.log(playersNumber);
        setIsCounterGoingDown(true);
        const time = startGameIn * 1000; // * sec
        setInterval(() => {
            setStartGameIn(startGameIn - 1);
        }, 1000);
        setTimeout(async () => {
            await startGame(hash);
        }, time);
    }

    const sortPlayers = (players) => {
        const myPlayer = players.find(item => item.id === user.id);
        const k = players.indexOf(myPlayer);
        return players.splice(k).concat(players);
    }

    const startGame = async (roomId) => {
        const response = await fetch(process.env.REACT_APP_API_PREFIX + `/api/rooms/${roomId}/games`, {
            method: 'POST'
        });
        if (response.status === 201) {
            await navigate(`/rooms/${hash}/game?password=${searchParams.get("password")}`)
        }
    }

    return (
        <div className='container'>
            <div className='navbar'>
                <div className='navbar-info'>
                    <div>Пятерки</div>
                    <div>Карт на столе: 12</div>
                </div>
                <div className='navbar-info'>
                    <div>{name}</div>
                    {searchParams.get("password") && <div>Пароль: {searchParams.get("password")}</div>}
                </div>
            </div>

            <div className='game-main'>

                {!isCounterGoingDown && <div className='waitNote'>Ждем всех игроков...</div>}
                {isCounterGoingDown && <div className='waitNote'>До начала игры {startGameIn} секунд...</div>}

                {players.slice(1).map((item, index) => (
                    <Player key={index} position={getPlayerPosition(players.slice(1), index)} player={item} />
                ))}
            </div>

            <RoomPanel host={host} />
        </div>
    );
}