import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faTrash, faPlus, faArrowDownWideShort } from '@fortawesome/free-solid-svg-icons';

const ProductDashboard = () => {
    const { id, token } = useParams();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState(''); // Catégorie sélectionnée
    const [searchTerm, setSearchTerm] = useState(''); // Terme de recherche

    useEffect(() => {
        // Requête Axios pour récupérer les produits
        axios.get('https://hathyre-server-api.onrender.com/api/products')
            .then(response => {
                setProducts(response.data);
                setFilteredProducts(response.data); // Initialiser la liste filtrée avec tous les produits
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des produits :', error);
            });
    }, []);

    useEffect(() => {
        // Filtrer les produits en fonction de la catégorie et du terme de recherche
        let filtered = products;

        if (categoryFilter) {
            filtered = filtered.filter(product => product.category === categoryFilter);
        }

        if (searchTerm) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredProducts(filtered);
    }, [categoryFilter, searchTerm, products]);

    const handleDeleteProduct = (id) => {
        axios.delete(`https://hathyre-server-api.onrender.com/api/delete/product/${id}`)
            .then(response => {
                console.log('Produit supprimé avec succès');
                setProducts(products.filter(product => product._id !== id));
            })
            .catch(error => {
                console.error('Erreur lors de la suppression du produit :', error);
            });
    };

    return (
        <>
            <div className='board'>
                <div className="table-responsive">
                    <div style={{ backgroundColor: 'white', borderRadius: '.5rem .5rem 0 0' }} className='head-dash'>
                        <h3 style={{ margin: '.5rem' }}>Produits</h3>
                        <Link to={`/admin/dashboard/product/add/${id}/${token}`}>
                            <button style={{ margin: '.5rem', borderRadius: '.5rem' }}>
                                Ajouter un produit <FontAwesomeIcon icon={faPlus} />
                            </button>
                        </Link>
                    </div>

                    {/* Barre de recherche */}
                    <div className='filter-admin'>

                        <div className="search-filter">
                            <input
                                type="text"
                                placeholder="Rechercher un produit..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Boutons de filtre par catégorie */}
                        <div className="category-filters">
                            <button>
                                Filtre <FontAwesomeIcon icon={faArrowDownWideShort} />
                            </button>
                            <button onClick={() => setCategoryFilter('')}>Tous</button>
                            <button onClick={() => setCategoryFilter('Savon')}>Savon</button>
                            <button onClick={() => setCategoryFilter('Beurres et huiles')}>Beurres et huiles</button>
                            <button onClick={() => setCategoryFilter('Accessoires')}>Accessoires</button>
                        </div>

                    </div>

                </div>


                <div className='table-responsive'>
                    <table className='users-table'>
                        <thead>
                            <tr>
                                <th>Référence</th>
                                <th>Nom du produit</th>
                                <th>Prix du produit</th>
                                <th>Promotion</th>
                                <th>Categorie</th>
                                <th>Mis à jour</th>
                                <th>Supprimer</th>
                                <th>Modifier / Détails</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredProducts.map(product => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price} EUR</td>
                                    <td>{product.promo} %</td>
                                    <td>{product.category}</td>
                                    <td>{new Date(product.updatedAt).toLocaleDateString()}</td>
                                    <td>
                                        <FontAwesomeIcon onClick={() => handleDeleteProduct(product._id)} icon={faTrash} />
                                    </td>
                                    <td>
                                        <Link to={`/admin/dashboard/product/edit/${product._id}`}>
                                            <FontAwesomeIcon icon={faEllipsis} />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


            </div>
        </>
    );
};

export default ProductDashboard;
