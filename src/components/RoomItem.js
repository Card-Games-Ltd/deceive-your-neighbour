import React from 'react';
import "./RoomItem.css";
import {useNavigate} from "react-router-dom";

export default function RoomItem({ hash, name, host, is_public, players_number, active_players_number, choose = f => f }) {
    const navigate = useNavigate();

    const chooseRoom = () => {
        if (is_public) {
            navigate(`/rooms/${hash}`);
        } else {
            choose();
        }
    }
    return (
        <div className='game-container' onClick={chooseRoom}>
            <div className='game-name'>{`${name} by ${host.name}`}</div>
            <div className='players-count'>{active_players_number}/{players_number}</div>
        </div>
    )
}
