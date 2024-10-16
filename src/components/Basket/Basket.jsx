import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../../context/card.context';
import { LoginContext } from '../../context/login.context';
// import StripeContainer from '../Stripe/StripeContainer.jsx';
import 'animate.css';
import './Basket.css';
import PopUpLogin from '../PopUp/PopUpLogin';

function Basket() {
    const [isOpen, setIsOpen] = useState(false);
    const { cartItems, removeFromCart } = useContext(CartContext);
    const [totalPrice, setTotalPrice] = useState(0);
    const [showPopup, setShowPopup] = useState(false);

    const { userConnected } = useContext(LoginContext);
    const navigate = useNavigate();

    // Calculer la somme totale des prix à chaque changement dans le panier
    useEffect(() => {
        const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalPrice(total);
    }, [cartItems]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Fonction pour supprimer un produit du panier
    const handleRemoveFromCart = (productId) => {
        removeFromCart(productId);
    };

    // Gérer le clic sur le bouton Commander
    const handleOrderClick = () => {
        if (!userConnected) {
            setShowPopup(true);
        } else {
            navigate('/checkout');
        }
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
                            <div style={{borderRadius : ".5rem"}} className='item-product-card' key={index}>
                                {   item.promo > 0 ?
                                    <p>-{item.promo}%</p>:
                                    <p>{item.promo}</p> 
                                }
                                <p>{item.price} EUR</p>
                                <p>{item.name}</p>
                                <p>{item.quantity} X</p>
                                <FontAwesomeIcon icon={faTrash} onClick={() => handleRemoveFromCart(item._id)} />
                            </div>
                        ))}
                    </div>

                    <div className='price-total'>
                        <p>{parseFloat(totalPrice.toFixed(2))} EUR</p>

                        {showPopup && <PopUpLogin />}

                        <button onClick={handleOrderClick}>
                            Commander
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Basket;
