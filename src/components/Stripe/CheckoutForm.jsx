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
import './checkout.css';


function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const { cartItems , removeFromCart } = useContext(CartContext);
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
        country: 'FR', // valeur par défaut
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
    }, [userConnected]); // Enlever `isConnected` de la dépendance

    // Gestion de la soumission du formulaire et du paiement
    const handleSubmit = async (event) => {
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
            const response = await axios.post('https://hathyre-server-api.onrender.com/stripe/load', {
                amount: totalPrice,
                id: id,
            });

            if (response.data.success) {
                console.log("Paiement réussi");

                await axios.post('https://hathyre-server-api.onrender.com/api/neworders', {
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
                    status: 'En cours de préparation'
                });

                await sendConfirmationEmail();

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

                    console.log("Montant dépensé mis à jour :", updatedMontDepense);
                }

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
            date: customerInfo.date,
            totalPrice: totalPrice,
            totalProduct: totalProduct,
            cartItems: cartItems.map(item => `${item.quantity}x ${item.name}`).join(", "),
        };

        console.log(templateParams);

        try {
            await emailjs.send(
                contactConfig.YOUR_SERVICE_ID,
                contactConfig.YOUR_TEMPLATE_ID,
                templateParams,
                contactConfig.YOUR_USER_ID
            );
            console.log("Email de confirmation envoyé");
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
                    <h2 className='total-price'>{totalPrice} EUR</h2>
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
            <Grid item xs={12} md={6} >
                <form className='form-checkout' onSubmit={handleSubmit} style={{ maxWidth: 300 }}>
                    <h2>Vos informations</h2>
                    <Box my={2}>
                        <input style={{padding: "1rem", width:"85%", marginTop:".5rem"}} type="text" name="firstName" value={customerInfo.firstName} onChange={handleInputChange} placeholder="Prénom" required />
                        <input style={{padding: "1rem", width:"85%", marginTop:".5rem"}} type="text" name="lastName" value={customerInfo.lastName} onChange={handleInputChange} placeholder="Nom de famille" required />
                        <input style={{padding: "1rem", width:"85%", marginTop:".5rem"}} type="email" name="email" value={customerInfo.email} onChange={handleInputChange} placeholder="Adresse email" required />
                        <input style={{padding: "1rem", width:"85%", marginTop:".5rem"}} type="mobile" name="mobile" value={customerInfo.mobile} onChange={handleInputChange} placeholder="Numéro de téléphone" required />

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
                            </Select>
                        </FormControl>
                    </Box>

                    <Typography variant="h6">Paiement</Typography>
                    <Box my={2}>
                        <CardElement className="input-bank-card" options={{ hidePostalCode: true }} />
                    </Box>
                    <Button type="submit" variant="contained" color="primary" disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : "Payer"}
                    </Button>
                </form>
            </Grid>

            {showPopup && (
                <Link to='/'>
                    <Popup message={popupMessage} onClose={() => setShowPopup(false)}>

                        <button >
                            Fermer
                        </button>

                    </Popup> 
                </Link>   
                
            )}
        </div>
    );
}

export default CheckoutForm;
