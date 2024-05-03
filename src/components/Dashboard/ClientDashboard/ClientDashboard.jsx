import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const ClientDashboard = () => {
    return (
        <div className='table-responsive'>
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
                        <th>Supprimer</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>0009385735</td>
                        <td>Ngannou</td>
                        <td>Francis</td>
                        <td>5 Allée du Port Saint-Victor, 91210 Draveil</td>
                        <td>ngafrancis@hotmail.fr</td>
                        <td>07 56 52 53 45</td>
                        <td>Safari Karité</td>
                        <td>132,57 €</td>
                        <td><FontAwesomeIcon icon={faTrash} /></td>
                    </tr>
                    {/* Ajoute ici d'autres lignes pour chaque commande */}
                </tbody>
            </table>
        </div>
    );
};

export default ClientDashboard;