import React, {useState, useContext, useEffect} from 'react';
import "./Game.css";
import Player from '../components/Player';
import GamePanel from '../components/GamePanel';
import {getPlayerPosition} from "../modules/PlayerPosition";
import {useParams, useSearchParams} from "react-router-dom";
import { UserContext } from '../App';
import HandCard from '../components/HandCard';



export default function Game() {

    const user = useContext(UserContext);
    const [searchParams] = useSearchParams();
    const { id } = useParams();
    // const [players, setPlayers] = useState([]);
    const [game, setGame] = useState(null);
    const [arePlayersSorted, setArePlayersSorted] = useState(false); 
    const [cards, setCards] = useState([]);      
    const [myCards, setMyCards] = useState([]);     
       
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

    useEffect(() => {
        if (game) {
            setCards(game.cards);
            console.log(cards)
        }
    }, [game]);

    const sortPlayers = (game) => {
        if (!arePlayersSorted) {
            const myPlayer = game.players.find(item => item.id === user.id);
            const k = game.players.indexOf(myPlayer);
            game.players = (game.players.splice(k).concat(game.players));
            setArePlayersSorted(true);
        }
    }
    useEffect(() => {
        if (game && !arePlayersSorted) {
            sortPlayers(game);
        }
    }, [game]);

    useEffect(()=> {
        if (cards) {
            setMyCards(cards.filter(item => item.holder.id === user.id))
            console.log(myCards);
        }

    }, [cards])



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

            {game && game.players.slice(1).map((item, index) => (
                <Player key={index} position={getPlayerPosition(game.players.slice(1), index)} player={item} />
            ))}
        </div>
            {/* <div className='JokeOkay'></div> */}
        <GamePanel/>

        <div className='handContainer'>
            {myCards? myCards.map(item => <HandCard {...item}/>) : ''}
        </div>
    </div>

    )
}