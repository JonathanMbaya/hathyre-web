import React, { useState} from 'react';
import {useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import './AdminLogin.css';

function AdminLogin() {

    const navigate = useNavigate()
    // État local pour stocker les valeurs des champs email et mot de passe
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Gestionnaire d'événement pour la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Envoi de la requête au backend pour la connexion admin
        axios.post(`http://localhost:5000/api/admin/login`, { email, password })
        .then(response => {
            console.log('Administrateur connecté');
            console.log(response.data);
            localStorage.setItem('token', response.data.token);
            navigate(`/admin/dashboard/${response.data.user._id}/${response.data.token}`);
        })

        .catch(error => {
            console.error("Erreur lors de la connexion de l'administrateur :", error);
        });

        console.log("Email:", email);
        console.log("Password:", password);
    };

    return (
        <>
            <div className='logo-container' style={{ display: 'flex', justifyContent: 'center' }}>
                <img
                    src={process.env.PUBLIC_URL + '/hathyre-logo.png'}
                    alt="Logo de l'application"
                    className="logo-img"
                />
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
                <Link to="#" className="login-forgot-pass">forgot password?</Link>
                <div className="underlay-photo" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/admin-background/form-background.png)` }}></div>
            </div>

        </>
    );
};

export default AdminLogin;
