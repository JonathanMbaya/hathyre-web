import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const OrderDashboard = () => {
    return (
        <div>

            <div className='board'>

                <h3 style={{ marginLeft: '5%' }}>Nos commandes</h3>

                <div className='label-column'>
                    <span>Ref. Commande</span>
                    <span>Nom</span>
                    <span>Prénom</span>
                    <span>Adresse de livraison</span>
                    <span>Email</span>
                    <span>Tel. Mobile</span>
                    <span>Articles</span>
                    <span>Montant</span>
                    <span>Date d'achat</span>
                    <span>Supprimer</span>
                </div>

                <div className='label-column'>
                    <span>0009385735</span>
                    <span>Ngannou</span>
                    <span>Francis</span>
                    <span>5 Allée du Port Saint-Victor, 91210 Draveil</span>
                    <span>ngafrancis@hotmail.fr</span>
                    <span>07 56 52 53 45</span>
                    <span>2 Safari Karité</span>
                    <span>32</span>
                    <span>11/03/24 00:48</span>
                    <span><FontAwesomeIcon icon={faTrash} /></span>
                </div>

            </div>
            
        </div>
    );
};

export default OrderDashboard;