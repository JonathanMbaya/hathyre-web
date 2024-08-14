import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

    const { user } = useContext(LoginContext);

    // const navigate = useNavigate();

    // useEffect(() => {
    //     if (!user && !localStorage.getItem('token')) {
    //         navigate('/admin/login');
    //     }
    // }, [navigate, user]);

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
                                <p>{item.price} EUR</p>
                                <p>{item.name}</p>
                                <p>{item.quantity} X</p>
                                <FontAwesomeIcon icon={faTrash} onClick={() => handleRemoveFromCart(item._id)} />
                            </div>
                        ))}
                    </div>

                    <div className='price-total'>
                        <p>{totalPrice} EUR</p>

                        {showPopup && (
                            <PopUpLogin />
                        )}

                        <Link to={!user ?  '/' : '/checkout' }>
                            <button onClick={!user ? () => setShowPopup(true) : undefined}>
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
