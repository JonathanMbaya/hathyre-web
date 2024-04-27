import React, {useEffect, useState}from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import "./Product.css";

function ListProducts() {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        // Effectuer la requête Axios pour récupérer les produits
        axios.get('https://hathyre-server-api.onrender.com/api/products')
          .then(response => {
            // Mettre à jour l'état avec les produits récupérés
            setProduct(response.data);
          })

          .catch(error => {
            console.error('Erreur lors de la récupération des produits :', error);
          });
          
    }, []);
  return (
        <div className="list-products">
            {product.map(product => (
                <div key={product._id} className="product">
                    <Link to={`/product/${product._id}`}>

                      <img
                        className='img-fluid'
                        src={process.env.PUBLIC_URL + `${product.image}`}
                        alt=""
                      />

                    </Link>

                    <p>{product.name}</p>
                    <p>{product.price}</p>
                </div>
            ))}

        </div>
  );
}

export default ListProducts;
