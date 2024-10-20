import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from "../../context/card.context";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import axios from 'axios';
import './SingleProduct.css';
import Products from "./Products";

function SingleProduct() {
    const { id } = useParams(); // Récupère l'ID du produit depuis les paramètres d'URL
    const { addToCart } = useContext(CartContext); // Fonction pour ajouter un produit au panier
    const navigate = useNavigate(); // Pour la navigation
    const [product, setProduct] = useState(null); // Stocke les détails du produit
    const [loading, setLoading] = useState(true); // État de chargement
    const [count, setCount] = useState(1); // Nombre d'articles à ajouter au panier

    // Fonction de gestion du clic pour ajouter au panier
    const handleAddToCart = (productId) => {
        addToCart(productId, count); // Ajoute le produit avec la quantité spécifiée
    };

    // Récupération du produit par son ID via l'API
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://hathyre-server-api.onrender.com/api/product/${id}`);
                setProduct(response.data); // Mise à jour de l'état avec les données du produit
            } catch (error) {
                console.error('Erreur lors de la récupération du produit:', error);
                navigate('/error'); // Redirection vers une page d'erreur en cas de problème
            } finally {
                setLoading(false); // Fin du chargement
            }
        };

        fetchProduct();
    }, [id, navigate]);

    // Fonction pour incrémenter la quantité
    const increment = () => {
        setCount(prevCount => prevCount + 1);
    };

    // Fonction pour décrémenter la quantité (mais pas en dessous de 1)
    const decrement = () => {
        if (count > 1) {
            setCount(prevCount => prevCount - 1);
        }
    };

    // Si le produit est encore en cours de chargement, afficher un message
    if (loading) {
        return <div>Chargement...</div>; // Message de chargement
    }

    return (
        <>
            {product && (
                <div className="page-product">
                    <div className="area-product">
                        <div className="image">
                            <img src={product.image} alt={product.name} />
                            <img style={{width:"50px", height: "auto"}} src={product.image2} alt={product.name} />
                        </div>


                        <div className="info-product-single">
                            <div className="title-product">
                                <h1>{product.name}</h1>
                                {!product.promo ? (
                                    <h2>{product.price} EUR</h2>
                                ) : (
                                    <div className="promo">
                                        <h2>
                                            {product.price - (product.price * (product.promo / 100))} EUR <span className="important">-{product.promo}%</span>
                                        </h2>
                                        <h4>{product.price} EUR</h4>
                                    </div>
                                )}
                            </div>

                            {/* Gestion du compteur */}
                            <div className="counter">
                                <button onClick={decrement}><FontAwesomeIcon icon={faMinus} /></button>
                                    <p style={{width: "30px", textAlign:"center"}}>{count}</p>
                                <button onClick={increment}><FontAwesomeIcon icon={faPlus} /></button>
                            </div>

                            {/* Affichage du stock faible */}
                            <div>
                                <h3>
                                    {product.stock < 100 && (
                                        <span className="important">Bientôt en rupture</span>
                                    )}
                                </h3>
                            </div>

                            {/* Bouton pour ajouter au panier */}
                            <div className="button-action">
                                <button onClick={() => handleAddToCart(product._id)} count={count}>
                                    Ajouter au panier <FontAwesomeIcon icon={faPlus} />
                                </button>
                            </div>

                            <div>
                                <h3>Description</h3>
                                <p>{product.description}</p>
                            </div>

                            {/* Informations supplémentaires avec Accordion */}
                            <div className="info-product">
                                <h3>Informations sur le produit</h3>
                                
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<FontAwesomeIcon icon={faChevronDown}/>}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        Ingredients
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {product.ingredients}
                                    </AccordionDetails>
                                </Accordion>

                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<FontAwesomeIcon icon={faChevronDown} />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                    >
                                        Conseils
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {product.conseils}
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        </div>
                    </div>

                    {/* Affichage de produits supplémentaires */}
                    <Products />
                </div>
            )}
        </>
    );
}

export default SingleProduct;
