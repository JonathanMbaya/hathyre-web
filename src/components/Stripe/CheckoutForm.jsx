import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import Popup from '../PopUp/PopUp.jsx';
import { CartContext } from '../../context/card.context'; // Chemin corrigé
import { LoginContext } from '../../context/login.context.jsx';
import { contactConfig } from '../../utils/config.email.js';
import './checkout.css';

function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const { cartItems, removeFromCart } = useContext(CartContext);
    const { userConnected } = useContext(LoginContext);

    const [isConnected , setIsConnected] = useState({});
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
    });
    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    useEffect(()=>{
        if(userConnected) {

            axios.get(`https://hathyre-server-api.onrender.com/api/client/${userConnected._id}`)
            .then(response => {
            // Mettre à jour l'état avec les produits récupérés
            setIsConnected(response.data);
            console.log(isConnected);
            })

            .catch(error => {
            console.error('Erreur lors de la récupération des produits :', error);
            });

        }

    })

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        // Création du PaymentMethod Stripe
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
                    country: customerInfo.country,
                },
            },
        });

        if (error) {
            console.log(error.message);
            setLoading(false);
            setPopupMessage(`Erreur : ${error.message}`);
            setShowPopup(true);
            return;
        }

        try {
            // Traitement du paiement via Stripe
            console.log("Token Generated: ", paymentMethod);
            const { id } = paymentMethod;
            const response = await axios.post('https://hathyre-server-api.onrender.com/stripe/load', {
                amount: totalPrice,
                id: id,
            });

            if (!error) {
                console.log("Token Generated: ", paymentMethod);
            }

            if (response.data.success) {
                console.log("Paiement réussi");

                // Ajout de la commande dans le système administratif
                await axios.post('https://hathyre-server-api.onrender.com/api/neworders', {

                    nom: customerInfo.lastName,
                    prenom: customerInfo.firstName,
                    address: customerInfo.address,
                    email: customerInfo.email,
                    mobile: customerInfo.mobile,
                    articles: cartItems.map(item => ({
                        productId: item._id, // Vérifiez que cette propriété existe et est correcte
                        quantity: item.quantity,
                        price : item.price
                    })),
                    amount: totalPrice,
                    date: new Date(),
                    status: 'En cours de préparation'
                    
                    
                });

                // Envoi de l'email de confirmation
                await sendConfirmationEmail();

                setPopupMessage("Merci pour votre commande !");
                setShowPopup(true);
                setLoading(false);
            }
        } catch (error) {
            console.log("Erreur lors du traitement de la commande ou du paiement:", error);
            setLoading(false);
            setPopupMessage("Une erreur est survenue. Veuillez réessayer.");
            setShowPopup(true);
        }
    };

    const sendConfirmationEmail = async () => {

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
            cartItems: cartItems.map(item => `${item.quantity}x ${item.name}`).join(", "),
        };

        try {

            await emailjs.send(
                contactConfig.YOUR_SERVICE_ID,
                contactConfig.YOUR_TEMPLATE_ID,
                templateParams,
                contactConfig.YOUR_USER_ID
            );

            console.log("Email de confirmation envoyé");
        } 
        
        catch (error) {
            console.log("Erreur lors de l'envoi de l'email de confirmation:", error);
        }
    };

    useEffect(() => {
        let total = 0;
        cartItems.forEach(item => {
            total += item.price * item.quantity;
        });
        setTotalPrice(total);
    }, [cartItems]);

    useEffect(() => {
        let totalP = 0;
        cartItems.forEach(item => {
            totalP += item.quantity;
        });
        setTotalProduct(totalP);
    }, [cartItems]);

    const handleRemoveFromCart = (productId) => {
        removeFromCart(productId);
    };

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
                <input type="text" name="firstName" value={!userConnected ? customerInfo.firstName : isConnected.prenom} onChange={handleInputChange} placeholder="Prénom" required />
                <input type="text" name="lastName" value={!userConnected ? customerInfo.lastName : isConnected.nom} onChange={handleInputChange} placeholder="Nom de famille" required />
                <input type="email" name="email" value={!userConnected ? customerInfo.email: isConnected.clientEmail} onChange={handleInputChange} placeholder="Adresse email" required />
                <h3>Adresse de livraison</h3>
                <input type="text" name="address" value={customerInfo.address} onChange={handleInputChange} placeholder="Adresse" required />
                <input type="text" name="city" value={customerInfo.city} onChange={handleInputChange} placeholder="Ville" required />
                <input type="text" name="postalCode" value={customerInfo.postalCode} onChange={handleInputChange} placeholder="Code postal" required />
                <input type="phone" name="mobile" value={customerInfo.mobile} onChange={handleInputChange} placeholder="Téléphone" required />                
                

                <select
                    name="country"
                    value={customerInfo.country}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">Sélectionner un pays</option>
                    <option value="FR">France</option>

                </select>

                <br /><br />
                <h3>Mode de paiement </h3>
                <CardElement className='input-bank-card' options={{ hidePostalCode: true }} />
                <button type="submit" disabled={loading}>Payer</button>
            </form>

            {showPopup && (
                <Popup 
                    message={popupMessage}
                    onClose={() => setShowPopup(false)} 
                />
            )}
        </div>
    );
}

export default CheckoutForm;
