import React from 'react';
import Tabs from "../../../components/Tabs/Tabs.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css';

function Dashboard () {
    return (

        <div className = 'dashboard underlay' style={{backgroundImage: `url(${process.env.PUBLIC_URL}/admin-background/form-background.png)`}}>
            
            <div className='head-dash'>
                <h1 style={{ marginLeft: '5%' }}>Hathyre | Tableau de bord </h1>

                <h2 style={{ marginLeft: '5%' }}>Bienvenue, Yann Mayembo <FontAwesomeIcon icon={faPowerOff} /></h2>

            </div>

            <Tabs/>

 
        </div>


    );
};

export default Dashboard;