import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PopUp.css';

function AddUser() {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    const handleAddUser = async (e) => {
        e.preventDefault();
        const newUser = {
            nom,
            prenom,
            email,
            password
        };

        try {
            const response = await axios.post('http://localhost:5000/api/add/user', newUser);
            console.log('Réponse du serveur :', response.data);
            // Réinitialiser les champs après avoir ajouté l'utilisateur avec succès
            setNom('');
            setPrenom('');
            setEmail('');
            setPassword('');
            // Afficher la pop-up de succès
            setShowPopup(true);
            // Rediriger vers une autre page après l'ajout réussi de l'utilisateur
            navigate('/admin/dashboard');
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'utilisateur :", error);
        }
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
                        <button onClick={() => setShowPopup(false)}>Fermer</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddUser;
