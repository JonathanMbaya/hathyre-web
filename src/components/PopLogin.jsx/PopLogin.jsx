import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function PopLogin({ open, handleClose }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Connexion requise</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Vous devez être connecté pour réaliser cette action. Veuillez vous connecter pour continuer.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Fermer
        </Button>
        <Button component={Link} to="/login" color="primary" variant="contained">
          Se connecter
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PopLogin;
