import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box, Typography, IconButton } from '@mui/material';

function AddUser() {
    const navigate = useNavigate();

    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const handleAddUser = async (e) => {
        e.preventDefault();

        const newUser = {
            nom,
            prenom,
            email,
            password
        };

        try {
            const response = await axios.post('https://hathyre-server-api.onrender.com/api/add/user', newUser);
            console.log('Réponse du serveur :', response.data);
            // Réinitialiser les champs après avoir ajouté l'utilisateur avec succès
            setNom('');
            setPrenom('');
            setEmail('');
            setPassword('');
            // Afficher la pop-up de succès
            setShowPopup(true);

            // Rediriger vers une autre page après l'ajout réussi de l'utilisateur
            navigate(`/admin/dashboard`); // Utilisation de user extrait du contexte
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'utilisateur :", error);
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        window.location.reload(); // Rafraîchir la page
    };

    return (
        <Box sx={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
            <Typography style={{textAlign: "center"}} variant="h4" gutterBottom>
                Ajouter un Utilisateur
            </Typography>
            <form style={{display:"flex", flexDirection:"column"}} onSubmit={handleAddUser}>
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
                    label="Mot de passe"
                    variant="outlined"
                    type="password"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Box sx={{ textAlign: 'center', marginTop: '2rem' }}>
                    <button style={{ padding: "1rem 3rem", backgroundColor: "blanchedalmond", border: "none" , borderRadius: ".5rem" }} type="submit">
                        Ajouter
                    </button>
                </Box>
            </form>

            {/* Dialog (Popup) pour confirmer l'ajout d'un utilisateur */}
            <Dialog
                open={showPopup}
                onClose={handleClosePopup}
            >
                <DialogTitle>
                    Succès
                    <IconButton
                        aria-label="close"
                        onClick={handleClosePopup}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        L'utilisateur a été ajouté avec succès!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Link to={`/admin/dashboard`} style={{ textDecoration: 'none' }}>
                        <Button color="primary">
                            Retour au Dashboard
                        </Button>
                    </Link>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default AddUser;
