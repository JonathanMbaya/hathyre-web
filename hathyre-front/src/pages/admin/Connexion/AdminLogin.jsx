import React from 'react';
import { Link } from "react-router-dom";
import './AdminLogin.css';

function AdminLogin() {
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
                <form className="login-form">
                    <p className="login-text">
                        <span className="fa-stack fa-lg">
                            <i className="fa fa-circle fa-stack-2x"></i>
                            <i className="fa fa-lock fa-stack-1x"></i>
                        </span>
                    </p>
                    <div className='input-form'>
                        <label htmlFor="Email">Email</label>
                        <input type="email" className="login-username" autoFocus={true} required={true} placeholder="xxxx@example.com" />
                    </div>
                    <div className='input-form'>
                        <label htmlFor="Password">Mot de passe</label>
                        <input type="password" className="login-password" required={true} placeholder="Entrez votre mot de passe" />
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
