import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import Popup from '../PopUp/PopUp.jsx';
import { CartContext } from '../../context/card.context'; // Chemin corrigé
import { contactConfig } from '../../utils/config.email.js';
import './checkout.css';

function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const { cartItems, removeFromCart } = useContext(CartContext);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalProduct, setTotalProduct] = useState(0);
    const [customerInfo, setCustomerInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
        loading: false,
        show: false,
        alertmessage: "",
        variant: "",
    });
    const [showPopup, setShowPopup] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setCustomerInfo({ ...customerInfo, loading: true });
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
            billing_details: {
                name: `${customerInfo.firstName} ${customerInfo.lastName}`,
                email: customerInfo.email,
                address: {
                    line1: customerInfo.address,
                    city: customerInfo.city,
                    postal_code: customerInfo.postalCode,
                    country: customerInfo.country
                }
            }
        });

        const sendConfirmationEmail = () => {
            const templateParams = {
                firstName: customerInfo.firstName,
                lastName: customerInfo.lastName,
                email: customerInfo.email,
                address: customerInfo.address,
                city: customerInfo.city,
                postalCode: customerInfo.postalCode,
                country: customerInfo.country,
                totalPrice: totalPrice,
                totalProduct: totalProduct,
                cartItems: cartItems.map(item => `${item.quantity}x ${item.name}`).join(", ")
            };

            emailjs
                .send(
                    contactConfig.YOUR_SERVICE_ID,
                    contactConfig.YOUR_TEMPLATE_ID,
                    templateParams,
                    contactConfig.YOUR_USER_ID
                )
                .then(
                    (result) => {
                        console.log(result.text);
                        setCustomerInfo({
                            ...customerInfo,
                            loading: false,
                            alertmessage: "SUCCESS! ,Thankyou for your message",
                            variant: "success",
                            show: true,
                        });
                    },
                    (error) => {
                        console.log(error.text);
                        setCustomerInfo({
                            ...customerInfo,
                            alertmessage: `Failed to send!, ${error.text}`,
                            variant: "danger",
                            show: true,
                        });
                        document.getElementsByClassName("co_alert")[0].scrollIntoView();
                    }
                );
        };

        sendConfirmationEmail();

        if (!error) {
            console.log("Token Generated: ", paymentMethod);
            try {
                const { id } = paymentMethod;
                const response = await axios.post('https://hathyre-server-api.onrender.com/stripe/load',
                    {
                        amount: totalPrice,
                        id: id,
                    });
                if (response.data.success)
                    console.log("Payment successful");

                    // Afficher la pop-up
                    setShowPopup(true);

            } catch (error) {
                console.log("Error!", error);
            }
        } else {
            console.log(error.message);
        }
    }

    // Calculate total price whenever cart items change
    useEffect(() => {
        let total = 0;
        cartItems.forEach(item => {
            total += item.price * item.quantity; // Multiply price by quantity to get total price for each item
        });
        setTotalPrice(total);
    }, [cartItems]);

    // Calculate total quantity whenever cart items change
    useEffect(() => {
        let totalP = 0;
        cartItems.forEach(item => {
            totalP += item.quantity; // Add the quantity of each item
        });
        setTotalProduct(totalP);
    }, [cartItems]);

    // Function to remove an item from the cart
    const handleRemoveFromCart = (productId) => {
        removeFromCart(productId);
    };

    // Function to handle changes in the personal information form fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo({ ...customerInfo, [name]: value });
    };

    if (cartItems.length === 0) {
        navigate('/');
    }

    return (
        <div className='resume-checkout' style={{ width: '100%' }}>
            <div className='form-checkout' style={{ maxWidth: 400 }}>
                <h2>Votre panier</h2>
                <div className='recap-products'>
                    <h2 className='total-price'>{totalPrice} EUR</h2>
                    {totalProduct > 1 ? <p>{totalProduct} Articles</p> : <p>{totalProduct} Article</p>}
                    {cartItems.map((item, index) => (
                        <div className='recap-product-card' key={index}>
                            <p>{item.price}</p>
                            <p className='name'>{item.name}</p>
                            <FontAwesomeIcon className='icon' icon={faTrash} onClick={() => handleRemoveFromCart(item._id)} />
                            <div>
                                <p>{item.quantity} X</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <form className='form-checkout' onSubmit={handleSubmit} style={{ maxWidth: 300 }}>
                <h2>Vos informations</h2>
                <input type="text" name="firstName" value={customerInfo.firstName} onChange={handleInputChange} placeholder="Prénom" required />
                <input type="text" name="lastName" value={customerInfo.lastName} onChange={handleInputChange} placeholder="Nom de famille" required />
                <input type="email" name="email" value={customerInfo.email} onChange={handleInputChange} placeholder="Adresse email" required />
                <h3>Adresse de livraison</h3>
                <input type="text" name="address" value={customerInfo.address} onChange={handleInputChange} placeholder="Adresse" required />
                <input type="text" name="city" value={customerInfo.city} onChange={handleInputChange} placeholder="Ville" required />
                <input type="text" name="postalCode" value={customerInfo.postalCode} onChange={handleInputChange} placeholder="Code postal" required />
                <input type="text" name="country" value={customerInfo.country} onChange={handleInputChange} placeholder="Pays (ex: FR)" required />
                <br /><br />
                <h3>Mode de paiement </h3>
                <CardElement className='input-bank-card' options={{ hidePostalCode: true }} />
                <button type="submit">Payer</button>
            </form>

            {showPopup && (
                <Popup 
                    message="Nous vous remercions pour votre commande !"
                    onClose={() => setShowPopup(false)} 
                />
            )}
        </div>
    );
}

export default CheckoutForm;
