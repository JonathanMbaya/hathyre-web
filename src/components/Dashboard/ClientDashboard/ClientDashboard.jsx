import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const ClientDashboard = () => {
    return (
        <div>

            <div className='board'>

                <h3 style={{ marginLeft: '5%' }}>Nos commandes</h3>

                <div className='label-column'>
                    <span>Ref. Client</span>
                    <span>Nom</span>
                    <span>Prénom</span>
                    <span>Adresse de livraison</span>
                    <span>Email</span>
                    <span>Tel. Mobile</span>
                    <span>Favoris</span>
                    <span>Montant dépensé</span>
                    <span>Supprimer</span>
                </div>

                <div className='label-column'>
                    <span>0009385735</span>
                    <span>Ngannou</span>
                    <span>Francis</span>
                    <span>5 Allée du Port Saint-Victor, 91210 Draveil</span>
                    <span>ngafrancis@hotmail.fr</span>
                    <span>07 56 52 53 45</span>
                    <span>Safari Karité</span>
                    <span>132,57 </span>
                    <span><FontAwesomeIcon icon={faTrash} /></span>
                </div>

            </div>
            
        </div>
    );
};

export default ClientDashboard;