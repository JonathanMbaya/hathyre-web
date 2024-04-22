import React from 'react';
import Buttons from "../Button/Button";
import ButtonNice from '../Button/ButtonNice';
import './Footer.css';

function Footer() {
    return (
        <div className='footer'>
            {/* Première partie du Footer */}
            <div className='first-area-footer'>
                <div className='newsletter'>
                    <h3>S'abonner à la newsletter</h3>
                    <div className='newsletter'>
                        <input type="text" name="" id="" placeholder='Entrez votre adresse mail' />
                        <Buttons text="S'abonner" className='submit-newsletter' type='submit'/>
                    </div>
                </div>

                <div className='menu-footer'>
                    {/* Catalogue */}
                    <div className='one-menu-footer'>
                        <h3>Catalogue</h3>
                        <div>
                            <li>Home</li>
                            <li>Produits</li>
                            <li>A produits</li>
                            <li>Blog</li>
                            <li>FAQ</li>
                            <li>Contact</li>
                        </div>
                    </div>

                    {/* Plan de site */}
                    <div className='one-menu-footer'>
                        <h3>Plan de site</h3>
                        <div>
                            <li>Home</li>
                            <li>Produits</li>
                            <li>A produits</li>
                            <li>Blog</li>
                            <li>FAQ</li>
                            <li>Contact</li>
                        </div>
                    </div>

                    {/* Mentions Légales */}
                    <div className='one-menu-footer'>
                        <h3>Mentions Légales</h3>
                        <div>
                            <li>Mentions Légales</li>
                            <li>CGV</li>
                            <li>Paiements et Livraison</li>
                            <li>Politique de confidentialité</li>
                        </div>
                    </div>
                </div>

                <div className='contact-footer'>
                    <img src={process.env.PUBLIC_URL + '/hathyre-logo-white.png'} alt="Logo Hathyre" />
                    <div className='contact-footer-icon'>
                        <ButtonNice text="Nous contacter sur Instagram"/> 
                        <span>|</span>
                        {/* <a href="https://www.instagram.com/hathyre_/" target='_blank'>
                            <img className='insta' src="https://icons.iconarchive.com/icons/fa-team/fontawesome-brands/512/FontAwesome-Brands-Square-Instagram-icon.png" alt="" />
                        </a>  */}

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
