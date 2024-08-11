import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ButtonToBasket from '../Button/ButtonToBasket';
import axios from 'axios';
import './products.css';
import 'animate.css';

function Products({ title }) {
    const [products, setProducts] = useState([]);
    const location = useLocation();

    useEffect(() => {
        // Effectuer la requête Axios pour récupérer les produits triés par date
        axios.get('https://hathyre-server-api.onrender.com/api/products/latest=true')
            .then(response => {
                // Mettre à jour l'état avec les produits récupérés
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des produits :', error);
            });
    
    }, []);

    

    return (
        <div className="container animate__animated animate__fadeInUp">
            <h2 >{title}</h2>
            {location.pathname.startsWith('/product/') && 
                <h2>Ces produits pourraient vous intéressez</h2>
            }

            <div className="row">
                {products.map(product => (
                    
                        <div key={product._id} className="box">
                            <span>Nouveauté</span>
                            <Link className='link-without-decoration' to={`/product/${product._id}`}>
                                <img src={process.env.PUBLIC_URL + product.image} alt={product.name} />
                            </Link>
                                <div className='info-home-product'>
                                    <h3>{product.name} <br /> <span>Savon</span></h3>
                                    <div className='info-home-action-product'>
                                        <h4>{product.price} EUR</h4>
                                        
                                        <ButtonToBasket getProductId={product._id} />

                                    </div>
                                </div>

                        </div>
                ))}
            </div>

        </div>
    );
};

export default Products;
