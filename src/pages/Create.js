import React, {useContext, useState} from 'react';
import './Create.css';
import {useNavigate} from "react-router-dom";
import Header from "../components/Header";
import {UserContext} from "../App";

export default function Create() {
    const navigate = useNavigate();
    const user = useContext(UserContext);

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const [playersNumber, setPlayersNumber] = useState(3);

    const createRoom = async () => {
        try {
            const jsonData = {
                name: name,
                password: password,
                is_public: isPublic,
                players_number: playersNumber,
                session_token: user.session_token,
            }
            const response = await fetch(process.env.REACT_APP_API_PREFIX + "/api/rooms", {
                method: "POST",
                body: JSON.stringify(jsonData),
                headers: {'Content-Type': 'application/json'}
            });
            const data = await response.json();
            console.log(data);
            navigate(`/rooms/${data.hash}?password=${password}`);
        } catch (exception) {
            console.error(exception);
        }
    }

    return (
        <div className='create-main'> 
                <Header />
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
                            onChange={() => {setIsPublic(!isPublic)}}
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