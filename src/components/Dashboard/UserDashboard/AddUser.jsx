import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link} from 'react-router-dom';
import './PopUp.css';

function AddUser() {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    const { id, token } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/user/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des informations de l'utilisateur :", error);
            }
        };

        fetchUserData();
    }, [id, token, navigate]);


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
            navigate(`/admin/dashboard/${id}/${token}`);
        } 
        catch (error) {
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
                        <Link to={`/admin/dashboard/${user._id}/${user.token}`}>
                            <button onClick={() => setShowPopup(false)}>Fermer</button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddUser;
