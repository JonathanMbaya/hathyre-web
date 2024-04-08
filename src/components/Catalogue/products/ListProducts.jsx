import React, {useEffect, useState}from 'react';
import axios from 'axios';
import "./Product.css";

function ListProducts() {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        // Effectuer la requête Axios pour récupérer les produits
        axios.get('http://localhost:5000/api/products')
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
                    <img
                        className='img-fluid'
                        src={process.env.PUBLIC_URL + `${product.image}`}
                        alt=""
                    />
                    <p>{product.name}</p>
                    <p>{product.price}</p>
                </div>
            ))}

        </div>
  );
}

export default ListProducts;
