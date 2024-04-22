import React , {useEffect} from 'react';
import {Outlet} from 'react-router-dom';
import { redirect } from "react-router";

function AuthGuardRoutes() {
    // Vérifier la présence du token dans le stockage local ou les cookies
    const token = localStorage.getItem('token');

    useEffect(() => {
        // Vérifier la présence du token avant de faire la requête
        if (!token) {
            console.log("Redirection vers /admin/login");
            throw redirect({
                to: "/admin/login"
            });
        }

    }, [token]);

    // Si le token est présent, autoriser l'accès aux enfants
    return token ? <Outlet /> : null;
}

export default AuthGuardRoutes;
