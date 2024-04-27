import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

// Créer le contexte de connexion
export const LoginContext = createContext({
    user: [],
    login: () => {},
});

// Créer le fournisseur de contexte
export const LoginProvider = ({ children }) => {
    const [user, setUser] = useState([]);

    useEffect(() => {

        const fetchUserData = async () => {
            const storedToken = localStorage.getItem('token');
            const id = localStorage.getItem('id');
            if (storedToken && id) {
                try {
                    const response = await axios.get(`https://hathyre-server-api.onrender.com/api/user/${id}`, {
                        headers: {
                            Authorization: `Bearer ${storedToken}`
                        }
                    });
                    console.log(response.data);
                    setUser(response.data);
                } catch (error) {
                    console.error("Erreur lors de la récupération des informations de l'utilisateur :", error);
                }
            }
        };

        fetchUserData();

    }, [user]);

    return (
        <LoginContext.Provider value={{ user}}>
            {children}
        </LoginContext.Provider>
    );
};

