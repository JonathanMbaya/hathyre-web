import React, { useState, useContext } from 'react';
import PersonalData from "../../components/Account/PersonalData.jsx";
import MyFavorites from "../../components/Account/MyFavorites.jsx";
import MyPurchases from '../../components/Account/MyPurchases.jsx';
import Footer from "../../components/Footer/Footer.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faHeart, faArrowRightFromBracket, faBars, faTimes, faTruck } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate
import { LoginContext } from "../../context/login.context.jsx";

function AccountPage() {
    const { userConnected, setUserConnected } = useContext(LoginContext);
    const [activeTab, setActiveTab] = useState('personalData'); // Onglet par défaut
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // État pour gérer l'ouverture de la sidebar
    const isMobile = useMediaQuery('(max-width:600px)'); // Détecter les petits écrans
    const navigate = useNavigate(); // Initialiser useNavigate

    // Fonction pour afficher le contenu basé sur l'onglet sélectionné
    const renderContent = () => {
        switch (activeTab) {
            case 'personalData':
                return <PersonalData />;
            case 'favorites':
                return <MyFavorites />;
            case 'purchases':
                return <MyPurchases/>;
            default:
                return <PersonalData />;
        }
    };

    // Styles pour la sidebar mobile
    const sidebarMobileStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        zIndex: 100,
        transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease',
        padding: '1rem',
    };

    const logout = () => {
        // Correction de la méthode pour supprimer des éléments du localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('id');

        if (userConnected) {
            setUserConnected(null);
        }

        // Rediriger vers la page de connexion
        navigate('/login'); // Redirection après déconnexion
    };

    return (
        <>
            {/* Bouton burger en mode mobile */}
            {isMobile && (
                <div style={{
                    position: "fixed",
                    top: "5rem",
                    zIndex: "101",
                    width: "100%",
                    color: "#895832",
                    background: "white",
                    boxShadow: "-1px 2px 5px 1px rgba(0, 0, 0, 0.4)"
                }}>
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: "black" }}>
                        {isSidebarOpen ? <FontAwesomeIcon icon={faTimes} size="1x" /> : <FontAwesomeIcon icon={faBars} size="1x" />} Mon compte
                    </button>
                </div>
            )}

            {/* Sidebar Mobile */}
            {isMobile && (
                <div style={sidebarMobileStyle}>
                    <ul style={{ marginTop: "15rem", padding: "0" }}>
                        <li onClick={() => { setActiveTab('personalData'); setIsSidebarOpen(false); }} style={{ cursor: 'pointer', marginBottom: '10px', display: "flex", justifyContent: "flex-start", alignItems: "center", textAlign: 'left' }}>
                            <span style={{ padding: ".5rem" }}>
                                <FontAwesomeIcon icon={faInfo} />
                            </span>
                            Données personnelles
                        </li>
                        <li onClick={() => { setActiveTab('favorites'); setIsSidebarOpen(false); }} style={{ cursor: 'pointer', marginBottom: '10px', display: "flex", justifyContent: "flex-start", alignItems: "center", textAlign: 'left' }}>
                            <span style={{ padding: ".5rem" }}>
                                <FontAwesomeIcon icon={faHeart} />
                            </span>
                            Mes favoris
                        </li>
                        <li onClick={() => { setActiveTab('purchases'); setIsSidebarOpen(false); }} style={{ cursor: 'pointer', marginBottom: '10px', display: "flex", justifyContent: "flex-start", alignItems: "center", textAlign: 'left' }}>
                            <span style={{ padding: ".5rem" }}>
                                <FontAwesomeIcon icon={faHeart} />
                            </span>
                            Mes commandes
                        </li>
                    </ul>

                    <ul style={{ margin: "0", padding: "0" }}>
                        <li onClick={logout} style={{ marginTop: '20px', cursor: 'pointer', display: "flex", justifyContent: "flex-start", alignItems: "center", textAlign: 'left' }}>
                            <span style={{ padding: ".5rem" }}>
                                <FontAwesomeIcon icon={faArrowRightFromBracket} />
                            </span>
                            Déconnexion
                        </li>
                    </ul>
                </div>
            )}

            <div style={{ display: "flex" }}>
                {/* Sidebar Desktop */}
                {!isMobile && (
                    <div style={{ width: '250px', backgroundColor: '#fff', boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)', padding: '1rem' }}>
                        <ul style={{ marginTop: "15rem", padding: "0" }}>
                            <h2 style={{ marginTop: '20px', cursor: 'pointer', display: "flex", justifyContent: "flex-start", alignItems: "center", textAlign: 'left' }}>
                                Mon Compte
                            </h2>
                            <li onClick={() => setActiveTab('personalData')} style={{ cursor: 'pointer', marginBottom: '10px', display: "flex", justifyContent: "flex-start", alignItems: "center", textAlign: 'left' }}>
                                <span style={{ padding: ".5rem" }}>
                                    <FontAwesomeIcon icon={faInfo} />
                                </span>
                                Données personnelles
                            </li>
                            <li onClick={() => setActiveTab('favorites')} style={{ cursor: 'pointer', marginBottom: '10px', display: "flex", justifyContent: "flex-start", alignItems: "center", textAlign: 'left' }}>
                                <span style={{ padding: ".5rem" }}>
                                    <FontAwesomeIcon icon={faHeart} />
                                </span>
                                Mes favoris
                            </li>
                            <li onClick={() => { setActiveTab('purchases'); setIsSidebarOpen(false); }} style={{ cursor: 'pointer', marginBottom: '10px', display: "flex", justifyContent: "flex-start", alignItems: "center", textAlign: 'left' }}>
                                <span style={{ padding: ".5rem" }}>
                                    <FontAwesomeIcon icon={faTruck} />                                
                                </span>
                                Mes commandes
                            </li>
                        </ul>

                        <ul style={{ margin: "0", padding: "0" }}>
                            <li onClick={logout} style={{ marginTop: '20px', cursor: 'pointer', display: "flex", justifyContent: "flex-start", alignItems: "center", textAlign: 'left' }}>
                                <span style={{ padding: ".5rem" }}>
                                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                                </span>
                                Déconnexion
                            </li>
                        </ul>
                    </div>
                )}

                {/* Contenu de la page */}
                <div style={{ padding: '1rem', marginLeft: !isMobile ? '50px' : '0', transition: 'margin-left 0.3s ease', marginTop: '10rem' }}>
                    {renderContent()}
                </div>
            </div>

            <Footer />
        </>
    );
}

export default AccountPage;
