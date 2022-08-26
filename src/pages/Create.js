import React from 'react';
import './Create.css';

export default function Create() {
    return (
        <div className='create-main'> 
            <div className='create-header'></div>
                <div className='create-form'>
                    <div className='form-header'>Создать игру</div>
                    <input className='create-input' type='text' placeholder='Придумайте название игры'></input>
                    <input className='create-input' type='text' placeholder='Придумайте пароль'></input>
                    <div className='make-public'>
                        <input type="checkbox"/>
                        <div>Публичная игра</div>
                    </div>
                    <div className='players-number'>
                        <div>Число игроков:</div>
                        <label><input type="radio" name="radio" />3</label>
                        <label><input type="radio" name="radio" />4</label>
                    </div>
                    <button className='create-button'>Готово!</button>
                </div>

        </div>

    )
}