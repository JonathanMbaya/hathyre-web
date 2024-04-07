import React, {useEffect, useState}from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

const ProductDashboard = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Effectuer la requête Axios pour récupérer les produits
        axios.get('http://localhost:5000/api/products')
          .then(response => {
            // Mettre à jour l'état avec les produits récupérés
            setProducts(response.data);
          })

          .catch(error => {
            console.error('Erreur lors de la récupération des produits :', error);
          });
          
    }, []);

    const handleDeleteProduct = (id) => {
        axios.delete(`http://localhost:5000/api/delete/product/${id}`)
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
                    <a href="dashboard/product/add">
                        <span>Ajouter un produit <FontAwesomeIcon icon={faPlus} /></span>
                    </a>
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