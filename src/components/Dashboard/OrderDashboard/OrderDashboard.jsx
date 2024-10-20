import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import { contactNotif } from '../../../utils/config.email.js';
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
  TablePagination
} from '@mui/material';
import OrderDetailsDialog from "./OrderDetailsDialog.jsx";

const OrderDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [showTrackingPopup, setShowTrackingPopup] = useState(false);
  const [filteredStatus, setFilteredStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [clientToDelete, setClientToDelete] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedCarrier, setSelectedCarrier] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false); // Indicateur de chargement

  const carriers = ['Colissimo', 'Chronopost', 'DHL', 'FedEx', 'UPS', 'TNT'];

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://hathyre-server-api.onrender.com/api/orders');
      setOrders(response.data);
      setFilteredOrders(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des commandes:', error);
    }
    setLoading(false);
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

  const handleRefund = (order) => {
    const amount = prompt('Entrez le montant à rembourser (en EUR) :');
    if (!amount || isNaN(amount)) {
      alert("Veuillez entrer un montant valide.");
      return;
    }

    const refundData = {
      paymentIntentId: order.paymentIntentId,
      amount: parseFloat(amount),
      orderId: "pi_3QBNM0LEHh2o4Mgi1ZRwWsgH",
      userEmail: order.userEmail,
    };

    processRefund(refundData);
  };

  const processRefund = async (refundData) => {
    try {
      const response = await axios.post('http://localhost:8080/stripe/refund', refundData);
      if (response.data.success) {
        alert('Remboursement effectué avec succès');
        setOrders(prevOrders => prevOrders.map(order => 
          order._id === refundData.orderId ? { ...order, status: 'Remboursé' } : order
        ));
      } else {
        alert('Erreur lors du remboursement : ' + response.data.error);
      }
    } catch (error) {
      console.error('Erreur lors du remboursement', error);
      alert('Erreur lors du remboursement.');
    }
  };

  const updateOrderStatus = async (orderId, newStatus, trackingNumber = '') => {
    try {
      await axios.put(`https://hathyre-server-api.onrender.com/api/orders/${orderId}/status`, { status: newStatus, orderNumber: trackingNumber, deliver: selectedCarrier });

      if (newStatus === 'Remboursé') {
        const order = orders.find((order) => order._id === orderId);
        if (order) {
          const amountInCents = Math.round(order.montantTotal * 100);
          await processRefund({ paymentIntentId: order.paymentIntentId, amount: amountInCents });
        }
      }

      setOrders(orders.map((order) => (order._id === orderId ? { ...order, status: newStatus, orderNumber: trackingNumber, deliver: selectedCarrier } : order)));
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
        orderNumber: trackingNumber || order.orderNumber,
        deliver: selectedCarrier || order.deliver,
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

  const handleStatusChange = (e, orderId) => {
    const status = e.target.value;
    const order = orders.find((o) => o._id === orderId);

    if (status === 'Expédié' && order.status !== 'Livré') {
      setSelectedOrderId(orderId);
      setShowTrackingPopup(true);
    } else if (status === 'Livré' && order.status === 'Expédié') {
      updateOrderStatus(orderId, 'Livré');
    } else if (status === 'Remboursé') {
      handleRefund(order);
    } else if (status === 'Annulé' && order.status !== 'Livré') {
      updateOrderStatus(orderId, 'Annulé');
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
    if (!trackingNumber) {
      alert('Veuillez entrer un numéro de suivi.');
      return;
    }
    if (!selectedCarrier) {
      alert('Veuillez sélectionner un transporteur.');
      return;
    }
    updateOrderStatus(selectedOrderId, 'Expédié', trackingNumber);
    setShowTrackingPopup(false);
    setTrackingNumber('');
    setSelectedCarrier('');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDetailsModal = (order) => {
    setSelectedOrder(order);
    setOpenDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setOpenDetailsModal(false);
    setSelectedOrder(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'En cours de préparation':
        return 'yellow';
      case 'Expédié':
        return 'orange';
      case 'Livré':
        return 'green';
      case 'Annulé':
        return 'red';
      case 'Remboursé':
        return 'gray';
      default:
        return 'white';
    }
  };


  return (
    <div className="order-dashboard-container">
      {loading ? <p>Chargement des commandes...</p> : null}

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
            <MenuItem value="Remboursé">Remboursé</MenuItem>
          </Select>
        </FormControl>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Info</TableCell>
              <TableCell>Référence</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Prénom</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Montant Total</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {filteredOrders
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Pagination
              .map((order) => (
                <TableRow key={order._id}>
                  <TableCell>
                    <div
                      style={{ 
                        backgroundColor: getStatusColor(order.status), 
                        width:"10px" ,
                        height:"10px",
                        borderRadius: "100%"
                      }}>
                    </div>
                  </TableCell>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{order.nom}</TableCell>
                  <TableCell>{order.prenom}</TableCell>
                  <TableCell>{order.email}</TableCell>
                  <TableCell>{order.montantTotal}€</TableCell>
                  <TableCell>
                    <Select value={order.status} onChange={(e) => handleStatusChange(e, order._id)}>
                      <MenuItem value="En cours de préparation">En cours de préparation</MenuItem>
                      <MenuItem value="Expédié">Expédié</MenuItem>
                      <MenuItem value="Livré">Livré</MenuItem>
                      <MenuItem value="Annulé">Annulé</MenuItem>
                      <MenuItem value="Remboursé">Remboursé</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleOpenDetailsModal(order)}>
                      <FontAwesomeIcon icon={faEllipsis} />
                    </Button>
                    <Button onClick={() => handleOpenConfirmDialog(order)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={filteredOrders.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Pop-up pour le numéro de suivi */}
      <Dialog open={showTrackingPopup} onClose={() => setShowTrackingPopup(false)}>
        <DialogTitle>Entrez le numéro de suivi et le transporteur</DialogTitle>
        <DialogContent>
          <TextField
            label="Numéro de Suivi"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth>
            <InputLabel>Transporteur</InputLabel>
            <Select
              value={selectedCarrier}
              onChange={(e) => setSelectedCarrier(e.target.value)}
            >
              {carriers.map((carrier) => (
                <MenuItem key={carrier} value={carrier}>{carrier}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowTrackingPopup(false)}>Annuler</Button>
          <Button onClick={handleTrackingSubmit} color="primary">Valider</Button>
        </DialogActions>
      </Dialog>

      {/* Détails de la commande */}
      <OrderDetailsDialog open={openDetailsModal} onClose={handleCloseDetailsModal} order={selectedOrder} />

      {/* Confirmation de suppression */}
      <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>Voulez-vous vraiment supprimer cette commande ?</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="primary">
            Annuler
          </Button>
          <Button onClick={() => deleteOrder(clientToDelete._id)} color="secondary">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OrderDashboard;
