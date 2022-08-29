import React, {useState, useContext, useEffect} from 'react';
import "./Game.css";
import Player from '../components/Player';
import GamePanel from '../components/GamePanel';
import {getPlayerPosition} from "../modules/PlayerPosition";
import {useParams, useSearchParams} from "react-router-dom";
import { UserContext } from '../App';


export default function Game() {

    const user = useContext(UserContext);
    const [searchParams] = useSearchParams();
    const { id } = useParams();
    const [players, setPlayers] = useState([]);
    const [game, setGame] = useState(null);
    const [arePlayersSorted, setArePlayersSorted] = useState(false);            
       
   if (!game) {
        fetch( 
            process.env.REACT_APP_API_PREFIX + 
            `/api/rooms/${id}/games?password=${searchParams.get("password")}&session_token=${user.session_token}`
        )  
        .then(response => response.json())
        .then(data => {
            setGame(data);
        })
        .catch(error => {
            console.error(error);
        });
    }

    const sortPlayers = (game) => {
        if (!arePlayersSorted) {
            const myPlayer = game.players.find(item => item.id === user.id);
            const k = game.players.indexOf(myPlayer);
            setPlayers(game.players.splice(k).concat(game.players));
            setArePlayersSorted(true);
        }
    }
    useEffect(() => {
        if (game) {
            sortPlayers(game);
        }
    }, [game]);



    return (
        <div className='container'>

            <div className='navbar'>
                <div className='navbar-info'>
                    <div>Пятерки</div>
                    <div>Карт на столе: 12</div>
                </div>
                <div className='navbar-info'>
                    <div>{game && game.name}</div>
                    {searchParams.get("password") && <div>Пароль: {searchParams.get('password')}</div>}
                </div>
            </div>

            <div className='game-main'>

                {game && game.players.map((item, index) => (
                    index ? <Player key={index} position={getPlayerPosition(players, index)} player={item} /> :  ''
                ))}

            </div>

            <GamePanel/>

        </div>
    )
}