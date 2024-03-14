import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

const UserDashboard = () => {
    return (
        <>
            <div className='board'>
                
            <h3 style={{ marginLeft: '5%' }}>Administrateurs</h3>
                <div className='label-column'>
                    <span>Nom</span>
                    <span>Prénom</span>
                    <span>Email</span>
                    <span>Password</span>
                    <span>Token</span>
                    <span>Modifié le</span>
                    <span>Supprimer</span>
                </div>

                <div className='label-column'>
                    <span>Mayembo</span>
                    <span>Yann</span>
                    <span>m.yann@hathyre.fr</span>
                    <span>kejfhjzhfuzhfhvhcvh</span>
                    <span>zejnjfrufbrvibbv</span>
                    <span>
                        10/03/2024  <FontAwesomeIcon icon={faPenToSquare} />
                    </span>
                    <span>
                        <FontAwesomeIcon icon={faTrash} />
                    </span>
                </div>

            </div>
            
        </>
    );
};

export default UserDashboard;