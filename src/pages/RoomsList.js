import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import './RoomsList.css';
import RoomItem from "../components/RoomItem";
import EnterRoomWindow from "../components/EnterRoomWindow";
import headerImg from "../textures/header.png";


export default function RoomsList() {

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
    <EnterRoomWindow wrongPassword = {wrongPassword}
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
                     <RoomItem onClick = {joinRequest}/>
                     <RoomItem />
                     <RoomItem />
                 </div>
                 {requsetJoinWindow}
             </div>
     </div>

    )
}