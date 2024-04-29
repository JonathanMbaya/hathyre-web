import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import './PopUp.css';
import { LoginContext } from '../../../context/login.context';

function AddUser() {
    const { userConnected } = useContext(LoginContext); // Utilisation du contexte pour obtenir l'utilisateur connecté
    const navigate = useNavigate();
    const { id, token } = useParams();

    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const handleAddUser = async (e) => {
        e.preventDefault();

        const newUser = {
            nom,
            prenom,
            email,
            password
        };

        try {
            const response = await axios.post('https://hathyre-server-api.onrender.com/api/add/user', newUser);
            console.log('Réponse du serveur :', response.data);
            // Réinitialiser les champs après avoir ajouté l'utilisateur avec succès
            setNom('');
            setPrenom('');
            setEmail('');
            setPassword('');
            // Afficher la pop-up de succès
            setShowPopup(true);

            // Rediriger vers une autre page après l'ajout réussi de l'utilisateur
            navigate(`/admin/dashboard/${userConnected._id}/${userConnected.token}`); // Utilisation de user extrait du contexte
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'utilisateur :", error);
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        window.location.reload(); // Rafraîchir la page
    };

    return (
        <div>
            <h1>Ajouter un Utilisateur</h1>
            <form onSubmit={handleAddUser}>
                <div>
                    <label htmlFor="nom">Nom</label>
                    <input
                        type="text"
                        id="nom"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="prenom">Prénom</label>
                    <input
                        type="text"
                        id="prenom"
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Ajouter</button>
            </form>
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>L'utilisateur a été ajouté avec succès!</h2>
                        <Link to={`/admin/dashboard/${id}/${token}`}>
                            <button onClick={handleClosePopup}>Fermer</button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddUser;
