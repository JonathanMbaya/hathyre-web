import React from "react";
import {Link} from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleCheck } from '@fortawesome/free-solid-svg-icons';

function Error({ currentPage }) {
  
  // Fonction pour rafraîchir et rediriger
  const handleRefresh = () => {
    // Rafraîchir la page et après redirection vers la page d'accueil
    window.location.replace('/');
  };

  return (
    <Container sx={{ textAlign: 'center', marginTop: '5rem' }}>
      <FontAwesomeIcon style={{color:'green'}} icon={faCircleCheck} size="4x" />

      <Typography variant="h4" color="success" gutterBottom>
        Inscription confirmé 
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Vous avez confirmé votre compte Hathyre. Vous pouvez vous connecter à présent.
      </Typography>
      <Link to="/login">
        <Button
          variant="contained"
          color="primary"
          onClick={handleRefresh}
          sx={{ marginTop: '1rem' }}
        >
          Se connecter
        </Button>
      </Link>

    </Container>
  );
}

export default Error;
