import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

const ProductDashboard = () => {
    return (
        <>
            <div className='board'>

            <h3 style={{ marginLeft: '5%' }}>Nos Produits</h3>

            <div className='label-column'>
                <span>Référence</span>
                <span>Nom du produit</span>
                <span>Prix du produit</span>
                <span>Description</span>
                <span>Promotion</span>
                <span>Stock disponible</span>
                <span>Mis en ligne</span>
                <span>Supprimer</span>
            </div>

            <div className='label-column'>
                <span>0009385735</span>
                <span>Safi Karité</span>
                <span>19.90</span>
                <span>Sans additif</span>
                <span>5%</span>
                <span>24</span>
                <span>11/03/2024 00:43<FontAwesomeIcon icon={faPenToSquare} /></span>
                <span><FontAwesomeIcon icon={faTrash} /></span>
            </div>

            </div>
                        
        </>
    );
};

export default ProductDashboard;