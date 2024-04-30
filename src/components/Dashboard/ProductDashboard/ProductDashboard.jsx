import React, {useEffect, useState}from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
// import { LoginContext } from "../../../context/login.context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

const ProductDashboard = () => {

    const {id , token} = useParams();

    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Effectuer la requête Axios pour récupérer les produits
        axios.get('https://hathyre-server-api.onrender.com/api/products')
          .then(response => {
            // Mettre à jour l'état avec les produits récupérés
            setProducts(response.data);
          })

          .catch(error => {
            console.error('Erreur lors de la récupération des produits :', error);
          });
          
    }, []);

    const handleDeleteProduct = (id) => {
        axios.delete(`https://hathyre-server-api.onrender.com/api/delete/product/${id}`)
            .then(response => {
                console.log('Produit supprimé avec succès');
                // Mettre à jour l'état des produits après la suppression
                setProducts(products.filter(product => product._id !== id));
            })
            .catch(error => {
                console.error('Erreur lors de la suppression du produit :', error);
            });
    };

    return (
        <>
            <div className='board'>
                
                <div className='head-dash'>
                    <h3 style={{ marginLeft: '5%' }}>Nos Produits</h3>
                    <Link to={`/admin/dashboard/product/add/${id}/${token}`}>
                        <span>Ajouter un produit <FontAwesomeIcon icon={faPlus} /></span>
                    </Link>
                </div>


                <table className="product-table">
                    <thead>
                        <tr>
                        <th>Référence</th>
                        <th>Nom du produit</th>
                        <th>Prix du produit</th>
                        <th>Description</th>
                        <th>Promotion</th>
                        <th>Likes</th>
                        <th>Mis à jour</th>
                        <th>Modifier</th>
                        <th>Supprimer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.description}</td>
                            <td>{product.promo} %</td>
                            <td>{product.likes}</td>
                            <td>{product.updatedAt}</td>

                            <td>
                            <a href={`/admin/dashboard/product/edit/${product._id}`}>
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </a>

                                
                            </td>

                            <td><FontAwesomeIcon onClick={()=>handleDeleteProduct(product._id)} icon={faTrash} /></td>
                        </tr>
                        ))}
                    </tbody>
                </table>


            </div>
                        
        </>
    );
};

export default ProductDashboard;