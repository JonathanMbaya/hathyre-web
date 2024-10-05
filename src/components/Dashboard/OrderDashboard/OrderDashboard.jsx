import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import { contactNotif } from '../../../utils/config.email.js';
import Pagination from '../../Pagination/Pagination.jsx';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

const OrderDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [showTrackingPopup, setShowTrackingPopup] = useState(false);
  const [filteredStatus, setFilteredStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [clientToDelete, setClientToDelete] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('https://hathyre-server-api.onrender.com/api/orders');
      setOrders(response.data);
      setFilteredOrders(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des commandes:', error);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(`https://hathyre-server-api.onrender.com/api/orders/${orderId}`);
      setOrders(orders.filter((order) => order._id !== orderId));
      setOpenConfirmDialog(false);
      setClientToDelete(null);
    } catch (error) {
      console.error('Erreur lors de la suppression de la commande:', error);
    }
  };

  const updateOrderStatus = async (orderId, newStatus, trackingNumber = '') => {
    try {
      await axios.patch(`https://hathyre-server-api.onrender.com/api/orders/${orderId}/status`, { status: newStatus, trackingNumber });
      setOrders(orders.map((order) => (order._id === orderId ? { ...order, status: newStatus, trackingNumber } : order)));
      sendEmailNotification(orderId, newStatus, trackingNumber);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut de la commande:', error);
    }
  };

  const sendEmailNotification = async (orderId, newStatus, trackingNumber = '') => {
    const order = orders.find((order) => order._id === orderId);
    if (!order) return;

    try {
      const templateParams = {
        ref: order._id,
        name: order.nom,
        prenom: order.prenom,
        email: order.email,
        address: order.address,
        postalCode: order.postalCode,
        city: order.city,
        country: order.country,
        mobile: order.mobile,
        montant: order.montantTotal,
        articles: order.articles.map((article) => `${article.quantity}x ${article.productName}`).join(', '),
        status: newStatus,
        orderNumber: trackingNumber,
      };

      await emailjs.send(
        contactNotif.YOUR_SERVICE_ID,
        contactNotif.YOUR_TEMPLATE_ID,
        templateParams,
        contactNotif.YOUR_USER_ID
      );

      console.log('Email de changement de statut envoyé');
    } catch (error) {
      console.log('Erreur lors de l\'envoi de l\'email de confirmation:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    let filtered = orders;

    if (filteredStatus) {
      filtered = filtered.filter(order => order.status === filteredStatus);
    }

    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredOrders(filtered);
  }, [filteredStatus, searchTerm, orders]);

  const handlePageChange = (page) => setCurrentPage(page);

  const handleStatusChange = (e, orderId) => {
    const status = e.target.value;

    if (status === 'Expédié') {
      setSelectedOrderId(orderId);
      setShowTrackingPopup(true);
    } else {
      updateOrderStatus(orderId, status);
    }
  };

  const handleOpenConfirmDialog = (order) => {
    setClientToDelete(order);
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setClientToDelete(null);
  };

  const handleTrackingSubmit = () => {
    if (trackingNumber && selectedOrderId) {
      updateOrderStatus(selectedOrderId, 'Expédié', trackingNumber);
      setShowTrackingPopup(false);
      setTrackingNumber('');
    } else {
      alert('Veuillez entrer un numéro de suivi.');
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <h1>Commandes</h1>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <TextField
          label="Rechercher une commande"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flex: 1, marginRight: '1rem' }}
        />

        <FormControl variant="outlined" sx={{ minWidth: 200 }}>
          <InputLabel>Filtrer par statut</InputLabel>
          <Select
            value={filteredStatus}
            onChange={(e) => setFilteredStatus(e.target.value)}
            label="Filtrer par statut"
          >
            <MenuItem value="">Toutes</MenuItem>
            <MenuItem value="En cours de préparation">En cours de préparation</MenuItem>
            <MenuItem value="Expédié">Expédié</MenuItem>
            <MenuItem value="Livré">Livré</MenuItem>
            <MenuItem value="Annulé">Annulé</MenuItem>
          </Select>
        </FormControl>
      </div>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Référence</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Prénom</TableCell>
              <TableCell>Ville</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Téléphone</TableCell>
              <TableCell>Montant</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell>Modifier</TableCell>
              <TableCell>Supprimer</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredOrders
              .slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage)
              .map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{order.nom}</TableCell>
                  <TableCell>{order.prenom}</TableCell>
                  <TableCell>{order.city}</TableCell>
                  <TableCell>{order.email}</TableCell>
                  <TableCell>{order.mobile}</TableCell>
                  <TableCell>{order.montantTotal} EUR</TableCell>
                  <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onChange={(e) => handleStatusChange(e, order._id)}
                    >
                      <MenuItem value="En cours de préparation">En cours de préparation</MenuItem>
                      <MenuItem value="Expédié">Expédié</MenuItem>
                      <MenuItem value="Livré">Livré</MenuItem>
                      <MenuItem value="Annulé">Annulé</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <FontAwesomeIcon 
                        style={{color: 'gray', cursor: 'pointer'}} 
                        icon={faEllipsis}
                        onClick={() => handleStatusChange({ target: { value: order.status } }, order._id)} 
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleOpenConfirmDialog(order)}
                      startIcon={<FontAwesomeIcon icon={faTrash} />}
                    >
                      Supprimer
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalCount={filteredOrders.length}
        pageSize={ordersPerPage}
        onPageChange={page => handlePageChange(page)}
      />

      {/* Popup de suivi */}
      <Dialog open={showTrackingPopup} onClose={() => setShowTrackingPopup(false)}>
        <DialogTitle>Entrez le numéro de suivi</DialogTitle>
        <DialogContent>
          <TextField
            label="Numéro de suivi"
            fullWidth
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTrackingSubmit}>Envoyer</Button>
          <Button onClick={() => setShowTrackingPopup(false)}>Annuler</Button>
        </DialogActions>
      </Dialog>

      {/* Popup de confirmation de suppression */}
      <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
        <DialogTitle>Confirmation de suppression</DialogTitle>
        <DialogContent>
          Êtes-vous sûr de vouloir supprimer cette commande ?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog}>Annuler</Button>
          <Button onClick={() => deleteOrder(clientToDelete._id)}>Supprimer</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default OrderDashboard;
