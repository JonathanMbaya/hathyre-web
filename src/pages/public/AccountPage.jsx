import React, { useState } from 'react';
import PersonalData from "../../components/Account/PersonalData.jsx";
import MyPurchases from "../../components/Account/MyPurchases.jsx";
import MyFavorites from "../../components/Account/MyFavorites.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faInfo, faBagShopping, faHeart, faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";



function AccountPage () {
    const [activeTab, setActiveTab] = useState('personalData');  // Onglet par défaut

    // Fonction pour afficher le contenu basé sur l'onglet sélectionné
    const renderContent = () => {
        switch(activeTab) {
            case 'personalData':
                return <PersonalData />;
            case 'purchases':
                return <MyPurchases />;
            case 'favorites':
                return <MyFavorites />;
            default:
                return <PersonalData />;
        }
    };

    return (
        <>
            <div style={{display: "flex"}}>
                <h1 style={{marginTop: "13rem", paddingLeft: "2rem"}}>Mon compte</h1> 
            </div>

            <div style={{display: "flex"}}>
                <div className='sidebar' style={{padding: '1rem', borderRight: '1px solid #ccc', width: '20%', display:"flex", flexDirection:"column", alignItems: "flex-start"}}>
                    <ul style={{margin:"0rem", padding:"0rem"}}>
                        <li onClick={() => setActiveTab('personalData')} style={{cursor: 'pointer', marginBottom: '10px', display:"flex", justifyContent:"flex-start"}}>
                            <span style={{padding:".5rem"}}>
                                <FontAwesomeIcon icon={faInfo} />
                            </span>
                            
                            Données personnelles
                        </li>
                        <li onClick={() => setActiveTab('purchases')} style={{cursor: 'pointer', marginBottom: '10px'}}>
                            <span style={{padding:".5rem"}}>
                                <FontAwesomeIcon icon={faBagShopping} />
                            </span>
                            Mes achats
                        </li>
                        <li onClick={() => setActiveTab('favorites')} style={{cursor: 'pointer', marginBottom: '10px'}}>
                            <span style={{padding:".5rem"}}>
                                <FontAwesomeIcon icon={faHeart} />
                            </span>
                             Mes favoris
                        </li>
                    </ul>

                    <ul style={{margin:"0rem", padding:"0rem"}}>
                        <li style={{cursor: 'pointer', marginTop: '20px'}}>
                            <span style={{padding:".5rem"}}>
                                <FontAwesomeIcon icon={faArrowRightFromBracket} />
                            </span>
                            Déconnexion
                        </li>
                    </ul>
                </div>

                <div style={{padding: '1rem', width: '80%'}}>
                    {/* Contenu des onglets */}
                    {renderContent()}
                </div>
            </div>

            <Footer />
        </>
    );
};

export default AccountPage;
