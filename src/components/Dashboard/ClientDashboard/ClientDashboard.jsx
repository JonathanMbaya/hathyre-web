import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

const ClientDashboard = () => {
  const [clients, setClients] = useState([]); // Liste des clients
  const [page, setPage] = useState(0); // Page actuelle
  const [rowsPerPage, setRowsPerPage] = useState(5); // Nombre de lignes par page
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false); // État pour la popup de confirmation
  const [clientToDelete, setClientToDelete] = useState(null); // Client à supprimer

  // Récupération des clients
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('https://hathyre-server-api.onrender.com/api/clients');
        setClients(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des clients:', error);
      }
    };

    fetchClients();
  }, []);

  // Ouverture de la popup de confirmation
  const handleOpenConfirmDialog = (client) => {
    setClientToDelete(client);
    setOpenConfirmDialog(true);
  };

  // Fermeture de la popup de confirmation
  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setClientToDelete(null);
  };

  // Suppression d'un client
  const handleDelete = async () => {
    if (clientToDelete) {
      try {
        console.log(`Suppression du client avec ID: ${clientToDelete._id}`); // Log pour vérifier l'ID
        await axios.delete(`https://hathyre-server-api.onrender.com/api/delete/client/${clientToDelete._id}`);
        setClients(clients.filter((client) => client._id !== clientToDelete._id));
        handleCloseConfirmDialog();
      } catch (error) {
        console.error('Erreur lors de la suppression du client:', error);
        alert("Une erreur s'est produite lors de la suppression du client. Veuillez réessayer."); // Message d'erreur
      }
    } else {
      console.warn('Aucun client sélectionné pour la suppression'); // Log si clientToDelete est nul
    }
  };

  // Gestion du changement de page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Gestion du changement du nombre de lignes par page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Réinitialiser la page à 0 après changement
  };

  return (

    <>
    <div style={{ marginBottom: '1rem' }}>
      <h1>Clients</h1>
    </div>

    <Paper elevation={3} sx={{ padding: 2 }}>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ref. Client</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Prénom</TableCell>
              <TableCell>Adresse de livraison</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Tel. Mobile</TableCell>
              <TableCell>Montant dépensé</TableCell>
              <TableCell>Supprimer</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {clients
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((client) => (
                <TableRow key={client._id}>
                  <TableCell>{client.token}</TableCell>
                  <TableCell>{client.nom}</TableCell>
                  <TableCell>{client.prenom}</TableCell>
                  <TableCell>{client.address}</TableCell>
                  <TableCell>{client.clientEmail}</TableCell>
                  <TableCell>{client.mobile}</TableCell>
                  <TableCell>{client.montantDepense} EUR</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleOpenConfirmDialog(client)} // Ouvrir la popup de confirmation
                      startIcon={<FontAwesomeIcon icon={faTrash} />}
                    >
                      Supprimer
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]} // Options pour le nombre de lignes par page
          component="div"
          count={clients.length} // Nombre total de clients
          rowsPerPage={rowsPerPage} // Lignes affichées par page
          page={page} // Page actuelle
          onPageChange={handleChangePage} // Fonction pour changer de page
          onRowsPerPageChange={handleChangeRowsPerPage} // Fonction pour changer le nombre de lignes par page
        />
      </TableContainer>

      {/* Popup de confirmation */}
      <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir supprimer ce client ? Cette action est irréversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="primary">
            Annuler
          </Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
    </>
  );
};

export default ClientDashboard;
