import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../../context/login.context";
import Tabs from '../../../components/Dashboard/Tabs/Tabs.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css';

function Dashboard() {
    const navigate = useNavigate();
    const { userConnected } = useContext(LoginContext);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        navigate('/admin/login');
    };

    return (
        <div className='dashboard' style={{ backgroundColor: `bisque` }}>
            <div className='head-dash'>

                <h1 style={{ marginLeft: '5%' }}>Hathyre | Tableau de bord </h1>

                <div style={{cursor: 'pointer'}} onClick={handleLogout}>
                    {userConnected.prenom} {userConnected.nom} | Se déconnecter <FontAwesomeIcon icon={faPowerOff} />
                </div>
                
            </div>

            <Tabs/>
        </div>
    );
}

export default Dashboard;
