import React, { useState, useEffect } from 'react';
import { useParams, useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function EditUser({ userId }) {
  const navigate = useNavigate();
  const { id } = useParams(); // Récupérer l'ID du produit à partir de l'URL
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Effectuer une requête pour récupérer les informations de l'utilisateur à éditer
    axios.get(`https://hathyre-server-api.onrender.com/api/user/${id}`)
      .then(response => {
        const userData = response.data;
        setNom(userData.nom);
        setPrenom(userData.prenom);
        setEmail(userData.email);
        setEmail(userData.password);
        // Ne récupérez pas le mot de passe depuis le backend pour des raisons de sécurité
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des informations de l\'utilisateur :', error);
      });
  }, [id]); // Utilisez userId comme dépendance pour effectuer la requête lorsque l'ID de l'utilisateur change

  const handleEditUser = async (e) => {
    e.preventDefault();

    const updatedUser = {
      nom,
      prenom,
      email,
      password
      // Vous pouvez choisir de mettre à jour le mot de passe ici si nécessaire
    };

    try {
      const response = await axios.put(`http://localhost:5000/api/update/user/${id}`, updatedUser);
      console.log('Réponse du serveur :', response.data);
      // Afficher la pop-up de succès
      setShowPopup(true);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
    }
  };


  const returnButton = () => {
    navigate('/dashboard');
  }

  return (
    <div>
      <h1> 
        <a href="admin/dashboard"><FontAwesomeIcon onClick={returnButton} icon={faCircleArrowLeft} /></a> 
        Modifier l'utilisateur
      </h1>
      <form onSubmit={handleEditUser}>
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
        <button type="submit">Modifier</button>
      </form>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>L'utilisateur a été modifié avec succès!</h2>
            <button onClick={() => setShowPopup(false)}>Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditUser;
