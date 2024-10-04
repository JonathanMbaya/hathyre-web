import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse} from '@fortawesome/free-solid-svg-icons';
import Button from "../Button/Button";
import ButtonNice from '../Button/ButtonNice';
import './Footer.css';

function Footer() {
    return (
        <div className='footer'>
            {/* Première partie du Footer */}
            <div className='first-area-footer'>
                {/* <div className='newsletter'>
                    <h3>S'abonner à la newsletter</h3>
                    <div className='newsletters'>
                        <input type="text" name="" id="" placeholder='Entrez votre adresse mail' />
                        <Button text="S'abonner" className='submit-newsletter' type='submit'/>
                    </div>
                </div> */}

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
                        <h3>Plan de site</h3>
                        <div>
                            <li>
                            <Link className='link-without-decoration' to="/" >
                                <FontAwesomeIcon icon={faHouse} />
                            </Link> 
                            </li>
                            <Link className='link-without-decoration' to="/product" >
                                <li>Nos produits</li>
                            </Link>
                            <Link className='link-without-decoration' to="/apropos" >
                                <li>A propos de Hathyre</li>                            
                            </Link>
                            <Link className='link-without-decoration' to="/faq">
                                <li>FAQ</li>
                            </Link>
                            
                        </div>
                    </div>

                    {/* Mentions Légales */}
                    <div className='one-menu-footer'>
                        <h3>Mentions Légales</h3>
                        <div style={{textAlign: "left"}}>
                            <Link to="/mentions-legales">
                                <li>Mentions Légales</li>
                            </Link>
                            <Link to="/politique-de-confidentialite">
                                <li>Politique de confidentialité</li>
                            </Link>
                            <Link to="/conditions-ventes">
                                <li>CGV</li>
                            </Link>
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
