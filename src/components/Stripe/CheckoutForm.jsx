import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Grid, Typography, TextField, Button, Select, MenuItem, InputLabel, FormControl, Box, CircularProgress } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import Popup from '../PopUp/PopUp.jsx';
import { CartContext } from '../../context/card.context';
import { LoginContext } from '../../context/login.context.jsx';
import { contactConfig } from '../../utils/config.email.js';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"; // Importation de PayPal
import './checkout.css';

function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const { cartItems, removeFromCart } = useContext(CartContext);
    const { userConnected } = useContext(LoginContext);

    const [isConnected, setIsConnected] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalProduct, setTotalProduct] = useState(0);
    const [customerInfo, setCustomerInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        address: '',
        city: '',
        postalCode: '',
        country: 'FR', // Valeur par défaut
        date: '',
    });
    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    // Récupérer les informations de l'utilisateur connecté
    useEffect(() => {
        if (userConnected) {
            axios.get(`https://hathyre-server-api.onrender.com/api/client/${userConnected._id}`)
                .then(response => {
                    if (response.data) {
                        setIsConnected(response.data);
                        setCustomerInfo(prevInfo => ({
                            ...prevInfo,
                            firstName: response.data.prenom || '',
                            lastName: response.data.nom || '',
                            email: response.data.clientEmail || '',
                            mobile: response.data.mobile || ''
                        }));
                    }
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des informations client :', error);
                });
        }
    }, [userConnected]);

    const handleStripeSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
    
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
            const { id } = paymentMethod;
    
            // Envoyer la requête pour créer la commande avec le paiement
            const response = await axios.post('https://hathyre-server-api.onrender.com/api/neworders', {
                nom: customerInfo.lastName,
                prenom: customerInfo.firstName,
                email: customerInfo.email,
                mobile: customerInfo.mobile,
                address: customerInfo.address,
                city: customerInfo.city,
                postalCode: customerInfo.postalCode,
                country: customerInfo.country,
                articles: cartItems.map(item => ({
                    productId: item._id,
                    productName: item.name,
                    quantity: item.quantity,
                    price: item.price
                })),
                amount: totalPrice,
                date: new Date(),
                status: 'En cours de préparation',
                paymentMethod: id, // Envoyer l'ID de la méthode de paiement
            });

            

            if (response.data.order) {
                await sendConfirmationEmail(response.data.order._id);
                setPopupMessage("Merci pour votre commande !");
                setShowPopup(true);
            }

            // Mise à jour du stock pour chaque produit
            for (const item of cartItems) {
                const updatedStock = item.stock - item.quantity;
                await axios.put(`https://hathyre-server-api.onrender.com/api/update/product/${item._id}`, {
                    stock: updatedStock,
                });
            }
    
            if (userConnected) {
                const updatedMontDepense = isConnected.montantDepense + totalPrice;
                await axios.put(`https://hathyre-server-api.onrender.com/api/update/client/${userConnected._id}`, {
                    montantDepense: updatedMontDepense,
                });
            }



        } catch (error) {
            console.log("Erreur lors du traitement de la commande ou du paiement:", error);
            setPopupMessage("Une erreur est survenue. Veuillez réessayer.");
            setShowPopup(true);
        } finally {
            setLoading(false);
        }
    };
    

    const sendConfirmationEmail = async (orderIdEmail) => {
        const templateParams = {
            id : orderIdEmail,
            firstName: customerInfo.firstName,
            lastName: customerInfo.lastName,
            email: customerInfo.email,
            address: customerInfo.address,
            city: customerInfo.city,
            postalCode: customerInfo.postalCode,
            country: customerInfo.country,
            date: customerInfo.date,
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
        } catch (error) {
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo({ ...customerInfo, [name]: value });
    };

    if (cartItems.length === 0) {
        navigate('/');
    }

    const handleRemoveFromCart = (productId) => {
        removeFromCart(productId);
    };

    return (
        <div className='resume-checkout' style={{ width: '100%' }}>
            {/* Partie récapitulatif */}
            <div className='form-checkout' style={{ maxWidth: 400 }}>
                <h2>Votre panier</h2>
                <div className='recap-products'>
                    <h2 className='total-price'>{parseFloat(totalPrice.toFixed(2))} EUR</h2>
                    {totalProduct > 1 ? <p>{totalProduct} Articles</p> : <p>{totalProduct} Article</p>}
                    {cartItems.map((item, index) => (
                        <div className='recap-product-card' key={index}>
                            <div>
                                <p>{item.quantity} X</p>
                            </div>
                            <p className='name'>{item.name}</p>
                            <p>{item.price}</p>

                            <FontAwesomeIcon className='icon' icon={faTrash} onClick={() => handleRemoveFromCart(item._id)} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Partie informations sur la commande */}
            <Grid item xs={12} md={6}>
                <form className='form-checkout' onSubmit={handleStripeSubmit} style={{ maxWidth: 300 }}>
                    
                    <Box my={2}>
                        <h2>Vos informations</h2>
                        <TextField
                            fullWidth
                            label="Prénom"
                            name="firstName"
                            value={customerInfo.firstName}
                            onChange={handleInputChange}
                            required
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Nom"
                            name="lastName"
                            value={customerInfo.lastName}
                            onChange={handleInputChange}
                            required
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Adresse email"
                            name="email"
                            value={customerInfo.email}
                            onChange={handleInputChange}
                            required
                            type="email"
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Numéro de téléphone"
                            name="mobile"
                            value={customerInfo.mobile}
                            onChange={handleInputChange}
                            required
                            type="tel"
                            margin="normal"
                        />
                        <h2>Adresse de livraison</h2>
                        <TextField
                            fullWidth
                            label="Adresse"
                            name="address"
                            value={customerInfo.address}
                            onChange={handleInputChange}
                            required
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Ville"
                            name="city"
                            value={customerInfo.city}
                            onChange={handleInputChange}
                            required
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Code postal"
                            name="postalCode"
                            value={customerInfo.postalCode}
                            onChange={handleInputChange}
                            required
                            margin="normal"
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Pays</InputLabel>
                            <Select
                                name="country"
                                value={customerInfo.country}
                                onChange={handleInputChange}
                                required
                            >
                                <MenuItem value="FR">France</MenuItem>
                                {/* Ajoutez d'autres pays si nécessaire */}
                            </Select>
                        </FormControl>
                    </Box>

                    {/* Section pour le paiement par carte */}
                    <Typography variant="h6">Paiement par carte</Typography>
                    <Box my={2}>
                        <CardElement className="input-bank-card" options={{ hidePostalCode: true }} />
                    </Box>
                    <Button type="submit" variant="contained" color="primary" disabled={loading} fullWidth>
                        {loading ? <CircularProgress size={24} /> : "Payer par carte"}
                    </Button>
                </form>
                
                {/* Section pour le paiement PayPal */}
                <div id="paypal-button-container" style={{ marginTop: '20px' }}></div>
                <PayPalScriptProvider options={{ "client-id": "YOUR_PAYPAL_CLIENT_ID" }}>
                    <PayPalButtons
                        style={{
                            shape: 'rect',
                            layout: 'vertical',
                            color: 'gold',
                            label: 'paypal',
                        }}
                        createOrder={async () => {
                            try {
                                const response = await fetch("/api/orders", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        cart: cartItems.map(item => ({
                                            id: item._id,
                                            quantity: item.quantity,
                                        })),
                                        totalPrice: totalPrice.toFixed(2) // Format du prix à deux décimales
                                    }),
                                });

                                const orderData = await response.json();

                                if (orderData.id) {
                                    return orderData.id;
                                }
                                const errorDetail = orderData?.details?.[0];
                                const errorMessage = errorDetail
                                    ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                                    : JSON.stringify(orderData);

                                throw new Error(errorMessage);
                            } catch (error) {
                                console.error(error);
                                setPopupMessage(`Erreur lors de la création de la commande PayPal : ${error.message}`);
                                setShowPopup(true);
                            }
                        }}
                        onApprove={async (data, actions) => {
                            try {
                                const response = await fetch(`/api/orders/${data.orderID}/capture`, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                });

                                const orderData = await response.json();
                                const errorDetail = orderData?.details?.[0];

                                if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                                    return actions.restart();
                                } else if (errorDetail) {
                                    throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
                                } else if (!orderData.purchase_units) {
                                    throw new Error(JSON.stringify(orderData));
                                } else {
                                    const transaction =
                                        orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
                                        orderData?.purchase_units?.[0]?.payments?.authorizations?.[0];
                                    setPopupMessage(`Transaction ${transaction.status}: ${transaction.id}`);
                                    setShowPopup(true);
                                }
                            } catch (error) {
                                console.error(error);
                                setPopupMessage(`Désolé, votre transaction n'a pas pu être traitée...<br><br>${error}`);
                                setShowPopup(true);
                            }
                        }}
                    />
                </PayPalScriptProvider>
            </Grid>

            {showPopup && (
                <Link to='/'>
                    <Popup message={popupMessage} onClose={() => setShowPopup(false)}>
                        <Button variant="contained" color="primary" onClick={() => setShowPopup(false)}>
                            Fermer
                        </Button>
                    </Popup>
                </Link>
            )}
        </div>
    );
}

export default CheckoutForm;
