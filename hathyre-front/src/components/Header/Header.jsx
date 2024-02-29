import React from 'react';
import Navbar from '../Navbar/Navbar';
import './header.style.css';

function Header (){
    return (
        <div className='header'>
            <div className='logo-container'>
                <img
                    src={process.env.PUBLIC_URL + '/hathyre-logo.png'}
                    alt="Logo de l'application"
                    className="logo-img"
                />
            </div>

            <Navbar /> 

        </div>
    );
};

export default Header;
