import React, {useContext} from 'react';
import "./GamePanel.css";
import { UserContext } from '../App';

export default function GamePanel() {
    const user = useContext(UserContext);

    return (
        <div className='game-bottom-panel'>
            <button className='rules-button'>?</button>
            <div className='player-info'>
            <img
                className= 'panel-avatar'
                src={user.avatar}
            ></img>
                <div className='panel-name'>{user.name}</div>
            </div>
            <div className='buttons-container'>
                <button className='game-button green'>Верю</button>
                <button className='game-button'>Проверить</button>
            </div>
        </div>
    )
}