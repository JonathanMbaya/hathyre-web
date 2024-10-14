import React from "react";
import { Container, Typography, Button } from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'; // Icône pour l'erreur

function Error({ currentPage }) {
  
  // Fonction pour rafraîchir et rediriger
  const handleRefresh = () => {
    // Rafraîchir la page et après redirection vers la page d'accueil
    window.location.replace('/');
  };

  return (
    <Container sx={{ textAlign: 'center', marginTop: '5rem' }}>
      <ErrorOutlineIcon sx={{ fontSize: 80, color: 'error.main' }} />
      <Typography variant="h4" color="error" gutterBottom>
        Erreur de navigation
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        La page <strong>{currentPage}</strong> que vous cherchez semble être introuvable ou a rencontré une erreur.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleRefresh}
        sx={{ marginTop: '1rem' }}
      >
        Rafraîchir et retourner à l'accueil
      </Button>
    </Container>
  );
}

export default Error;
