import './EnterRoomWindow.css';

export default function EnterRoomWindow(props) {
    return (
        <div className='dark'>
        <div className='password-form'>
            <div className='password-form-header'>Введите пароль для игры</div>
            <input
                placeholder='Пароль'
                type='password'
                className='password-input' 
                value={props.passwordEntered}
                onChange={(event) => props.setPasswordEntered(Number(event.target.value))}           
                ></input>
            {(props.wrongPassword? <div>Неверный пароль</div> : '')}
            <button onClick = {()=> props.checkPassword(props.passwordEntered)} className='submit-password-btn'>Ок</button>
            <div className='exit' onClick={props.joinRequest}>⨯</div>
        </div>
        </div> 
    )
}