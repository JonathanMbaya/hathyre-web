import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { LoginContext } from '../../../context/login.context.jsx';
import './AdminLogin.css';

// Validation pour le formulaire d'inscription
const validationSchemaSignUp = Yup.object().shape({
    nom: Yup.string().required('Le nom est requis'),
    prenom: Yup.string().required('Le prénom est requis'),
    clientEmail: Yup.string().email('Email invalide').required('L\'email est requis'),
    clientPassword: Yup.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères').required('Le mot de passe est requis'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('clientPassword'), null], 'Les mots de passe doivent correspondre')
        .required('La confirmation du mot de passe est requise'),
});

// Validation pour le formulaire de connexion
const validationSchemaLogin = Yup.object().shape({
    clientEmail: Yup.string().email('Email invalide').required('L\'email est requis'),
    clientPassword: Yup.string().min(3, 'Le mot de passe doit contenir au moins 6 caractères').required('Le mot de passe est requis'),
});

function Login() {
    const { userConnected, setUserConnected } = useContext(LoginContext);
    const navigate = useNavigate();
    
    // État pour gérer l'affichage de la pop-up et les erreurs
    const [showPopup, setShowPopup] = useState(false);
    const [loginError, setLoginError] = useState('');

    // Formik pour le formulaire d'inscription
    const formikSignUp = useFormik({
        initialValues: {
            nom: '',
            prenom: '',
            clientEmail: '',
            clientPassword: '',
            confirmPassword: '',
        },
        validationSchema: validationSchemaSignUp,
        onSubmit: async (values) => {
            try {
                const response = await axios.post('https://hathyre-server-api.onrender.com/api/add/client', values);
                console.log('Réponse du serveur :', response.data);
                
                // Afficher la pop-up après avoir ajouté l'utilisateur avec succès
                setShowPopup(true);
                
                // Réinitialiser les champs après avoir ajouté l'utilisateur avec succès
                formikSignUp.resetForm();

                // Rediriger vers une autre page après l'ajout réussi de l'utilisateur
                navigate(`/`);
            } catch (error) {
                console.error("Erreur lors de l'ajout de l'utilisateur :", error);
            }
        },
    });

    // Formik pour le formulaire de connexion
    const formikLogin = useFormik({
        initialValues: {
            clientEmail: '',
            clientPassword: '',
        },
        validationSchema: validationSchemaLogin,
        onSubmit: async (values) => {
            try {
                // Modification ici pour correspondre à l'API
                const response = await axios.post('https://hathyre-server-api.onrender.com/api/login/client', {
                    email: values.clientEmail, 
                    password: values.clientPassword,
                });
                console.log('Réponse du serveur :', response.data);
                
                // Stockez le token dans le localStorage ou gérez le contexte ici
                localStorage.setItem('token', response.data.token);
                setUserConnected(response.data.client);
                navigate(`/`); // Redirection après la connexion réussie
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

    useEffect(() => {
        // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
        if (!userConnected || !localStorage.getItem('token')) {
            navigate("/login");
        }
    }, [userConnected, navigate]);

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

            <div className='login'>
                {/* Formulaire de Connexion */}
                <div>
                    <h1>J'ai déjà un compte</h1>
                    <p>Connectez-vous à votre compte existant</p>

                    <form className="login-form" onSubmit={formikLogin.handleSubmit}>
                        <div className='input-form'>
                            <label htmlFor="Email">Email</label>
                            <input
                                type="email"
                                className="login-username"
                                autoFocus={true}
                                required={true}
                                placeholder="xxxx@example.com"
                                {...formikLogin.getFieldProps('clientEmail')}
                            />
                            {formikLogin.touched.clientEmail && formikLogin.errors.clientEmail ? (
                                <div className="error">{formikLogin.errors.clientEmail}</div>
                            ) : null}
                        </div>
                        <div className='input-form'>
                            <label htmlFor="Password">Mot de passe</label>
                            <input
                                type="password"
                                className="login-password"
                                required={true}
                                placeholder="Entrez votre mot de passe"
                                {...formikLogin.getFieldProps('clientPassword')}
                            />
                            {formikLogin.touched.clientPassword && formikLogin.errors.clientPassword ? (
                                <div className="error">{formikLogin.errors.clientPassword}</div>
                            ) : null}
                        </div>
                        {/* Affichage de l'erreur de connexion */}
                        {loginError && <div className="error">{loginError}</div>}

                        <input type="submit" name="Login" value="M'identifier" className="login-submit" />
                    </form>

                    <Link to="#" className="login-forgot-pass">Mot de passe oublié ?</Link>
                </div>

                {/* Formulaire d'Inscription */}
                <div>
                    <h1>Nouveau Client</h1>
                    <p>Créez votre espace Hathyre pour une expérience d'achat personnalisée.</p>

                    <form className="login-form" onSubmit={formikSignUp.handleSubmit}>
                        <div className='input-form'>
                            <label htmlFor="Name">Votre nom *</label>
                            <input
                                type="text"
                                className="login-username"
                                required={true}
                                placeholder="ex: Smith"
                                {...formikSignUp.getFieldProps('nom')}
                            />
                            {formikSignUp.touched.nom && formikSignUp.errors.nom ? (
                                <div className="error">{formikSignUp.errors.nom}</div>
                            ) : null}
                        </div>
                        <div className='input-form'>
                            <label htmlFor="Name">Votre prénom *</label>
                            <input
                                type="text"
                                className="login-username"
                                required={true}
                                placeholder="ex: John"
                                {...formikSignUp.getFieldProps('prenom')}
                            />
                            {formikSignUp.touched.prenom && formikSignUp.errors.prenom ? (
                                <div className="error">{formikSignUp.errors.prenom}</div>
                            ) : null}
                        </div>
                        <div className='input-form'>
                            <label htmlFor="Email">Email *</label>
                            <input
                                type="email"
                                className="login-username"
                                required={true}
                                placeholder="xxxx@example.com"
                                {...formikSignUp.getFieldProps('clientEmail')}
                            />
                            {formikSignUp.touched.clientEmail && formikSignUp.errors.clientEmail ? (
                                <div className="error">{formikSignUp.errors.clientEmail}</div>
                            ) : null}
                        </div>
                        <div className='input-form'>
                            <label htmlFor="Password">Mot de passe *</label>
                            <input
                                type="password"
                                className="login-password"
                                required={true}
                                placeholder="Entrez votre mot de passe"
                                {...formikSignUp.getFieldProps('clientPassword')}
                            />
                            {formikSignUp.touched.clientPassword && formikSignUp.errors.clientPassword ? (
                                <div className="error">{formikSignUp.errors.clientPassword}</div>
                            ) : null}
                        </div>
                        <div className='input-form'>
                            <label htmlFor="Password">Confirmer votre mot de passe *</label>
                            <input
                                type="password"
                                className="login-password"
                                required={true}
                                placeholder="Entrez votre mot de passe"
                                {...formikSignUp.getFieldProps('confirmPassword')}
                            />
                            {formikSignUp.touched.confirmPassword && formikSignUp.errors.confirmPassword ? (
                                <div className="error">{formikSignUp.errors.confirmPassword}</div>
                            ) : null}
                        </div>

                        <input type="submit" name="Register" value="S'inscrire" className="login-submit" />
                    </form>
                </div>
            </div>

            {showPopup && (
                <div className="popup">
                    <p>Votre compte a été créé avec succès !</p>
                    <button onClick={() => setShowPopup(false)}>Fermer</button>
                </div>
            )}
        </div>
    );
}

export default Login;
