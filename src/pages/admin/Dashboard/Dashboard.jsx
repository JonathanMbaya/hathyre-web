import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Tabs from '../../../components/Dashboard/Tabs/Tabs.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css';

function Dashboard() {
    const { id, token } = useParams();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/user/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des informations de l'utilisateur :", error);
            }
        };

        fetchUserData();
    }, [id, token, navigate]);

    useEffect(() => {
        // Vérifier la présence du token dans le stockage local
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
            // Rediriger vers la page de connexion
            navigate('/admin/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        // Effacer le token JWT stocké localement
        localStorage.removeItem('token');
        // Rediriger vers la page de connexion après la déconnexion
        navigate('/admin/login');
    };

    return (
        <div className='dashboard underlay' style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/admin-background/form-background.png)` }}>
            <div className='head-dash'>
                <h1 style={{ marginLeft: '5%' }}>Hathyre | Tableau de bord </h1>
                {user && (
                    <h2 style={{ marginLeft: '5%' }}>Bienvenue, {user.prenom} {user.nom}
                        <FontAwesomeIcon onClick={handleLogout} icon={faPowerOff} />
                    </h2>
                )}
            </div>
            <Tabs />
        </div>
    );
}

export default Dashboard;
