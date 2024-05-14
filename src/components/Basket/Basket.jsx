import React, { useContext, useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../../context/card.context';
// import StripeContainer from '../Stripe/StripeContainer.jsx';
import 'animate.css';
import './Basket.css';

function Basket() {
    const [isOpen, setIsOpen] = useState(false);
    const {cartItems, removeFromCart} = useContext(CartContext);
    const [totalPrice, setTotalPrice] = useState(0);

    // Calculer la somme totale des prix à chaque changement dans le panier
    useEffect(() => {
        let total = 0;
        cartItems.forEach(item => {
            total += item.price * item.quantity; // Multipliez le prix par la quantité pour obtenir le prix total de chaque produit
        });
        setTotalPrice(total);
    }, [cartItems]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Fonction pour supprimer un produit du panier
    const handleRemoveFromCart = (productId) => {
        removeFromCart(productId);
    };



    return (
        <div>
            <div onClick={toggleMenu} className="product-basket animate__animated animate__fadeInUp">
                <FontAwesomeIcon className="burger-icon" icon={faBagShopping} />
                {cartItems.length > 0 && <span>{cartItems.length}</span>}
            </div>
            {isOpen && (
                <div className="basket-window animate__animated animate__slideInRight">
                    <div onClick={toggleMenu} className="product-close animate__animated animate__fadeInUp">
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                    <h2>Votre panier</h2>
                    <div className='products-scroll'>
                        {cartItems.map((item, index) => (
                            <div className='item-product-card' key={index}>
                                <p>{item.price}</p>
                                <p>{item.name}</p>
                                 {/* Affichez la quantité du produit */}
                                <FontAwesomeIcon icon={faTrash} onClick={() => handleRemoveFromCart(item._id)} />
                                <div>
                                <p>{item.quantity} X</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='price-total'>
                        <p>{totalPrice} EUR</p>
                        <Link to='/checkout'>
                            <button>
                                Commander
                            </button>
                        </Link>

                    </div>
                </div>
            )}


        </div>
    );
}

export default Basket;
