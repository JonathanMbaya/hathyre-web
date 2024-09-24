import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { LoginContext } from './login.context';


// Créer le contexte des achats
export const PurchaseContext = createContext({
    purchaseHistory: [],
    placeOrder: () => {},
});


// Fournisseur de contexte pour les achats
export const PurchaseProvider = ({ children }) => {
    const { userConnected } = useContext(LoginContext);
    const [purchaseHistory, setPurchaseHistory] = useState([]);

    // Charger l'historique des achats de l'utilisateur au montage du composant
    useEffect(() => {
        const loadPurchaseHistory = async () => {
            if (userConnected) {
                try {
                    const response = await axios.get(`https://hathyre-server-api.onrender.com/api/purchases/${userConnected._id}`);
                    setPurchaseHistory(response.data.purchases);
                } catch (error) {
                    console.error("Erreur lors de la récupération des achats :", error);
                }
            }
        };
        loadPurchaseHistory();
    }, [userConnected]);

    // Passer une commande
    const placeOrder = async (orderDetails) => {
        try {
            const response = await axios.post(`https://hathyre-server-api.onrender.com/api/purchases/${userConnected._id}/add`, orderDetails);
            setPurchaseHistory([...purchaseHistory, response.data.newPurchase]);
        } catch (error) {
            console.error("Erreur lors du passage de la commande :", error);
        }
    };

    return (
        <PurchaseContext.Provider value={{ purchaseHistory, placeOrder }}>
            {children}
        </PurchaseContext.Provider>
    );
};
