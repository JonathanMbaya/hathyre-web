import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse} from '@fortawesome/free-solid-svg-icons';
import ButtonNice from '../Button/ButtonNice';
import './Footer.css';

function Footer() {
    return (
        <div className='footer'>
            {/* Première partie du Footer */}
            <div className='first-area-footer'>
                <div className='menu-footer'>
                    {/* Catalogue */}
                    <div className='contact-footer'>
                        <img src={process.env.PUBLIC_URL + '/hathyre-logo-white.png'} alt="Logo Hathyre" />
                        <div className='contact-footer-icon'>

                            <Link to="https://www.instagram.com/hathyre_/" target="_blank">
                                <ButtonNice text="Nous contacter sur Instagram"/> 
                            </Link>

                        </div>
                    </div>

                    {/* Plan de site */}
                    <div className='one-menu-footer'>
                        <div style={{textAlign: "left"}}>
                            <ul>

                                <li>
                                    <Link className='link-without-decoration' to="/" >
                                        <FontAwesomeIcon icon={faHouse} />
                                    </Link> 
                                </li>

                                <li>
                                    <Link className='link-without-decoration'  style={{textAlign: "left"}} to="/product" >
                                        Nos produits
                                    </Link>
                                </li>
                                
                                <li>
                                    <Link className='link-without-decoration'  style={{textAlign: "left"}} to="/product" >
                                        A propos de Hathyre
                                    </Link>
                                </li> 
                                                        
                                <li>
                                    <Link className='link-without-decoration'  style={{textAlign: "left"}} to="/product" >
                                        FAQ
                                    </Link>
                                </li>

                            </ul>
                            
                            
                        </div>
                    </div>

                    {/* Mentions Légales */}
                    <div className='one-menu-footer'>
                        <div style={{textAlign: "left"}}>

                            <ul>

                                <li>
                                    <Link className='link-without-decoration' style={{textAlign: "left"}} to="/mentions-legales">
                                        Mentions Légales
                                    </Link>
                                </li>

                                <li>
                                    <Link className='link-without-decoration' style={{textAlign: "left"}} to="/politique-de-confidentialite">
                                        Politique de confidentialité
                                    </Link>
                                </li>

                                <li>
                                    <Link className='link-without-decoration' style={{textAlign: "left"}} to="/conditions-ventes">
                                        CGV
                                    </Link>
                                </li>

                            </ul>

                        </div>
                    </div>
                </div>

            </div>

            {/* Deuxième partie footer */}

            <div className='second-area-footer'>
                <p>Hathyre - Copyright 2024</p>

                <div className='icon-money'>
                    <img src={process.env.PUBLIC_URL + '/money-way/cc-visa.svg'} alt="Logo Hathyre" />
                    <img src={process.env.PUBLIC_URL + '/money-way/cc-mastercard.svg'} alt="Logo Hathyre" />
                    <img src={process.env.PUBLIC_URL + '/money-way/cc-paypal.svg'} alt="Logo Hathyre" />
                    <img src={process.env.PUBLIC_URL + '/money-way/cc-stripe.svg'} alt="Logo Hathyre" />
                </div>

            </div>
        </div>
    );
}

export default Footer;
