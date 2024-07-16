import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { LoginContext } from '../../../context/login.context.jsx';
import './AdminLogin.css';

function Login() {
    const { userConnected, setUserConnected } = useContext(LoginContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // État local pour stocker les valeurs des champs email et mot de passe
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [clientEmail, setClientEmail] = useState('');
    const [clientPassword, setClientPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    // Gestionnaire d'événement pour la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Envoi de la requête au backend pour la connexion client
        axios.post(`https://hathyre-server-api.onrender.com/api/login/client`, {email, password })
        .then(response => {
            console.log('Client connecté');
            console.log(response.data);

            // Mettre à jour le contexte avec les données de l'utilisateur
            setUserConnected(response.data.client);

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('id', response.data.client._id);

            navigate(`/`);
        })
        .catch(error => {
            console.error("Erreur lors de la connexion de l'administrateur :", error);
        });
    };

    useEffect(() => {
        // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
        if (!userConnected || !localStorage.getItem('token')) {
          navigate("/login");
        }
    }, [userConnected, navigate]);

    // Utiliser useEffect pour surveiller les changements de user
    useEffect(() => {
        console.log('Changement de user détecté :', userConnected);
    }, [userConnected]);


    const handleAddUser = async (e) => {
        e.preventDefault();
    
        if (!nom || !prenom || !clientEmail || !clientPassword || !confirmPassword) {
            console.error("Tous les champs sont requis");
            return;
        }
      
        if (clientPassword !== confirmPassword) {
            console.error("Les mots de passe ne correspondent pas");
            return;
        }
    
        const newClient = {
          nom,
          prenom,
          clientEmail,
          clientPassword,
          confirmPassword,
        };
    
        try {
          const response = await axios.post('https://hathyre-server-api.onrender.com/api/add/client', newClient);
          console.log('Réponse du serveur :', response.data);
          // Réinitialiser les champs après avoir ajouté l'utilisateur avec succès
          setNom('');
          setPrenom('');
          setClientEmail('');
          setClientPassword('');
          setConfirmPassword('');
    
          // Rediriger vers une autre page après l'ajout réussi de l'utilisateur
          navigate(`/`);
        } catch (error) {
          console.error("Erreur lors de l'ajout de l'utilisateur :", error);
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
                        <FontAwesomeIcon icon={faCircleArrowLeft} size="4x"/>
                    </Link>
                </div>
            </div>

            <div className='login'>

                <div>
                    <h1>J'ai déjà un compte</h1>
                    <p>Connectez vous à votre compte existant</p>

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

                        <input type="submit" name="Login" value="M'identifier" className="login-submit" />
                    </form>

                    <Link to="#" className="login-forgot-pass">Mot de passe oublié ?</Link>
                    
                </div>

                <div>

                    <h1>Nouveau Client</h1>
                    <p>Créez votre espace Hathyre pour une expérience d'achat personnalisée.</p>

                    <form className="login-form" onSubmit={handleAddUser}>
                        <p className="login-text">
                            <span className="fa-stack fa-lg">
                                <i className="fa fa-circle fa-stack-2x"></i>
                                <i className="fa fa-lock fa-stack-1x"></i>
                            </span>
                        </p>
                        <div className='input-form'>
                            <label htmlFor="Name">Votre nom *</label>
                            <input type="text" className="login-username" autoFocus={true} required={true} placeholder="ex: Smith" value={nom} onChange={(e) => setNom(e.target.value)} />
                        </div>
                        <div className='input-form'>
                            <label htmlFor="Name">Votre prénom *</label>
                            <input type="text" className="login-username" autoFocus={true} required={true} placeholder="ex: John" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
                        </div>
                        <div className='input-form'>
                            <label htmlFor="Email">Email *</label>
                            <input type="email" className="login-username" autoFocus={true} required={true} placeholder="xxxx@example.com" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} />
                        </div>
                        <div className='input-form'>
                            <label htmlFor="Password">Mot de passe *</label>
                            <input type="password" className="login-password" required={true} placeholder="Entrez votre mot de passe" value={clientPassword} onChange={(e) => setClientPassword(e.target.value)} />
                        </div>
                        <div className='input-form'>
                            <label htmlFor="Password">Confirmer votre mot de passe *</label>
                            <input type="password" className="login-password" required={true} placeholder="Entrez votre mot de passe" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>

                        <input type="submit" name="SignUp" value="Créer mon compte" className="login-submit" />
                    </form>

                    
                </div>
                
            </div>
        </div>
    );
}

export default Login;
