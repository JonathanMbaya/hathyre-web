import React, { useState } from 'react';
import UserDashboard from "../UserDashboard/UserDashboard";
import ProductDashboard from "../ProductDashboard/ProductDashboard";
import OrderDashboard from "../OrderDashboard/OrderDashboard";
import ClientDashboard from "../ClientDashboard/ClientDashboard";
import { Box, Tabs, Tab, Typography, AppBar } from '@mui/material';

function TabsDashboard() {
  const [selectedTab, setSelectedTab] = useState(0); // Change to track by index

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <AppBar position="static" color="default">
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          indicatorColor="#895832"
          textColor="#895832"
          variant="fullWidth"
        >
          <Tab label="Admin ." />
          <Tab label="Produits" />
          <Tab label="Commandes" />
          <Tab label="Clients" />
        </Tabs>
      </AppBar>
      <TabPanel value={selectedTab} index={0}>
        <UserDashboard />
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        <ProductDashboard />
      </TabPanel>
      <TabPanel value={selectedTab} index={2}>
        <OrderDashboard />
      </TabPanel>
      <TabPanel value={selectedTab} index={3}>
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
