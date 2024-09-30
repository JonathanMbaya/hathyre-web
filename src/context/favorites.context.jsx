import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { LoginContext } from './login.context';

// Créer le contexte des favoris
export const FavoritesContext = createContext({
    favoriteItems: [],
    addToFavorites: () => {},
    removeFromFavorites: () => {},
});


// Fournisseur de contexte pour les favoris
export const FavoritesProvider = ({ children }) => {
    const { userConnected } = useContext(LoginContext);
    const [favoriteItems, setFavoriteItems] = useState([]);

    // Charger les favoris de l'utilisateur au montage du composant
    useEffect(() => {
        const loadFavorites = async () => {
            if (userConnected) {
                try {
                    const response = await axios.get(`https://hathyre-server-api.onrender.com/api/favorites/${userConnected._id}`);
                    setFavoriteItems(response.data.favorites);
                } catch (error) {
                    console.error("Erreur lors de la récupération des favoris :", error);
                }
            }
        };
        loadFavorites();
    }, [userConnected]);

    // Ajouter un produit aux favoris
    const addToFavorites = async (productId) => {
        try {
            await axios.post(`https://hathyre-server-api.onrender.com/api/favorites/${userConnected._id}/add`, { productId });
            setFavoriteItems([...favoriteItems, productId]);
        } catch (error) {
            console.error("Erreur lors de l'ajout du produit aux favoris :", error);
        }
    };

    // Supprimer un produit des favoris
    const removeFromFavorites = async (productId) => {
        try {
            await axios.delete(`https://hathyre-server-api.onrender.com/api/favorites/${userConnected._id}/remove/${productId}`);
            setFavoriteItems(favoriteItems.filter(item => item !== productId));
        } catch (error) {
            console.error("Erreur lors de la suppression du produit des favoris :", error);
        }
    };

    return (
        <FavoritesContext.Provider value={{ favoriteItems, addToFavorites, removeFromFavorites }}>
            {children}
        </FavoritesContext.Provider>
    );
};