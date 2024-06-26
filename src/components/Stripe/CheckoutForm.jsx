import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { CartContext } from '../../context/card.context';
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
        country: ''
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
            billing_details: {
                name: customerInfo.firstName + ' ' + customerInfo.lastName,
                email: customerInfo.email,
                address: {
                    line1: customerInfo.address,
                    city: customerInfo.city,
                    postal_code: customerInfo.postalCode,
                    country: customerInfo.country
                }
            }
        });

        if (!error) {
            console.log("Token Généré: ", paymentMethod);
            try {
                const { id } = paymentMethod;
                const response = await axios.post('https://hathyre-server-api.onrender.com/stripe/load',
                    {
                        amount: totalPrice,
                        id: id,
                    });
                if (response.data.success)
                    console.log("Paiement réussi");

            } catch (error) {
                console.log("Erreur!", error);
            }
        }

        else {
            console.log(error.message);
        }
    }

    // Calculer la somme totale des prix à chaque changement dans le panier
    useEffect(() => {
        let total = 0;
        cartItems.forEach(item => {
            total += item.price * item.quantity; // Multipliez le prix par la quantité pour obtenir le prix total de chaque produit
        });
        setTotalPrice(total);
    }, [cartItems]);

    // Calculer la somme totale des quantités à chaque changement dans le panier
    useEffect(() => {
        let totalP = 0;
        cartItems.forEach(item => {
            totalP += item.quantity; // Ajouter la quantité de chaque produit
        });
        setTotalProduct(totalP);
    }, [cartItems]);

    // Fonction pour supprimer un produit du panier
    const handleRemoveFromCart = (productId) => {
        removeFromCart(productId);
    };

    // Fonction pour gérer les changements dans les champs du formulaire d'informations personnelles
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo({ ...customerInfo, [name]: value });
    };

    if (cartItems.length === 0) {
        navigate('/');
    }

    return (
        <div className='resume-checkout' style={{ Width: '100%' }}>
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
                <br />
                <br />
                <h3>Mode de paiement </h3>
                <CardElement className='input-bank-card' options={{ hidePostalCode: true }} />
                <button type="submit">Payer</button>
            </form>
        </div>
    )
}

export default CheckoutForm;
