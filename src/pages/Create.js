import React, {useState} from 'react';
import './Create.css';
import {useNavigate} from "react-router-dom";
import headerImg from "../textures/header.png";

export default function Create({user}) {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [password, setPassword] = useState(null);
    const [isPublic, setIsPublic] = useState(false);
    const [playersNumber, setPlayersNumber] = useState(3);

    const createRoom = async () => {
        try {
            if (user && process.env.REACT_APP_API_PREFIX) {
                const formData = new FormData();
                console.log([name,
                    password,
                    isPublic,
                    playersNumber,
                    user.session_token]);
                formData.append('name', name);
                formData.append('password', password);
                formData.append('is_public', `${1 * isPublic}`);
                formData.append('players_number', `${playersNumber}`);
                formData.append('session_token', user.session_token);
                const response = await fetch(process.env.REACT_APP_API_PREFIX + "/api/rooms", {
                    method: "POST",
                    body: formData,
                });
                const data = await response.json();
                console.log(data);
                navigate(`/rooms/${data.hash}`);
            } else {
                navigate("/rooms/id"); // test
            }
        } catch (exception) {
            console.error(exception);
        }
    }

    return (
        <div className='create-main'> 
                <img src={headerImg} className='create-header' alt='header'></img>
                <div className='create-form'>
                    <div className='form-header'>Создать игру</div>
                    <input
                        className='create-input'
                        type='text'
                        placeholder='Придумайте название игры'
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    ></input>
                    <input
                        className='create-input'
                        type='text'
                        placeholder='Придумайте пароль'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    ></input>
                    <div className='make-public'>
                        <input
                            type="checkbox"
                            checked={isPublic === true}
                            onChange={(event) => setIsPublic(Boolean(1 * event.target.value))}
                        />
                        <div>Публичная игра</div>
                    </div>
                    <div className='players-number'>
                        <div>Число игроков:</div>
                        <label>
                            <input
                                type="radio"
                                name="radio"
                                value={3}
                                checked={playersNumber === 3}
                                onChange={(event) => setPlayersNumber(1 * event.target.value)}
                            />3</label>
                        <label>
                            <input
                                type="radio"
                                name="radio"
                                value={4}
                                checked={playersNumber === 4}
                                onChange={(event) => setPlayersNumber(1 * event.target.value)}
                            />4</label>
                    </div>
                    <button
                        className='create-button'
                        onClick={createRoom}
                    >Готово!</button>
                </div>

        </div>

    )
}