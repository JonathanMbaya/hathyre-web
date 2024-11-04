import React, { useContext, useState, useEffect} from 'react';
import axios from 'axios';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Container, Typography, Grid, Box } from '@mui/material';
import { LoginContext } from '../../context/login.context';

function PersonalData() {
  const { userConnected, setUserConnected } = useContext(LoginContext);
  
  // État pour les données utilisateur
  const [formData, setFormData] = useState({
    civilite: '',
    nom: '',
    prenom: '',
    clientEmail: '',
    birthday: '',
    mobile: '',
  });
  
  const [loading, setLoading] = useState(true); // État pour le chargement
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState('');

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

  // Récupérer les données de l'utilisateur connecté lors du montage du composant
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://hathyre-server-api.onrender.com/api/client/${userConnected._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        
        // Mettre à jour l'état avec les données récupérées
        setFormData({
          civilite: response.data.civilite || '',
          nom: response.data.nom || '',
          prenom: response.data.prenom || '',
          clientEmail: response.data.clientEmail || '',
          birthday: formatDate(response.data.birthday) || '',
          mobile: response.data.mobile || '',

        });
      } catch (error) {
        console.error('Erreur lors de la récupération des données de l\'utilisateur :', error);
        setError('Erreur lors de la récupération des données. Veuillez réessayer.');
      } finally {
        setLoading(false); // Fin du chargement
      }
    };

    fetchUserData();
  }, [userConnected._id]); // Exécuter uniquement lorsque userConnected._id change

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const updatedUser = {
      civilite: formData.civilite,
      nom: formData.nom,
      prenom: formData.prenom,
      clientEmail: formData.clientEmail,
      birthday: formData.birthday,
      mobile: formData.mobile
    };

    if (!formData.nom || !formData.prenom || !formData.clientEmail) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    // Utiliser startTransition pour envelopper la mise à jour de l'état

      try {
        const response = await axios.put(
          `https://hathyre-server-api.onrender.com/api/update/client/${userConnected._id}`,
          updatedUser,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        setUserConnected(response.data);
        setShowPopup(true);
        setError('');

        setTimeout(() => {
          setShowPopup(false);
        }, 3000);
      } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
        setError('Erreur lors de la mise à jour des données. Veuillez réessayer.');
      }
    
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
        <Typography variant="h5">Chargement des données...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column' }}>
      <h2>
        Données personnelles
      </h2>

      <Box component="form" noValidate autoComplete="off">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="civilite-label">Civilité</InputLabel>
              <Select
                labelId="civilite-label"
                name="civilite"
                value={formData.civilite}
                label="Civilite"
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
              required
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
              required
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
              required
              type="email"
            />
          </Grid>

          {/* Date de naissance */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Date d'anniversaire"
              type="date"
              name="birthday"
              value={formData.birthday}
              variant="outlined"
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          
          {/* Mobile */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Téléphone"
              type="mobile"
              name="mobile"
              variant="outlined"
              value={formData.mobile}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>

        {error && (
          <Typography color="error.main">
            {error}
          </Typography>
        )}
        {showPopup && (
          <Typography color="success.main">
            Modifications sauvegardées avec succès !
          </Typography>
        )}
      </Box>

      <Box sx={{ textAlign: 'center', marginTop: '2rem' }}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Sauvegarder
        </Button>
      </Box>
    </Container>
  );
}

export default PersonalData;
