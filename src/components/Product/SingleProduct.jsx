import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import axios from 'axios';
import './SingleProduct.css';
import ButtonToBasket from "../Button/ButtonToBasket";
import Products from "./Products";

function SingleProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true); // État de chargement
    const [count, setCount] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://hathyre-server-api.onrender.com/api/product/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération du produit:', error);
                navigate('/error');
            } finally {
                setLoading(false); // Fin du chargement
            }
        };

        fetchProduct();
    }, [id, navigate]);

    // Fonction pour incrémenter le compteur
    const increment = () => {
        setCount(prevCount => prevCount + 1);
    };

    // Fonction pour décrémenter le compteur (mais pas en dessous de 1)
    const decrement = () => {
        if (count > 1) {
            setCount(prevCount => prevCount - 1);
        }
    };


    if (loading) {
        return <div>Chargement...</div>; // Message de chargement
    }

    return (
        <>
            {product && (
                <div style={{ marginTop: '30vh' }} className="page-product">
                    <div className="area-product">
                        <img src={product.image} alt={product.name} />

                        <div className="info-product-single">
                            <div>
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

                            <div>
                                <h3>Description</h3>
                                <p>{product.description}</p>
                            </div>

                            <div className="counter">
                                <button onClick={decrement}><FontAwesomeIcon icon={faMinus} /></button>
                                <input value={count} readOnly />
                                <button onClick={increment}><FontAwesomeIcon icon={faPlus} /></button>
                            </div>

                            <div>
                                <h3>
                                    {product.stock < 100 && (
                                        <span className="important">Bientôt en rupture</span>
                                    )}
                                </h3>
                            </div>

                            <div className="button-action">
                                <ButtonToBasket getProductId={product._id} count={count} />
                            </div>

                            <div style={{width: '100%'}}>
                                <h3>Informations sur le produit</h3>
                                
                                    
                                <Accordion sx={'25%'}>
                                    <AccordionSummary
                                        expandIcon={<FontAwesomeIcon icon={faChevronDown}/>}
                                        aria-controls={`panel-content`}
                                        id={`panel-header`}
                                    >
                                        Ingredients
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {product.ingredients}
                                    </AccordionDetails>
                                </Accordion>

                                <Accordion sx={'25%'}>
                                    <AccordionSummary
                                        expandIcon={<FontAwesomeIcon icon={faChevronDown} />}
                                        aria-controls={`panel-content`}
                                        id={`panel-header`}
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

                    <Products />
                </div>
            )}
        </>
    );
}

export default SingleProduct;
