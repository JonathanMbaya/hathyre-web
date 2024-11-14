import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Container, Typography, Grid, Box, Snackbar, Alert, CircularProgress } from '@mui/material';
import { LoginContext } from '../../context/login.context';

function PersonalData() {
  const { userConnected, setUserConnected } = useContext(LoginContext);

  const [formData, setFormData] = useState({
    civilite: '',
    nom: '',
    prenom: '',
    clientEmail: '',
    birthday: '',
    mobile: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState('');

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://hathyre-server-api.onrender.com/api/client/${userConnected._id}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );

        setFormData({
          civilite: response.data.civilite || '',
          nom: response.data.nom || '',
          prenom: response.data.prenom || '',
          clientEmail: response.data.clientEmail || '',
          birthday: formatDate(response.data.birthday) || '',
          mobile: response.data.mobile || '',
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        setError('Erreur lors de la récupération des données. Veuillez réessayer.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userConnected._id]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Reset error on input change
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.nom || !formData.prenom || !formData.clientEmail) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    setSaving(true);
    try {
      const response = await axios.put(
        `https://hathyre-server-api.onrender.com/api/update/client/${userConnected._id}`,
        formData,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );

      setUserConnected(response.data);
      setShowPopup(true);
    } catch (error) {
      console.error('Erreur lors de la mise à jour :', error);
      setError('Erreur lors de la mise à jour des données. Veuillez réessayer.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ textAlign: 'center', mt: 5 }}>
        <CircularProgress />
        <Typography variant="h6">Chargement des données...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>Données personnelles</Typography>
      
      <Box component="form" noValidate autoComplete="off" onSubmit={handleSave}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="civilite-label">Civilité</InputLabel>
              <Select
                labelId="civilite-label"
                name="civilite"
                value={formData.civilite}
                onChange={handleInputChange}
              >
                <MenuItem value="Monsieur">Monsieur</MenuItem>
                <MenuItem value="Madame">Madame</MenuItem>
                <MenuItem value="Non défini">Non défini</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Nom" name="nom" value={formData.nom} onChange={handleInputChange} required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Prénom" name="prenom" value={formData.prenom} onChange={handleInputChange} required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Email" name="clientEmail" value={formData.clientEmail} onChange={handleInputChange} required type="email" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Date d'anniversaire" type="date" name="birthday" value={formData.birthday} onChange={handleInputChange} InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Téléphone" name="mobile" value={formData.mobile} onChange={handleInputChange} />
          </Grid>

          <Grid xs={12} sm={12}>
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Button variant="contained" color="primary" type="submit" disabled={saving}>
                {saving ? <CircularProgress size={24} color="inherit" /> : 'Sauvegarder'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Snackbar open={showPopup} autoHideDuration={3000} onClose={() => setShowPopup(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={() => setShowPopup(false)} severity="success">Modifications sauvegardées avec succès !</Alert>
      </Snackbar>

      {error && (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <Alert onClose={() => setError('')} severity="error">{error}</Alert>
        </Snackbar>
      )}
    </Container>
  );
}

export default PersonalData;
