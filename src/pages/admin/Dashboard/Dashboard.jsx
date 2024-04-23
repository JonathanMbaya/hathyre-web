import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../../context/login.context";
import Tabs from '../../../components/Dashboard/Tabs/Tabs.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css';

function Dashboard() {
    const navigate = useNavigate();
    const { user } = useContext(LoginContext);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('nom');
        localStorage.removeItem('prenom');
        navigate('/admin/login');
    };

    return (
        <div className='dashboard underlay' style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/admin-background/form-background.png)` }}>
            <div className='head-dash'>
                <h1 style={{ marginLeft: '5%' }}>Hathyre | Tableau de bord </h1>
                {user && (
                    <h2 style={{ marginLeft: '5%' }}>Bienvenue, {localStorage.getItem('nom')} {localStorage.getItem('prenom')}
                        <FontAwesomeIcon onClick={handleLogout} icon={faPowerOff} />
                    </h2>
                )}
            </div>
            <Tabs />
        </div>
    );
}

export default Dashboard;
