import React, { useContext, useEffect, useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Grid, Box } from '@mui/material';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash , faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { LoginContext } from '../../context/login.context.jsx'; // Contexte utilisateur connecté
import { CartContext } from '../../context/card.context.jsx'; // Contexte du panier
import { FavoritesContext } from '../../context/favorites.context.jsx'; // Contexte des favoris

function MyFavorites() {
    const { userConnected } = useContext(LoginContext); // Récupérer l'utilisateur connecté
    const { addToCart } = useContext(CartContext); // Contexte du panier pour ajouter au panier
    const { removeFromFavorites } = useContext(FavoritesContext); // Contexte des favoris pour retirer un produit des favoris
    const [favoriteProducts, setFavoriteProducts] = useState([]); // Pour stocker les infos des produits favoris

    // Charger les produits favoris à partir de l'API
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                if (userConnected) {
                    // Étape 1 : Récupérer les IDs des favoris de l'utilisateur
                    const response = await axios.get(`https://hathyre-server-api.onrender.com/api/favorites/${userConnected._id}`);
                    const favoriteIds = response.data.favorites; // Tableau d'IDs des produits favoris

                    // Étape 2 : Récupérer les détails de chaque produit favori
                    const productDetailsPromises = favoriteIds.map(async (productId) => {
                        const productResponse = await axios.get(`https://hathyre-server-api.onrender.com/api/product/${productId}`);
                        return productResponse.data;
                    });

                    // Attendre que toutes les requêtes soient terminées
                    const products = await Promise.all(productDetailsPromises);
                    setFavoriteProducts(products); // Mettre à jour les produits favoris avec les informations complètes
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des favoris :', error);
            }
        };

        fetchFavorites();
    }, [userConnected]);

    if (!userConnected) {
        return <Typography variant="h6">Veuillez vous connecter pour voir vos favoris.</Typography>;
    }

    // Fonction pour supprimer un produit des favoris
    const handleRemoveFromFavorites = async (productId) => {
        try {
            await removeFromFavorites(productId); // Supprimer le produit des favoris dans le contexte
            setFavoriteProducts(favoriteProducts.filter((product) => product._id !== productId)); // Mettre à jour la liste des produits favoris localement
        } catch (error) {
            console.error('Erreur lors de la suppression du produit des favoris :', error);
        }
    };

    // Fonction pour ajouter un produit au panier
    const handleAddToCart = (product) => {
        addToCart(product._id); // Ajouter le produit au panier via le contexte
    };

    return (
        <Box sx={{ padding: '2rem' }}>
            <h2>
                Mes favoris
            </h2>

            {favoriteProducts.length > 0 ? (
                <Grid container spacing={10}>
                    {favoriteProducts.map((product) => (
                        <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                            <Card sx={{maxWidth: "300px"}}>
                                <CardMedia
                                    component="img"
                                    height="150"
                                    image={product.image}
                                    alt={product.name}
                                />
                                <CardContent sx={{height: "100px"}}>
                                    <Typography variant="p" component="div">
                                        {product.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {product.price} EUR
                                    </Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                                        {/* Bouton pour ajouter au panier */}
                                        <button
                                            onClick={() => handleAddToCart(product)}
                                        >
                                            <FontAwesomeIcon icon={faBagShopping} />
                                        </button>

                                        {/* Bouton pour supprimer des favoris */}
                                        <button
                                            onClick={() => handleRemoveFromFavorites(product._id)}
                                        >
                                            <FontAwesomeIcon icon={faTrash}  />
                                        </button>
                                        

                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography variant="body1">Vous n'avez aucun produit en favori.</Typography>
            )}
        </Box>
    );
}

export default MyFavorites;
