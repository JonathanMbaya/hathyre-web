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

            <div className='container'>
                <h2>
                    “ Hathyre” 
                </h2>

                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
                dolore magna aliqua. Ut enim ad minim veniam, 
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
            </div>
        </div>
    );
};

export default Header;
