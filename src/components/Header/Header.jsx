import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesDown } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../Navbar/Navbar';
import BurgerMenu from "../Navbar/BurgerMenu";
import { useLocation} from 'react-router-dom';
import './header.style.css';
import 'animate.css';

function Header({ currentPage }) {
    const location = useLocation();

    return (
        <div className='header'>

            {location.pathname === '/' && 
                <div  className='header-home'>
                    <BurgerMenu/>
                    <div className='logo-container animate__animated animate__fadeInUp' style={{ display: 'flex', justifyContent: 'center' }}>
                        <img
                            src={process.env.PUBLIC_URL + '/hathyre-logo-white.png'}
                            alt="Logo de l'application"
                            className="logo-img"
                        />
                    </div>
                    <Navbar />

                    <h1 className='animate__animated animate__fadeInDown'>Hathyre, votre secret de beauté au quotidien<FontAwesomeIcon icon={faAnglesDown} /></h1>

                </div>
            }

            {location.pathname === '/product' && 
                <div className='header-product'>
                    <BurgerMenu/>
                    <div className='logo-container animate__animated animate__fadeInUp' style={{ display: 'flex', justifyContent: 'center' }}>
                        <img
                            src={process.env.PUBLIC_URL + '/hathyre-logo.png'}
                            alt="Logo de l'application"
                            className="logo-img"
                        />
                    </div>
                    <Navbar />
                </div>
            }

            {location.pathname === '/apropos' && 
                <div className='header-apropos'>
                    <BurgerMenu/>
                    
                    <video autoPlay loop muted style={{ width: '100%', height: 'auto' }}>
                        <source src={`${process.env.PUBLIC_URL}/karité.mp4`} type="video/mp4" />
                        {/* Ajoutez d'autres sources pour les différents formats de vidéo si nécessaire */}
                    </video>

                    <div className='logo-container animate__animated animate__fadeInUp' style={{ display: 'flex', justifyContent: 'center' }}>
                        <img
                            src={process.env.PUBLIC_URL + '/hathyre-logo-white.png'}
                            alt="Logo de l'application"
                            className="logo-img"
                        />
                    </div>
                    <Navbar />
                </div>
            }

            {location.pathname.startsWith('/product/') && 
                <div className='header-product'>
                    <BurgerMenu/>
                    <div className='logo-container animate__animated animate__fadeInUp' style={{ display: 'flex', justifyContent: 'center' }}>
                        <img
                            src={process.env.PUBLIC_URL + '/hathyre-logo.png'}
                            alt="Logo de l'application"
                            className="logo-img"
                        />
                    </div>
                    <Navbar />
                </div>
            }

        </div>
    );
};

export default Header;
