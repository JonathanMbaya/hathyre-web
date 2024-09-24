import React, { useContext, useState} from 'react';
import axios from 'axios';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Container, Typography, Grid, Box } from '@mui/material';
import { LoginContext } from '../../context/login.context';

function PersonalData() {
  const { userConnected, setUserConnected } = useContext(LoginContext);

  // Fonction utilitaire pour formater la date au format 'YYYY-MM-DD'
  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };

  // Initialiser les champs avec les valeurs existantes ou des valeurs par défaut vides
  const [formData, setFormData] = useState({
    sexe: userConnected?.sexe || '',
    nom: userConnected?.nom || '',
    prenom: userConnected?.prenom || '',
    clientEmail: userConnected?.clientEmail || '',
    birthday: formatDate(userConnected?.birthday) || '',  // Format de la date
  });

  const [showPopup, setShowPopup] = useState(false);

  // Gestion de la mise à jour des champs du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Gestion de la sauvegarde des modifications
  const handleSave = async (e) => {
    e.preventDefault();

    const updatedUser = {
      sexe: formData.sexe,
      nom: formData.nom,
      prenom: formData.prenom,
      clientEmail: formData.clientEmail,
      birthday: formData.birthday,  // Assurez-vous que le champ 'birthday' est correctement envoyé
    };

    try {
      const response = await axios.put(
        `http://localhost:8080/api/update/client/${userConnected._id}`,
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      
      // Mettre à jour le contexte après succès
      setUserConnected(response.data);
      
      // Afficher la pop-up de succès
      setShowPopup(true);

    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" align="left" gutterBottom>
        Données personnelles
      </Typography>

      <Box component="form" noValidate autoComplete="off">
        <Grid container spacing={3}>
          {/* Sexe */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="sexe-label">Civilité</InputLabel>
              <Select
                labelId="sexe-label"
                name="sexe"
                value={formData.sexe}
                label="Sexe"
                onChange={handleInputChange}
              >
                <MenuItem value="Monsieur">Monsieur</MenuItem>
                <MenuItem value="Madame">Madame</MenuItem>
                <MenuItem value="Non défini">Non défini</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Nom */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nom"
              name="nom"
              value={formData.nom}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>

          {/* Prénom */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Prénom"
              name="prenom"
              value={formData.prenom}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>

          {/* Email */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              name="clientEmail"
              value={formData.clientEmail}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>

          {/* Date de naissance */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Date d'anniversaire"
              type="date"
              name="birthday"
              value={formData.birthday}  // S'assurer que la date est bien dans le bon format
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>

        {/* Affichage du popup de succès */}
        {showPopup && (
          <Typography color="success.main">
            Modifications sauvegardées avec succès !
          </Typography>
        )}
      </Box>

      {/* Bouton Sauvegarder */}
      <Box sx={{ textAlign: 'center', marginTop: '2rem' }}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Sauvegarder
        </Button>
      </Box>
    </Container>
  );
}

export default PersonalData;
