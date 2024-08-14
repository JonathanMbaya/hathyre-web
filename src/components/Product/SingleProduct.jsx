import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './SingleProduct.css';
import ButtonToBasket from "../Button/ButtonToBasket";
import Products from "./Products";

function SingleProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    // const [count, setCount] = useState(1);

    useEffect(() => {
        axios.get(`https://hathyre-server-api.onrender.com/api/product/${id}`)
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
//   const increment = () => {
//     setCount(count + 1);
//   };

//   // Fonction pour décrémenter le compteur (mais pas en dessous de 1)
//   const decrement = () => {
//     if (count > 1) {
//       setCount(count - 1);
//     }
//   };

    // Ajouter 'id' et 'navigate' comme dépendances

    const faqData = [
        {
            question: 'Comment puis-je m\'inscrire?',
            answer: 'Pour vous inscrire, cliquez sur le bouton "S\'inscrire" en haut de la page et remplissez le formulaire d\'inscription.',
        },
        {
            question: 'Quels sont les modes de paiement acceptés?',
            answer: 'Nous acceptons les cartes de crédit, PayPal et les virements bancaires.',
        },
        {
            question: 'Comment puis-je suivre ma commande?',
            answer: 'Vous pouvez suivre votre commande en vous connectant à votre compte et en accédant à la section "Mes commandes".',
        },
    ];

    const [activeIndex, setActiveIndex] = useState(null);

    const handleToggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };


    return (
        <>

            {product && (
                <div style={{marginTop: '30vh'}} className="page-product">

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
{/* 
                            <div className="counter">
                                <button onClick={decrement}><FontAwesomeIcon icon={faMinus} /></button>
                                <input value={count}/>
                                <button onClick={increment}><FontAwesomeIcon icon={faPlus} /></button>
                            </div> */}



                            <div>
                                <h3>
                                    {/* Stock : {product.stock}     */}

                                    {product.stock < 100 && (
                                        <span className="important">Bientôt en rupture</span>
                                    )}
        
                                </h3>
                            </div>
                            
                            <div className="button-action">
                                <ButtonToBasket getProductId={product._id} />
                            </div>

                            <div className='page-faq'>
                                <h3 style={{padding : '2rem'}}>Informations sur le produit</h3>
                                <div className="faq">
                                    {faqData.map((item, index) => (
                                        <div key={index} className="item-faq">
                                            <div
                                                className="title-faq"
                                                onClick={() => handleToggle(index)}
                                            >
                                                {item.question}                             
                                                
                                                {activeIndex === index ? (
                                                    <FontAwesomeIcon icon={faMinus} />
                                                ) : (
                                                    <FontAwesomeIcon icon={faPlus} />
                                                )}
                                                
                                            </div>
                                            {activeIndex === index && (
                                                <p className="text-faq">
                                                    {item.answer}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            

                        </div>

                    </div>

                    
                    <Products/>
                    
                </div>
            )}
        </>
    );
};

export default SingleProduct;
