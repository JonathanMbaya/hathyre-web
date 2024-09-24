import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

// Créer le contexte de connexion
export const LoginContext = createContext({
    userConnected: null,
    setUserConnected: () => {},
});

// Créer le fournisseur de contexte
export const LoginProvider = ({ children }) => { // Utilisez children comme argument au lieu de user et setUser
    const [loggedInUser, setLoggedInUser] = useState(null); // Utilisez un nom différent pour éviter la redéclaration de user et setUser

    useEffect(() => {
        const fetchUserData = async () => {
            const storedToken = localStorage.getItem('token');
            const id = localStorage.getItem('id');
            if (storedToken && id) {
                try {
                    const response = await axios.get(`http://localhost:8080/api/user/${id}`, {
                        headers: {
                            Authorization: `Bearer ${storedToken}`
                        }
                    });
                    setLoggedInUser(response.data); // Utilisez setLoggedInUser pour mettre à jour l'état
                } catch (error) {
                    console.error("Erreur lors de la récupération des informations de l'utilisateur :", error);
                    // En cas d'erreur, déconnectez l'utilisateur et supprimez les informations de connexion du stockage local
                    setLoggedInUser(null); // Utilisez setLoggedInUser pour mettre à jour l'état
                    localStorage.removeItem('token');
                    localStorage.removeItem('id');
                }
            }
        };

        fetchUserData();

    }, []);

    return (
        <LoginContext.Provider value={{ userConnected: loggedInUser, setUserConnected: setLoggedInUser }}>
            {children}
        </LoginContext.Provider>
    );
};
