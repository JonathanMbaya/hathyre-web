import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faTimes } from '@fortawesome/free-solid-svg-icons';
import 'animate.css';
import './Basket.css';

function Basket() {
    const [isOpen, setIsOpen] = useState(false);
    const [basket, setBasket] = useState([]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <div onClick={toggleMenu} className="product-basket animate__animated animate__fadeInUp">
                <FontAwesomeIcon className="burger-icon" icon={faBagShopping} />
                {basket.length > 0 ? <span>{basket.length}</span> : null}
            </div>
            {isOpen && (
                <div className="basket-window animate__animated animate__slideInRight">
                    <div onClick={toggleMenu} className="product-close animate__animated animate__fadeInUp">
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                    <h2>Votre panier</h2>
                    {/* Afficher le contenu du panier ici */}
                </div>
            )}
        </div>
    );
}

export default Basket;
