import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';




// Créer le contexte de connexion
export const LoginContext = createContext({
    userConnected: [],
    setUserConnected: () => {},
});

// Créer le fournisseur de contexte
export const LoginProvider = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const storedToken = localStorage.getItem('token');
            const id = localStorage.getItem('id');
            if (storedToken && id) {
                try {
                    const response = await axios.get(`https://hathyre-server-api.onrender.com/api/client/${id}`, {
                        headers: {
                            Authorization: `Bearer ${storedToken}`
                        }
                    });
                    setLoggedInUser(response.data);

                } catch (error) {
                    console.error("Erreur lors de la récupération des informations de l'utilisateur :", error);
                    // Déconnexion en cas d'erreur
                    localStorage.removeItem('token');
                    localStorage.removeItem('id');
                    setLoggedInUser(null);
                }
            }
            
            // else(!storedToken ? navigate('/') : navigate('/error'))
        };

        fetchUserData();
    }, [navigate]);

    return (
        <LoginContext.Provider value={{ userConnected: loggedInUser, setUserConnected: setLoggedInUser }}>
            {children}
        </LoginContext.Provider>
    );
};
