import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { LoginContext } from '../../../context/login.context';
import axios from "axios";
import AddUser from './AddUser'; // Importez le composant AddUser

const UserDashboard = () => {
    const {userConnected} = useContext(LoginContext);
    
    const [showAddUserPopup, setShowAddUserPopup] = useState(false);
    const [users, setUsers] = useState([]); // État pour gérer l'affichage de la pop-up

    useEffect(() => {
        // Effectuer la requête Axios pour récupérer les utilisateurs
        axios.get('https://hathyre-server-api.onrender.com/api/users')
            .then(response => {
                // Mettre à jour l'état avec les utilisateurs récupérés
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des utilisateurs :', error);
            });
    }, []);

    const handleDeleteUser = (id) => {
        axios.delete(`https://hathyre-server-api.onrender.com/api/delete/user/${id}`)
            .then(response => {
                console.log('Utilisateur supprimé avec succès');
                // Mettre à jour l'état des utilisateurs après la suppression
                setUsers(users.filter(user => user._id !== id));
            })
            .catch(error => {
                console.error('Erreur lors de la suppression de l\'utilisateur :', error);
            });
    };

    return (
        <>
            <div className='board'>
                <div className='head-dash'>
                    <h3 style={{ marginLeft: '5%' }}>Administrateurs</h3>
                    <span onClick={() => setShowAddUserPopup(true)}> {/* Ajoutez un gestionnaire d'événements pour afficher la pop-up */}
                        Ajouter un administrateur<FontAwesomeIcon icon={faPlus} />
                    </span>
                </div>

                <table className="users-table">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Token</th>
                            <th>Créé le</th>
                            <th>Modifier</th>
                            <th>Supprimer</th>
                        </tr>
                    </thead>

                    <tbody>
                        {userConnected && users.map(user => (
                            <tr key={user._id}>
                                <td>{user.nom}</td>
                                <td>{user.prenom}</td>
                                <td>{user.email}</td>
                                <td>{user.password}</td>
                                <td>{user.token}</td>
                                <td>{user.createdAt}</td>
                                <td>
                                    <a href={`/admin/dashboard/user/edit/${user._id}`}>
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </a>
                                </td>
                                {/* Conditionally render the delete button */}
                                <td>
                                    {userConnected._id !== user._id && ( // Comparaison des IDs de l'utilisateur connecté et de l'utilisateur de la boucle
                                        <FontAwesomeIcon onClick={() => handleDeleteUser(user._id)} icon={faTrash} />
                                    )}
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>

            {/* Conditionally render the AddUser component based on showAddUserPopup state */}
            {showAddUserPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <button onClick={() => setShowAddUserPopup(false)}>Fermer</button>
                        {/* Render the AddUser component */}
                        <AddUser />
                    </div>
                </div>
            )}

        </>
    );
};

export default UserDashboard;
