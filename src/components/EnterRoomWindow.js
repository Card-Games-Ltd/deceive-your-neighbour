import './EnterRoomWindow.css';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function EnterRoomWindow({ hash, close = f => f }) {
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        setErrorMessage(""); // clear errors when password is modified
    }, [password])

    const checkRoomCredentials = async () => {
        const response = await fetch(process.env.REACT_APP_API_PREFIX + `/api/rooms/${hash}?password=${password}`);
        const data = await response.json();
        if (response.status === 403) {
            setErrorMessage(data.error);
        } else if (response.ok) {
            await navigate(`/rooms/${hash}?password=${password}`);
        }
    }

    return (
        <div className='dark'>
            <div className='password-form'>
                <div className='password-form-header'>Введите пароль для игры</div>
                <input
                    placeholder='Пароль'
                    type='password'
                    className='password-input'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                ></input>
                {errorMessage && <div>{errorMessage}</div>}
                <button onClick={checkRoomCredentials} className='submit-password-btn'>Войти</button>
                <div className='exit' onClick={close}>⨯</div>
            </div>
        </div> 
    )
}