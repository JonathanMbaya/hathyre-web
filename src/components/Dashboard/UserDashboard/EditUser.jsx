import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Snackbar, Alert, Box, CircularProgress, Dialog, DialogContent, DialogTitle } from '@mui/material';

function EditUser({ open, onClose, id }) {
    const navigate = useNavigate();

    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(true); // État pour le chargement
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    // Récupérer les données de l'utilisateur via l'API
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`https://hathyre-server-api.onrender.com/api/user/${id}`);
                const userData = response.data;
                setNom(userData.nom);
                setPrenom(userData.prenom);
                setEmail(userData.email);
            } catch (error) {
                console.error('Erreur lors de la récupération de l\'utilisateur :', error);
                setSnackbarMessage("Erreur lors du chargement des données.");
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
            } finally {
                setLoading(false); // Fin du chargement
            }
        };

        fetchUser();
    }, [id]);

    // Gérer la soumission du formulaire de mise à jour
    const handleEditUser = async (e) => {
        e.preventDefault();

        const updatedUser = {
            nom,
            prenom,
            email,
            password
        };

        try {
            await axios.put(`https://hathyre-server-api.onrender.com/api/update/user/${id}`, updatedUser);
            setSnackbarMessage("Utilisateur mis à jour avec succès.");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);
            setTimeout(() => {
                onClose(); // Ferme la modale après la mise à jour
                navigate('/admin/dashboard'); // Rediriger vers le tableau de bord après la mise à jour
            }, 2000);
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
            setSnackbarMessage("Erreur lors de la mise à jour.");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        ); // Affichage d'un indicateur de chargement
    }

    return (
        <Dialog open={open} onClose={onClose}>
          <DialogTitle style={{textAlign: "center"}}>Éditer l'utilisateur</DialogTitle>
            <DialogContent>
              <Box sx={{ padding: '1rem' }}>
                <form style={{display:"flex", flexDirection:"column"}} onSubmit={handleEditUser}>
                      <TextField
                        fullWidth
                        label="Nom"
                        variant="outlined"
                        margin="normal"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        required
                      />

                      <TextField
                          fullWidth
                          label="Prénom"
                          variant="outlined"
                          margin="normal"
                          value={prenom}
                          onChange={(e) => setPrenom(e.target.value)}
                          required
                      />
                      <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        type="email"
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />

                      <TextField
                        fullWidth
                        label="password"
                        variant="outlined"
                        type="password"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <Box sx={{ textAlign: 'center', marginTop: '2rem' }}>
                          <Button variant="contained" color="primary" type="submit">
                              Mettre à jour
                          </Button>
                      </Box>
                    </form>
                </Box>
            </DialogContent>

            {/* Snackbar pour les messages de succès ou d'erreur */}
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Dialog>
    );
}

export default EditUser;
