import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Container, Grid, Typography, AccordionDetails, Accordion, AccordionSummary, TextField, Button, Select, MenuItem, InputLabel, FormControl, Box, CircularProgress } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faArrowCircleDown } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import Popup from '../PopUp/PopUp.jsx';
import { CartContext } from '../../context/card.context';
import { LoginContext } from '../../context/login.context.jsx';
import { contactConfig } from '../../utils/config.email.js';
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"; // Importation de PayPal
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
        complement: '',
        city: '',
        postalCode: '',
        country: '',
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
                    line2: customerInfo.complement,
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
                complement: customerInfo.complement,
                city: customerInfo.city,
                postalCode: customerInfo.postalCode,
                country: customerInfo.country,
                articles: cartItems.map(item => ({
                    productId: item._id,
                    productName: item.name,
                    productImage: item.imageUrl,
                    quantity: item.quantity,
                    price: item.price
                })),
                amount: totalPrice,
                date: new Date(),
                status: 'En cours de préparation',
                paymentMethod: id, // Envoyer l'ID de la méthode de paiement
                userId: userConnected?._id,
            });

            if (response.data.success) {
                console.log('Paiement réussi !');
            } else if (response.data.requires_action) {
                // Rediriger l'utilisateur vers l'URL d'authentification
                window.location.href = response.data.next_action.redirect_to_url.url;
            } else {
                console.log('Erreur lors du paiement');
            }

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
            complement: customerInfo.complement,
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
        <div className='resume-checkout'>

            {/* Partie récapitulatif */}
            <div className='form-checkout recap' style={{ maxWidth: 400 }}>
                <h2>Votre panier</h2>
                <div className='recap-products'>
                    <h2 className='total-price'>{parseFloat(totalPrice.toFixed(2))} EUR</h2>
                    {totalProduct > 1 ? <p>{totalProduct} Articles</p> : <p>{totalProduct} Article</p>}
                    {cartItems.map((item, index) => (
                        <div className='recap-product-card' key={index}>

                            <div>
                                <div style={{
                                    position: 'relative',
                                    display:'flex',
                                    justifyContent:'center',
                                    alignItems:'center',
                                    zIndex:'10000 !important',
                                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                    borderRadius: '12px',
                                    padding: '4px',
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    height:'10px',
                                    width:'10px',
                                }}>{item.quantity}</div>
                                <img style={{width: '30px', height: '30px', objectFit: 'cover', borderRadius: '4px'}} src={item.image} alt={item.name}/>
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
                <Accordion>
                    <AccordionSummary expandIcon={<FontAwesomeIcon icon={faArrowCircleDown}/>}>
                        <Typography variant="h6">1. Coordonnées</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <form className='form-checkout' onSubmit={handleStripeSubmit}>
                            <Box my={2}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label="Prénom"
                                            name="firstName"
                                            value={customerInfo.firstName}
                                            onChange={handleInputChange}
                                            required
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label="Nom"
                                            name="lastName"
                                            value={customerInfo.lastName}
                                            onChange={handleInputChange}
                                            required
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
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
                                    </Grid>
                                    <Grid item xs={12}>
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
                                    </Grid>
                                </Grid>
                                
                            </Box>
                        </form>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary expandIcon={<FontAwesomeIcon icon={faArrowCircleDown}/>}>
                        <Typography variant="h6">2. Livraison</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box my={2}>
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
                                label="Complément (Appart, Bis ...)"
                                name="complement"
                                value={customerInfo.complement}
                                onChange={handleInputChange}
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
                                    <MenuItem value="BE">Belgique</MenuItem>
                                    <MenuItem value="CH">Suisse</MenuItem>
                                    {/* Ajoutez d'autres pays si nécessaire */}
                                </Select>
                            </FormControl>
                        </Box>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary expandIcon={<FontAwesomeIcon icon={faArrowCircleDown}/>}>
                        <Typography variant="h6">3. Moyen de paiement</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box my={2}>
                            <CardElement className="input-bank-card" options={{ hidePostalCode: true }} />
                        </Box>
                        <Button onClick={handleStripeSubmit} style={{marginBottom: "2rem"}} type="submit" variant="contained" color="primary" disabled={loading} fullWidth>
                            {loading ? <CircularProgress size={24} /> : "Payer par carte"}
                        </Button>
                        <div className='second-area-footer'>
                            <div className='icon-money'>
                                <img src={process.env.PUBLIC_URL + '/money-way/cc-visa.svg'} alt="Logo Hathyre" />
                                <img src={process.env.PUBLIC_URL + '/money-way/cc-mastercard.svg'} alt="Logo Hathyre" />
                                <img src={process.env.PUBLIC_URL + '/money-way/cc-paypal.svg'} alt="Logo Hathyre" />
                                <img src={process.env.PUBLIC_URL + '/money-way/cc-stripe.svg'} alt="Logo Hathyre" />
                            </div>
                        </div>
                    </AccordionDetails>
                </Accordion>

                <Container maxWidth="md" style={{ margin: '1rem auto' }}>

                    <Typography 
                        variant="body2" 
                        paragraph 
                        style={{ fontSize: '0.5rem', lineHeight: '1.2' }} // Ajustement de la taille de la police
                    >
                        En créant un compte ou en passant commande sur Hathyre, vous acceptez nos
                        <Link to="/conditions-ventes" color="primary" style={{ marginLeft: '0.5rem' }}>
                            Conditions Générales de Vente
                        </Link>. <br /> 
                        Vous consentez au traitement de vos données personnelles, conformément à notre 
                        <Link to="/politique-de-confidentialite" color="primary" style={{ marginLeft: '0.5rem' }}>
                            Politique de Confidentialité
                        </Link>.
                    </Typography>
                    <Typography 
                        variant="body2" 
                        paragraph 
                        style={{ fontSize: '0.5rem', lineHeight: '1.2' }} // Ajustement de la taille de la police
                    >
                        Les informations vous concernant sont destinées à notre société Hathyre, responsable du traitement, afin de traiter vos commandes et de vous envoyer des offres et communications Hathyre par email ou SMS.
                    </Typography>
                    <Typography 
                        variant="body2" 
                        paragraph 
                        style={{ fontSize: '0.5rem', lineHeight: '1.2' }} // Ajustement de la taille de la police
                    >
                        Conformément à la réglementation sur les données personnelles, vous disposez d’un droit d’accès, de rectification et d’opposition au traitement de vos données. Pour exercer vos droits, il vous suffit de nous contacter via ce formulaire en indiquant votre nom, prénom, adresse, email et un justificatif d’identité. Vous pouvez vous désinscrire à tout moment en cliquant sur le lien de désinscription inclus dans toutes nos communications.
                    </Typography>
                    <Typography 
                        variant="body2" 
                        paragraph 
                        style={{ fontSize: '0.5rem', lineHeight: '1.2' }} // Ajustement de la taille de la police
                    >
                        Pour plus d’informations, n’hésitez pas à consulter notre page 
                        <Link to="/faq" color="primary" style={{ marginLeft: '0.5rem' }}>
                            Questions Fréquemment Posées
                        </Link>.
                    </Typography>
                </Container>
            
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
