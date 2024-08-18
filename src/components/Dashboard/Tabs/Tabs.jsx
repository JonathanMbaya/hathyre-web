import React, {useState} from 'react';
import UserDashboard from "../UserDashboard/UserDashboard";
import ProductDashboard from "../ProductDashboard/ProductDashboard.jsx";
import OrderDashboard from "../OrderDashboard/OrderDashboard";
import ClientDashboard from "../ClientDashboard/ClientDashboard";
import "./Tabs.css";

function Tabs() {

  const [selectedTab, setSelectedTab] = useState('users');

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className='tabs'>

      <div className='onglets'>
        <button onClick={() => handleTabChange('users')}>
          Administrateurs
        </button>
        <button onClick={() => handleTabChange('products')}>
            Produits
        </button>
        <button onClick={() => handleTabChange('order')}>
            Commandes
        </button>
        <button onClick={() => handleTabChange('client')}>
            Nos Clients
        </button>
      </div>


      {selectedTab === 'users' && <UserDashboard />}
      {selectedTab === 'products' && <ProductDashboard />}
      {selectedTab === 'order' && <OrderDashboard />}
      {selectedTab === 'client' && <ClientDashboard />}
    
    </div>
  )
}

export default Tabs
