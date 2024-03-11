import React, {useState} from 'react';
import UserDashboard from "../../pages/admin/Dashboard/UserDashboard";
import ProductDashboard from "../../pages/admin/Dashboard/ProductDashboard";
import OrderDashboard from "../../pages/admin/Dashboard/OrderDashboard";
import ClientDashboard from "../../pages/admin/Dashboard/ClientDashboard";
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
