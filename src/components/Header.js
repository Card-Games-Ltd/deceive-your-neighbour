import React from 'react';
import headerImg from "../assets/textures/header.png";
import "./Header.css";

export default function Header() {
    return (
        <img src={headerImg} className='header' alt='header'></img>
    )
}