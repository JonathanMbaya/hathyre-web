import React, { createContext, useState } from 'react';
import axios from 'axios';

// Créer le contexte du panier
export const CartContext = createContext({
    cartItems: [],
    addToCart: () => {},
    removeFromCart: () => {},
});

// Créer le fournisseur de contexte du panier
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]); // État pour stocker les éléments du panier

    // Fonction pour ajouter un produit au panier
    const addToCart = async (productId) => {
        try {
            // Faire la requête Axios pour récupérer les informations du produit
            const response = await axios.get(`https://hathyre-server-api.onrender.com/api/product/${productId}`);
            const product = response.data; // Récupérer les données du produit depuis la réponse

            // Vérifier si le produit existe déjà dans le panier
            const existingProductIndex = cartItems.findIndex(item => item._id === product._id);
            if (existingProductIndex !== -1) {
                // Si le produit existe déjà, incrémentez sa quantité
                const updatedCartItems = [...cartItems];
                updatedCartItems[existingProductIndex].quantity += 1;
                setCartItems(updatedCartItems);
            } else {
                // Sinon, ajoutez le nouveau produit au panier
                setCartItems([...cartItems, { ...product, quantity: 1 }]);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des informations du produit :", error);
        }
    };

    // Fonction pour supprimer un produit du panier
    const removeFromCart = (productId) => {
        const updatedCartItems = cartItems.map(item => {
            if (item._id === productId) {
                // Vérifier si la quantité est supérieure à 1
                if (item.quantity > 1) {
                    // Réduire la quantité de 1
                    return { ...item, quantity: item.quantity - 1 };
                } else {
                    // Supprimer complètement l'élément
                    return null;
                }
            }
            return item;
        }).filter(Boolean); // Filtrer les éléments null (c'est-à-dire ceux dont la quantité est devenue 0)
        
        setCartItems(updatedCartItems);
    };
    

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
