import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { LoginContext } from '../../../context/login.context.jsx';
import './AdminLogin.css';

function AdminLogin() {
    const { userConnected, setUserConnected } = useContext(LoginContext);
    const navigate = useNavigate();

    // État local pour stocker les valeurs des champs email et mot de passe
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Gestionnaire d'événement pour la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Envoi de la requête au backend pour la connexion admin
        axios.post(`https://hathyre-server-api.onrender.com/api/admin/login`, { email, password })
            .then(response => {
                console.log('Administrateur connecté');
                console.log(response.data);

                // Mettre à jour le contexte avec les données de l'utilisateur
                setUserConnected(response.data.user);

                localStorage.setItem('token', response.data.token);
                localStorage.setItem('id', response.data.user._id);

                navigate(`/admin/dashboard/${response.data.user._id}/${response.data.token}`);
            })
            .catch(error => {
                console.error("Erreur lors de la connexion de l'administrateur :", error);
            });

        console.log("Email:", email);
        console.log("Password:", password);
    };

    useEffect(() => {
        // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
        if (!userConnected && !localStorage.getItem('token')) {
          navigate("/admin/login");
        }
    }, [userConnected, navigate]);

    // Utiliser useEffect pour surveiller les changements de user
    useEffect(() => {
        console.log('Changement de user détecté :', userConnected);
    }, [userConnected]);

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
                        <FontAwesomeIcon icon={faCircleArrowLeft} size="4x"/>
                    </Link>
                </div>
            </div>

            <div className='admin-login'>
                <h1>Connexion | Hathyre</h1>
                <form className="login-form" onSubmit={handleSubmit}>
                    <p className="login-text">
                        <span className="fa-stack fa-lg">
                            <i className="fa fa-circle fa-stack-2x"></i>
                            <i className="fa fa-lock fa-stack-1x"></i>
                        </span>
                    </p>
                    <div className='input-form'>
                        <label htmlFor="Email">Email</label>
                        <input type="email" className="login-username" autoFocus={true} required={true} placeholder="xxxx@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='input-form'>
                        <label htmlFor="Password">Mot de passe</label>
                        <input type="password" className="login-password" required={true} placeholder="Entrez votre mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <input type="submit" name="Login" value="Login" className="login-submit" />
                </form>
                <Link to="#" className="login-forgot-pass">forgot password ?</Link>
                <div className="underlay-photo" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/admin-background/form-background.png)` }}></div>
            </div>
        </div>
    );
}

export default AdminLogin;
