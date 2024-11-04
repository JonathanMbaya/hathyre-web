import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { LoginContext } from '../../../context/login.context.jsx';
import { signup } from '../../../services/api/user.js';
import emailjs from '@emailjs/browser';
import { Container, Typography } from '@mui/material';

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
    terms: Yup.boolean().oneOf([true], 'Vous devez accepter les conditions générales pour continuer'),
});

function SignUp() {
    const { userConnected} = useContext(LoginContext);
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [error, setError] = useState('');

    // Fonction pour envoyer l'e-mail de confirmation
    const sendConfirmationEmail = async (clientEmail, token) => {
        const templateParams = {
            clientEmail: clientEmail,
            token: token,
        };

        try {
            await emailjs.send('service_zfgh8eu', 'template_0tvhtgg', templateParams, 'lHgH8IdU-rW5KqZ9m');
            console.log("E-mail de confirmation envoyé");
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'e-mail de confirmation:", error);
        }
    };

    // Formik pour le formulaire d'inscription
    const formikSignUp = useFormik({
        initialValues: {
            nom: '',
            prenom: '',
            clientEmail: '',
            clientPassword: '',
            confirmPassword: '',
            terms: false,
        },
        validationSchema: validationSchemaSignUp,
        onSubmit: async (values) => {
            try {
                const response = await signup({
                    clientEmail: values.clientEmail,
                    nom: values.nom,
                    prenom: values.prenom,
                    clientPassword: values.clientPassword,
                });

                const token = response.data.emailVerificationToken;
                sendConfirmationEmail(values.clientEmail, token);
                setShowPopup(true);
                formikSignUp.resetForm();

                setTimeout(() => {
                    navigate(`/`);
                }, 3000);

            } catch (error) {
                console.error("Erreur lors de l'ajout de l'utilisateur :", error);
                setError("Erreur lors de l'ajout de l'utilisateur. Veuillez réessayer.");
            }
        },
    });

    useEffect(() => {
        if (!userConnected) {
            navigate("/signup");
        }
    }, [userConnected, navigate]);

    return (
        <>
            <div className='backgroundBlock'></div>
            <div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img
                        src={process.env.PUBLIC_URL + '/hathyre-logo.png'}
                        alt="Logo de l'application"
                        className="logo-img"
                    />
                    <div className="retour">
                        <Link to="/">
                            <FontAwesomeIcon icon={faCircleArrowLeft} size="4x" />
                        </Link>
                    </div>
                </div>

                <div className='signup'>
                    <h1>Nouveau Client</h1>
                    <p style={{textAlign: "center"}}>Créez votre espace Hathyre pour une expérience d'achat personnalisée.</p>

                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <form className="login-form" onSubmit={formikSignUp.handleSubmit}>
                        <div className='input-form'>
                            <label htmlFor="Name">Votre nom *</label>
                            <input
                                type="text"
                                className="login-username"
                                required={true}
                                placeholder="Smith"
                                {...formikSignUp.getFieldProps('nom')}
                            />
                            {formikSignUp.touched.nom && formikSignUp.errors.nom ? (
                                <div style={{ color: "red", maxWidth: '300px', fontSize: '10px' }} className="error">{formikSignUp.errors.nom}</div>
                            ) : null}
                        </div>
                        <div className='input-form'>
                            <label htmlFor="prenom">Votre prénom *</label>
                            <input
                                type="text"
                                className="login-username"
                                required={true}
                                placeholder="John"
                                {...formikSignUp.getFieldProps('prenom')}
                            />
                            {formikSignUp.touched.prenom && formikSignUp.errors.prenom ? (
                                <div style={{ color: "red", maxWidth: '300px', fontSize: '10px' }} className="error">{formikSignUp.errors.prenom}</div>
                            ) : null}
                        </div>
                        <div className='input-form'>
                            <label htmlFor="Email">Email *</label>
                            <input
                                type="email"
                                className="login-username"
                                required={true}
                                placeholder="@example.com"
                                {...formikSignUp.getFieldProps('clientEmail')}
                            />
                            {formikSignUp.touched.clientEmail && formikSignUp.errors.clientEmail ? (
                                <div style={{ color: "red", maxWidth: '300px', fontSize: '10px' }} className="error">{formikSignUp.errors.clientEmail}</div>
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
                                <div style={{ color: "red", maxWidth: '300px', fontSize: '10px' }} className="error">{formikSignUp.errors.clientPassword}</div>
                            ) : null}
                        </div>
                        <div className='input-form'>
                            <label htmlFor="confirmPassword">Confirmer votre mot de passe *</label>
                            <input
                                type="password"
                                className="login-password"
                                required={true}
                                placeholder="Confirmez votre mot de passe"
                                {...formikSignUp.getFieldProps('confirmPassword')}
                            />
                            {formikSignUp.touched.confirmPassword && formikSignUp.errors.confirmPassword ? (
                                <div style={{ color: "red", maxWidth: '300px', fontSize: '10px' }} className="error">{formikSignUp.errors.confirmPassword}</div>
                            ) : null}
                        </div>

                        <div style={{ maxWidth: '300px', fontSize: '10px', margin: '1rem 0', textAlign: 'center' }} className='input-form'>
                            <label>
                                <input
                                    type="checkbox"
                                    name="terms"
                                    required={true}
                                    {...formikSignUp.getFieldProps('terms')}
                                />
                                J'accepte les <a href="/terms" target="_blank">Conditions Générales</a> et la <a href="/privacy" target="_blank">Politique de confidentialité</a>.
                            </label>
                            {formikSignUp.touched.terms && formikSignUp.errors.terms ? (
                                <div style={{ color: "red", maxWidth: '300px', fontSize: '10px' }} className="error">{formikSignUp.errors.terms}</div>
                            ) : null}
                        </div>

                        <input type="submit" name="SignUp" value="M'inscrire" className="login-submit" />

                        {showPopup && (
                            <div style={{ color: "red", maxWidth: '300px', fontSize: '10px' }} className="popup">
                                <p>Inscription réussie ! Un e-mail de confirmation a été envoyé. Veuillez vérifier votre boîte de réception.</p>
                            </div>
                        )}

                        <Container maxWidth="md" style={{ margin: '1rem auto', maxWidth: '400px' }}>
                            <Typography variant="body2" paragraph style={{ fontSize: '0.5rem', lineHeight: '1.2' }}>
                                En créant un compte ou en passant commande sur Hathyre, vous acceptez nos
                                <Link to="/conditions-ventes" color="primary" style={{ marginLeft: '0.5rem' }}>
                                    Conditions Générales de Vente
                                </Link>. <br />
                                Vous consentez au traitement de vos données personnelles, conformément à notre
                                <Link to="/politique-de-confidentialite" color="primary" style={{ marginLeft: '0.5rem' }}>
                                    Politique de Confidentialité.
                                </Link>
                            </Typography>
                        </Container>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignUp;
