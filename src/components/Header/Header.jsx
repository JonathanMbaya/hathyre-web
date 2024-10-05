// import Navbar from '../Navbar/Navbar';
// import BurgerMenu from "../Navbar/BurgerMenu";
import { useLocation} from 'react-router-dom';
import './header.style.css';
import 'animate.css';
import React from "react";
import NewNavbar from '../Navbar/newNavbar';

function Header({ currentPage }) {
    const location = useLocation();


    return (
        <div className='header'>

            {location.pathname === '/' && 
                <div  className='header-home'>
                    <NewNavbar/>
                    <div className='banner-home'>
                        <div className='container'>
                            <h2 style={{textAlign: "left" , paddingLeft : "1rem"}} className='animate__animated animate__fadeInDown'>Hathyre, <br/> votre secret de beauté <br/> au quotidien .</h2>
                        </div>
                        <div className='img-home-banner'>
                            <img src={process.env.PUBLIC_URL + '/background-home-2.jpg'} alt='' />
                            <img src={process.env.PUBLIC_URL + '/background-home.jpg'} alt='' />
                        </div>

                    </div>
                </div>
            }

            {location.pathname === '/product' && 
                <div className='header-home'>
                    <NewNavbar/>
                </div>
            }

            {location.pathname === '/apropos' && 
                <div className='header-home'>
                    
                    <NewNavbar/>
                    
                    <video autoPlay loop muted style={{ width: '100%', height: 'auto' }}>
                        <source src={`${process.env.PUBLIC_URL}/karité.mp4`} type="video/mp4" />
                        {/* Ajoutez d'autres sources pour les différents formats de vidéo si nécessaire */}
                    </video>
                </div>
            }

            {location.pathname === '/account' && 
                <div className='header-home'>
                    <NewNavbar/>
                </div>
            }

            {location.pathname.startsWith('/product/') && 
                <div className='header-home'>
                    <NewNavbar/>
                </div>
            }

            {location.pathname.startsWith('/checkout') && 
            <div className='header-home'>

                <div>
                    <img src={process.env.PUBLIC_URL + '/hathyre-logo.png'} alt='' />
                </div>
            </div>
            }


            {location.pathname.startsWith('/faq') && 
                <div className='header-home'>

                    <NewNavbar/>
                </div>
            }

            {location.pathname.startsWith('/mentions-legales') && 
                <div className='header-home'>

                    <NewNavbar/>
                </div>
            }

            {location.pathname.startsWith('/politique-de-confidentialite') && 
                <div className='header-home'>
                    <NewNavbar/>
                </div>
            }

            {location.pathname.startsWith('/conditions-ventes') && 
                <div className='header-home'>
                    <NewNavbar/>
                </div>
            }

        </div>
    );
};

export default Header;
