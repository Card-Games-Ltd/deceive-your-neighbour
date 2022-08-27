import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import './Join.css';
import GameAvailable from "../components/GameAvailable"; 
import RequestJoin from "../components/RequestJoin"; 
import headerImg from "../textures/header.png";


export default function Create() {

    const navigate = useNavigate();

    //Testing data, idk how to get it from the server
    const exampleGameId = {
        password: 1231
    }

    const [joinRequested, setJoinRequested] = useState(false);
    const [wrongPassword, setWrongPassword] = useState(false);
    const [passwordEntered, setPasswordEntered] = useState('');

    const joinRequest = ()=> {
        setJoinRequested(prevState=> !prevState);
        setWrongPassword(null);
    }

    const checkPassword = (password)=> {
        if (password === exampleGameId.password) {
            navigate("/rooms/id"); // test
        } else {
            setWrongPassword(true);
        }
    }

    const requsetJoinWindow = joinRequested ? 
    <RequestJoin wrongPassword = {wrongPassword} 
                 checkPassword = {checkPassword} 
                 joinRequest = {joinRequest} 
                 passwordEntered = {passwordEntered}
                 setPasswordEntered = {setPasswordEntered}/>
        : '';

    return (
         <div className='join-main'> 
              <img src={headerImg} className='join-header' alt='header'></img>
             <div className='join-list'>
                 <div className='list-header'>Присоединиться к игре</div>
                 <div className='games-container'>
                     <GameAvailable onClick = {joinRequest}/>
                     <GameAvailable />
                     <GameAvailable />
                 </div>
                 {requsetJoinWindow}
             </div>
     </div>

    )
}