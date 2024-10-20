import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem } from '@mui/material';
import axios from 'axios';

const OrderDetailsDialog = ({ open, onClose, order, setOrders }) => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [carrier, setCarrier] = useState('');
  const [comment, setComment] = useState(''); // Nouveau champ pour le commentaire


  // Met à jour les champs avec les valeurs de la commande sélectionnée
  useEffect(() => {

    if (order) {
      setTrackingNumber(order.orderNumber || '');
      setCarrier(order.deliver || '');
      setComment(order.comment || ''); // Récupérer le commentaire existant, s'il y en a un
    }

  }, [order]);

  const handleSaveUpdates = async () => {
    if (order) {
      try {
        // Requête pour mettre à jour le numéro de suivi, le transporteur et le commentaire
        await axios.put(`https://hathyre-server-api.onrender.com/api/orders/${order._id}/status`, {
          orderNumber: trackingNumber,
          deliver: carrier,
          comments: comment, // Inclure le commentaire dans la requête
          status: order.status, // Statut actuel
        });

        // Mise à jour des commandes localement
        setOrders((prevOrders) =>
          prevOrders.map((o) =>
            o._id === order._id ? { ...o, orderNumber: trackingNumber, deliver: carrier, comments: comment } : o
          )
        );

        onClose(); // Fermer la modale
      } catch (error) {
        console.error("Erreur lors de la mise à jour de la commande :", error);
      }
    }
  };

  return (
    <Dialog  fullWidth="md" maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle>Détails de la commande</DialogTitle>
      <DialogContent>
        {order && (
          <div>
            <h4 style={{marginBottom: "0rem"}}><strong>Référence</strong></h4> <br/> {order._id}
            <h4 style={{marginBottom: "0rem"}}><strong>Nom</strong></h4> <br/> {order.nom}
            <h4 style={{marginBottom: "0rem"}}><strong>Prénom</strong></h4> <br/> {order.prenom}
            <h4 style={{marginBottom: "0rem"}}><strong>Email</strong></h4> <br/> {order.email}
            <h4 style={{marginBottom: "0rem"}}><strong>Mobile</strong> </h4><br/> {order.mobile}
            <h4 style={{marginBottom: "0rem"}}><strong>Adresse</strong></h4> <br/> {order.address}
            <h4 style={{marginBottom: "0rem"}}><strong>Ville</strong></h4> <br/> {order.city}
            <h4 style={{marginBottom: "0rem"}}><strong>Pays</strong></h4> <br/> {order.country}
            <h4 style={{marginBottom: "0rem"}}><strong>Montant total</strong></h4> <br/> {order.montantTotal} EUR
            <h4 style={{marginBottom: "0rem"}}><strong>Articles</strong></h4>
            {order.articles.map((article, index) => (
              <p key={index}>
                {article.quantity} x {article.productName}
              </p>
            ))}
            <h4 style={{marginBottom: "0rem"}}><strong>Suivi</strong></h4>
            <TextField
              fullWidth
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
            />
            <h4 style={{marginBottom: "0rem"}}><strong>Transporteur</strong></h4>
            <Select
              fullWidth
              value={carrier}
              onChange={(e) => setCarrier(e.target.value)}
            >
              <MenuItem value="Colissimo">Colissimo</MenuItem>
              <MenuItem value="Chronopost">Chronopost</MenuItem>
              <MenuItem value="DHL">DHL</MenuItem>
              <MenuItem value="FedEx">FedEx</MenuItem>
              <MenuItem value="UPS">UPS</MenuItem>
              <MenuItem value="TNT">TNT</MenuItem>
            </Select>

            {/* Nouveau champ pour les commentaires */}
            <h4 style={{marginBottom: "0rem"}}>
              <strong>Dernier commentaire</strong>
            </h4>
              
            <br/>

              {
                order.comments ? order.comments : ''
              }
            
            <h4 style={{marginBottom: "0rem"}}>
              <strong>Commentaire</strong>
            </h4>
            <TextField
              fullWidth
              multiline
              rows={4} // Permet de saisir plusieurs lignes
              value={comment} // Utilise directement la valeur de l'état `comment`
              onChange={(e) => setComment(e.target.value)} // Mise à jour du commentaire
            />

            <h4 style={{marginBottom: "0rem"}}><strong>Date</strong></h4> <br/> {new Date(order.date).toLocaleDateString()}
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Fermer</Button>
        <Button onClick={handleSaveUpdates} color="primary">Mettre à jour</Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderDetailsDialog;
