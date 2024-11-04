import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { LoginContext } from '../../../context/login.context.jsx';
import { login } from '../../../services/api/user.js'; 
import './AdminLogin.css';

const validationSchemaLogin = Yup.object().shape({
    clientEmail: Yup.string().email('Email invalide').required('L\'email est requis'),
    clientPassword: Yup.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères').required('Le mot de passe est requis'),
});

function Login({closePop}) {
    const { setUserConnected } = useContext(LoginContext);
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState('');


    const formikLogin = useFormik({
        initialValues: {
            clientEmail: '',
            clientPassword: '',
        },
        validationSchema: validationSchemaLogin,
        onSubmit: async (values) => {
            try {
                // Utilisation de la fonction login déjà définie
                const response = await login({
                    email: values.clientEmail, 
                    password: values.clientPassword,
                });
    
                // Vérifiez si l'e-mail est confirmé
                if (response.data.isEmailVerified === false) {
                    setLoginError("Vous devez confirmer votre email, vérifier votre boîte de réception.");
                    return;
                }
    
                // Stocker le token et l'utilisateur connecté dans le localStorage
                localStorage.setItem('token', response.data.client.token);
                localStorage.setItem('id', response.data.client._id);

                setUserConnected(response.data.client); // Ajuster en fonction de la réponse
    
                // Rediriger après connexion réussie
                navigate(`/`);
            } catch (error) {
                console.error("Erreur lors de la connexion :", error);
                if (error.response) {
                    setLoginError(error.response.data.message || "Erreur lors de la connexion.");
                } else {
                    setLoginError("Erreur réseau. Veuillez réessayer.");
                }
            }
        },
    });


    return (
        <>
            <div className="backScreenLogin"></div>

            <div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img
                        src={process.env.PUBLIC_URL + '/hathyre-logo-white.png'}
                        alt="Logo de l'application"
                        className="logo-img"
                    />
                </div>

                <div className="login">
                    <div>
                        <h1 style={{color:"white"}}>Se connecter ?</h1>
                        <p style={{color:"white"}}>Connectez-vous à votre compte existant</p>

                        <form className="login-form" onSubmit={formikLogin.handleSubmit}>
                            <div className="input-form">
                                <label htmlFor="clientEmail">Email</label>
                                <input
                                    type="email"
                                    className="login-username"
                                    required
                                    placeholder="@example.com"
                                    {...formikLogin.getFieldProps('clientEmail')}
                                />
                                {formikLogin.touched.clientEmail && formikLogin.errors.clientEmail ? (
                                    <div className="error">{formikLogin.errors.clientEmail}</div>
                                ) : null}
                            </div>
                            <div className="input-form">
                                <label htmlFor="clientPassword">Mot de passe</label>
                                <input
                                    type="password"
                                    className="login-password"
                                    required
                                    placeholder="Entrez votre mot de passe"
                                    {...formikLogin.getFieldProps('clientPassword')}
                                />
                                {formikLogin.touched.clientPassword && formikLogin.errors.clientPassword ? (
                                    <div className="error">{formikLogin.errors.clientPassword}</div>
                                ) : null}
                            </div>
                            {loginError && <div className="error">{loginError}</div>}

                            <input type="submit" name="Login" value="M'identifier" className="login-submit" />

                            {loginError && (
                                <div style={{ color: "red" }}>
                                    <p>{loginError}</p>
                                </div>
                            )}

                        </form>



                        <Link to="/signup">
                            <p style={{color:"white", textAlign:"center"}}>Créez un compte ?</p>
                        </Link>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
