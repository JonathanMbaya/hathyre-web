import React, { useState } from 'react';
import UserDashboard from "../UserDashboard/UserDashboard";
import ProductDashboard from "../ProductDashboard/ProductDashboard";
import OrderDashboard from "../OrderDashboard/OrderDashboard";
import ClientDashboard from "../ClientDashboard/ClientDashboard";
import { Box, Tab, Tabs, Typography } from '@mui/material';

function TabsDashboard() {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        variant="fullWidth"
        TabIndicatorProps={{
          style: { backgroundColor: '#895832' } // La couleur de l'indicateur (ligne sous l'onglet actif)
        }}
      >
        <Tab
          label="Admin"
          sx={{
            borderBottom: selectedTab === 0 ? '4px solid #895832' : 'none', // Border marron si sélectionné
            color: Tab === '#1976d2' ? '#895832' : 'none', 
          }}
        />
        <Tab
          label="Produits"
          sx={{
            borderBottom: selectedTab === 1 ? '4px solid #895832' : 'none',
          }}
        />
        <Tab
          label="Commandes"
          sx={{
            borderBottom: selectedTab === 2 ? '4px solid #895832' : 'none',
          }}
        />
        <Tab
          label="Clients"
          sx={{
            borderBottom: selectedTab === 3 ? '4px solid #895832' : 'none',
          }}
        />
      </Tabs>

      {/* Contenu des onglets */}
      <TabPanel className="order-dashboard-container" value={selectedTab} index={0}>
        <UserDashboard />
      </TabPanel>
      <TabPanel className="order-dashboard-container" value={selectedTab} index={1}>
        <ProductDashboard />
      </TabPanel>
      <TabPanel className="order-dashboard-container" value={selectedTab} index={2}>
        <OrderDashboard />
      </TabPanel>
      <TabPanel className="order-dashboard-container" value={selectedTab} index={3}>
        <ClientDashboard />
      </TabPanel>
    </Box>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default TabsDashboard;
