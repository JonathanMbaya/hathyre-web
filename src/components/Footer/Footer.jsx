import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import ButtonNice from '../Button/ButtonNice';
import './Footer.css';

function Footer() {
    return (
        <div className='footer'>
            {/* Première partie du Footer */}
            <div className='first-area-footer col-md-12'>
                <div className='newsletter'>
                    <h3>S'abonner à la newsletter</h3>
                    <div className='newsletter'>
                        <input type="text" name="" id="" placeholder='Entrez votre adresse mail' />
                        <button className='submit-newsletter' type='submit'>S'abonner</button>
                    </div>
                </div>

                <div className='menu-footer'>
                    {/* Catalogue */}
                    <ul className='one-menu-footer col-md-4'>
                        <h3>Catalogue</h3>
                        <div>
                            <li>Home</li>
                            <li>Produits</li>
                            <li>A produits</li>
                            <li>Blog</li>
                            <li>FAQ</li>
                            <li>Contact</li>
                        </div>
                    </ul>

                    {/* Plan de site */}
                    <ul className='one-menu-footer col-md-4'>
                        <h3>Plan de site</h3>
                        <div>
                            <li>Home</li>
                            <li>Produits</li>
                            <li>A produits</li>
                            <li>Blog</li>
                            <li>FAQ</li>
                            <li>Contact</li>
                        </div>
                    </ul>

                    {/* Mentions Légales */}
                    <ul className='one-menu-footer col-md-4'>
                        <h3>Mentions Légales</h3>
                        <div>
                            <li>Mentions Légales</li>
                            <li>CGV</li>
                            <li>Paiements et Livraison</li>
                            <li>Politique de confidentialité</li>
                        </div>
                    </ul>
                </div>

                <div className='contact-footer'>
                    <img src={process.env.PUBLIC_URL + '/hathyre-logo-white.png'} alt="Logo Hathyre" />
                    <div className='contact-footer-icon'>
                        <ButtonNice text="Nous contacter sur Instagram"/> 
                        <span>|</span> 
                        <FontAwesomeIcon icon={faCamera} />
                    </div>
                </div>
            </div>

            {/* Deuxième partie footer */}

            <div className='second-area-footer'>
                <p>Hathyre - Copyright 2022</p>

                <div className='icon-money'>
                    <img src={process.env.PUBLIC_URL + '/money-way/visa.png'} alt="Logo Hathyre" />
                    <img src={process.env.PUBLIC_URL + '/money-way/mastercard.png'} alt="Logo Hathyre" />
                    <img src={process.env.PUBLIC_URL + '/money-way/paypal.png'} alt="Logo Hathyre" />
                </div>

            </div>
        </div>
    );
}

export default Footer;
