import React from "react";
import {Link} from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleCheck } from '@fortawesome/free-solid-svg-icons';

function ValidationPayment({ currentPage }) {
  
  // Fonction pour rafraîchir et rediriger
  const handleRefresh = () => {
    window.location.replace('/');
  };

  return (
    <Container sx={{ textAlign: 'center', marginTop: '5rem' }}>
        <FontAwesomeIcon style={{color:'green'}} icon={faCircleCheck} size="4x" />
      <Typography variant="h3" color="success" gutterBottom>
        Paiement validé avec vérification 3D Secure 
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Votre commande est en cours de préparation et va être prise en charge par l'équipe Hathyre.
      </Typography>
      <Link to="/">
        <Button
          variant="contained"
          color="primary"
          onClick={handleRefresh}
          sx={{ marginTop: '1rem' }}
        >
          Revenir sur Hathyre
        </Button>
      </Link>

    </Container>
  );
}

export default ValidationPayment;
