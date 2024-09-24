import React, { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom"; // Assurez-vous que react-router-dom est installé
import { LoginContext } from "../../../context/login.context";
import TabsDashboard from '../../../components/Dashboard/Tabs/Tabs.jsx'; // Composant des onglets
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import './Dashboard.css';

function Dashboard() {
    const { userConnected } = useContext(LoginContext); // Récupérer l'utilisateur connecté
    const navigate = useNavigate(); // Utilisé pour la redirection

    // Fonction de déconnexion
    const handleLogout = () => {
        localStorage.removeItem('token'); // Supprimer le token
        navigate('/admin/login'); // Rediriger vers la page de connexion
    };

    // Vérification si l'utilisateur est connecté
    useEffect(() => {
        if (!userConnected) {
            // Si l'utilisateur n'est pas connecté, redirection vers la page de connexion
            navigate('/admin/login');
        }
    }, [userConnected, navigate]); // L'effet s'exécute lorsque l'état de `userConnected` change

    // Si l'utilisateur n'est pas défini ou n'est pas connecté, on ne montre rien ou un message de chargement
    if (!userConnected) {
        return <div>Chargement...</div>; // Optionnel : un écran de chargement temporaire
    }

    return (
        <div className='dashboard'>
            {/* Barre de navigation supérieure */}
            <AppBar position="static" color="bisque">
                <Toolbar>
                    <Typography variant="h6" color='#895832' component="div" sx={{ flexGrow: 1 }}>
                        <img 
                            style={{ width: '40px', height: '40px' }} 
                            src={process.env.PUBLIC_URL + '/hathyre-logo.png'} 
                            alt="Logo Hathyre" 
                        /> 
                    </Typography>
                    <Button color="#895832" onClick={handleLogout}>
                        Se déconnecter
                    </Button>
                </Toolbar>
            </AppBar>

            {/* Contenu principal avec les onglets */}
            <Box>
                <TabsDashboard /> {/* Composant des onglets avec utilisateurs, produits, etc. */}
            </Box>
        </div>
    );
}

export default Dashboard;
