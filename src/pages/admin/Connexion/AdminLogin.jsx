import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { LoginContext } from '../../../context/login.context.jsx';
import './AdminLogin.css';

function AdminLogin() {
    const { userConnected, setUserConnected } = useContext(LoginContext); // Assurez-vous d'avoir setUserConnected dans le contexte
    const navigate = useNavigate();

    // État local pour stocker les valeurs des champs email et mot de passe
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Gestionnaire d'événement pour la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Envoi de la requête au backend pour la connexion admin
            const response = await axios.post(`https://hathyre-server-api.onrender.com/api/admin/login`, { email, password });

            console.log('Administrateur connecté', response.data);
            
            // Stocker le token dans le localStorage
            const token = response.data.user.token;
            localStorage.setItem('token', token);

            // Mettre à jour le contexte avec les données de l'utilisateur
            setUserConnected(response.data.user); // Mettre à jour le contexte
            console.log(userConnected)

            // Rediriger vers le tableau de bord
            navigate(`/admin/dashboard`);
        } catch (error) {
            console.error("Erreur lors de la connexion de l'administrateur :", error);
            setErrorMessage("Erreur de connexion. Veuillez vérifier vos informations.");
        }
    };

    return (
        <div className="logo-container">
            <div className='logo-container' style={{ display: 'flex', justifyContent: 'center' }}>
                <img
                    src={process.env.PUBLIC_URL + '/hathyre-logo.png'}
                    alt="Logo de l'application"
                    className="logo-img"
                />

                <div className="retour">
                    <Link to="/">
                        <FontAwesomeIcon icon={faCircleArrowLeft} size="2x"/>
                    </Link>
                </div>
            </div>

            <div className='admin-login'>
                <h1 style={{textAlign: "center"}}>Espace Administrateur | Hathyre</h1>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className='input-form'>
                        <label htmlFor="Email">Email</label>
                        <input 
                            type="email" 
                            className="login-username" 
                            autoFocus={true} 
                            required={true} 
                            placeholder="xxxx@example.com" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>
                    <div className='input-form'>
                        <label htmlFor="Password">Mot de passe</label>
                        <input 
                            type="password" 
                            className="login-password" 
                            required={true} 
                            placeholder="Entrez votre mot de passe" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>

                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    <input type="submit" name="Login" value="Se connecter" className="login-submit" />
                </form>
                <Link to="#" className="login-forgot-pass">Vous avez oublié votre mot de passe ?</Link>
            </div>
        </div>
    );
}

export default AdminLogin;
