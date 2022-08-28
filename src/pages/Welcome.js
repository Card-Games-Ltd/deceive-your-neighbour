import React, {useEffect, useState} from 'react';
import './Welcome.css';
import {useNavigate} from "react-router-dom";
import headerImg from "../textures/header.png";
import {toBase64} from "../modules/Base64";

export default function Welcome({user, addUser = f => f}) {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setAvatarUrl(user.avatar);
            if (avatarUrl) {
                document.documentElement.style.setProperty('--avatar-image', `url(${avatarUrl})`);
            }
        }
    }, [user, avatarUrl]);

    useEffect(() => {
        if (avatar) {
            const generateBase64 = async () => {
                try {
                    const imageUrl = await toBase64(avatar);
                    if (imageUrl) {
                        document.documentElement.style.setProperty('--avatar-image', `url(${imageUrl})`);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
            generateBase64();
        }
    }, [avatar])

    const chooseFile = () => {
        document.getElementById('avatar').click();
    }

    const changeAvatar = () => {
        const avatarInput = document.getElementById("avatar");
        setAvatar(avatarInput.files && avatarInput.files.length ? avatarInput.files[0] : null);
    }

    const goToCreatePage = async () => {
        try {
            if (!user) {
                const userData = await createUser();
                addUser(userData);
            }
            await navigate("/create");
        } catch (exception) {
            console.error(exception);
        }
    }

    const goToRoomsPage = async () => {
        try {
            if (!user) {
                const userData = await createUser();
                addUser(userData);
            }
            await navigate("/rooms");
        } catch (exception) {
            console.error(exception);
        }
    }

    const createUser = async () => {
        const formData = new FormData();
        formData.append('name', name);

        if (avatar) { formData.append('avatar', avatar); }
        const response = await fetch(process.env.REACT_APP_API_PREFIX + "/api/users", {
            method: "POST",
            body: formData,
        });
        const data = await response.json();
        console.log(data);
        return data;
    }

    return (
        <div className='welcome-main'>

            <div className='welcome-content'>
                <img src={headerImg} className='welcome-header' alt='header'></img>
                <div
                    className='avatar'
                    onClick={chooseFile}
                ></div>
                <input
                    id='avatar'
                    type="file"
                    onChange={changeAvatar}
                />
                <input
                    className='name-input'
                    type='text'
                    placeholder='Темоха'
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                <button onClick={goToCreatePage}>Создать игру</button>
                <button onClick={goToRoomsPage}>Вступить в игру</button>
            </div>
            <div className='service-buttons-container'>
                <button className='service-button'>L</button>
                <button className='service-button'>?</button>
            </div>
        </div>
    )
}