import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const ClientDashboard = () => {

    const [clients, setClients] = useState([]);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axios.get('https://hathyre-server-api.onrender.com/api/clients'); // Assurez-vous que ce chemin correspond à votre backend
                setClients(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des clients:', error);
            }
        };

        fetchClients();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://hathyre-server-api.onrender.com/api/clients/${id}`);  // Ajouter une route pour la suppression
            setClients(clients.filter(client => client._id !== id));
        } catch (error) {
            console.error('Erreur lors de la suppression du client:', error);
        }
    };

    return (
        <div className='table-responsive'>

            <div style={{backgroundColor : 'white', borderRadius: '.5rem .5rem 0 0'}} className='head-dash'>
                <h3 style={{margin: '.5rem'}}>Clients</h3>
            </div>

            <table className='users-table'>
                <thead>
                    <tr>
                        <th>Ref. Client</th>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Adresse de livraison</th>
                        <th>Email</th>
                        <th>Tel. Mobile</th>
                        <th>Favoris</th>
                        <th>Montant dépensé</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map(client => (
                        <tr key={client._id}>
                            <td>{client.token}</td>
                            <td>{client.nom}</td>
                            <td>{client.prenom}</td>
                            <td>{client.address}</td>
                            <td>{client.clientEmail}</td>
                            <td>{client.mobile}</td>
                            <td>{client.favoris.join(', ')}</td>
                            <td>{client.montantDepense} EUR</td>
                            <td>
                                <button onClick={() => handleDelete(client._id)}><FontAwesomeIcon icon={faTrash}/></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClientDashboard;