import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShareNodes, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './SingleProduct.css';
import Buttons from "../Button/Button";

function SingleProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [count, setCount] = useState(1);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/product/${id}`)
        .then(response => {
            setProduct(response.data);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération du produit:', error);
            // Redirigez l'utilisateur vers une page d'erreur ou une autre page en cas d'erreur de récupération des données du produit
            navigate('/error');
        });
    }, [id, navigate]);
    
    
  // Fonction pour incrémenter le compteur
  const increment = () => {
    setCount(count + 1);
  };

  // Fonction pour décrémenter le compteur (mais pas en dessous de 1)
  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

    // Ajouter 'id' et 'navigate' comme dépendances

    return (
        <>

            {product && (
                <div className="page-product">

                    <div className="area-product">
                    <img src={product.image} alt={product.name}/>
                    
                    {/* Affichez d'autres informations sur le produit selon vos besoins */}
                    <div className="info-product-single">

                        <div>
                            <h1>{product.name}</h1>
                            {!product.promo && (
                                <h2>{product.price} EUR</h2>
                            )}
                        
                            {product.promo && (
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
                            <input value={count}/>
                            <button onClick={increment}><FontAwesomeIcon icon={faPlus} /></button>
                        </div>



                        <div>
                            <h3>
                                {/* Stock : {product.stock}     */}

                                {product.stock < 100 && (
                                     <span className="important">Bientôt en rupture</span>
                                )}
    
                            </h3>
                        </div>
                        
                        <div className="button-action">
                            <Buttons text ="Ajouter au panier"/>
                            <Buttons text ="Voir mon panier"/>
                        </div>

                        <div className="button-action">
                            <button><FontAwesomeIcon icon={faHeart} /></button>
                            <button><FontAwesomeIcon icon={faShareNodes} /></button>
                        </div>


                        

                    </div>

                    </div>
                    
                </div>
            )}
        </>
    );
};

export default SingleProduct;
