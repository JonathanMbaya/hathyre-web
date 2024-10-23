import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { LoginContext } from '../../../context/login.context';
import axios from "axios";
import AddUser from './AddUser'; 
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';
import EditUser from './EditUser';

const UserDashboard = () => {
    const { userConnected } = useContext(LoginContext);
    const [showAddUserPopup, setShowAddUserPopup] = useState(false); // Contrôle de la modale d'ajout d'utilisateur
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [showEditUserPopup, setShowEditUserPopup] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    useEffect(() => {
        axios.get('https://hathyre-server-api.onrender.com/api/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des utilisateurs :', error);
                setSnackbarMessage("Erreur lors de la récupération des utilisateurs.");
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
            });
    }, []);

    const handleOpenConfirmDialog = (user) => {
        setUserToDelete(user);
        setOpenConfirmDialog(true);
    };

    const handleCloseConfirmDialog = () => {
        setOpenConfirmDialog(false);
        setUserToDelete(null);
    };

    const handleDeleteUser = () => {
        if (userToDelete) {
            axios.delete(`https://hathyre-server-api.onrender.com/api/delete/user/${userToDelete._id}`)
                .then(() => {
                    setUsers(users.filter(user => user._id !== userToDelete._id));
                    setSnackbarMessage("Utilisateur supprimé avec succès.");
                    setSnackbarSeverity("success");
                    setSnackbarOpen(true);
                    handleCloseConfirmDialog();
                })
                .catch(error => {
                    console.error('Erreur lors de la suppression de l\'utilisateur :', error);
                    setSnackbarMessage("Erreur lors de la suppression de l'utilisateur.");
                    setSnackbarSeverity("error");
                    setSnackbarOpen(true);
                });
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    function SlideTransition(props) {
        return <Slide {...props} direction="down" />;
    }

    const handleEditUserClick = (userId) => {
        setCurrentUserId(userId);
        setShowEditUserPopup(true);
    };

    return (
        <>
            <div className='board'>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <div>
                        <div className='head-dash' style={{backgroundColor: 'white', borderRadius: '.5rem .5rem 0 0'}}>
                            <h1 style={{margin: '.5rem'}}>Administrateurs</h1>
                        </div>
                        <button onClick={() => setShowAddUserPopup(true)} style={{ padding: '1rem', margin: '.5rem', borderRadius: '.5rem', border:"none", backgroundColor:"blanchedalmond"  }}>
                            Ajouter un administrateur <FontAwesomeIcon icon={faPlus} />
                        </button>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nom</TableCell>
                                        <TableCell>Prénom</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Token</TableCell>
                                        <TableCell>Créé le</TableCell>
                                        <TableCell>Modifier</TableCell>
                                        <TableCell>Supprimer</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map(user => (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={user._id}>
                                                <TableCell>{user.nom}</TableCell>
                                                <TableCell>{user.prenom}</TableCell>
                                                <TableCell>{user.email}</TableCell>
                                                <TableCell>{user.token}</TableCell>
                                                <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                                                <TableCell onClick={() => handleEditUserClick(user._id)}>
                                                    <FontAwesomeIcon style={{color: 'gray'}} icon={faEllipsis} />
                                                </TableCell>
                                                <TableCell>
                                                    {userConnected._id !== user._id && (
                                                        <Button
                                                            onClick={() => handleOpenConfirmDialog(user)}
                                                            variant="contained"
                                                            color="error"
                                                            startIcon={<FontAwesomeIcon icon={faTrash} />}
                                                        >
                                                            Supprimer
                                                        </Button>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={users.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </div>
                </Paper>
            </div>

            {/* Popup de confirmation */}
            <Dialog
                open={openConfirmDialog}
                onClose={handleCloseConfirmDialog}
            >
                <DialogTitle>Confirmer la suppression</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirmDialog} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={handleDeleteUser} color="error" autoFocus>
                        Supprimer
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Afficher la fenêtre modale pour ajouter un utilisateur */}
            <Dialog
                open={showAddUserPopup}
                onClose={() => setShowAddUserPopup(false)}
                aria-labelledby="add-user-dialog-title"
                fullWidth
                maxWidth="sm" // Ajuste la taille de la fenêtre modale
            >
                <DialogTitle id="add-user-dialog-title">
                    Ajouter un Administrateur
                    <Button
                        onClick={() => setShowAddUserPopup(false)}
                        sx={{ position: 'absolute', right: 8, top: 8 }}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                </DialogTitle>
                <DialogContent dividers>
                    <AddUser />
                </DialogContent>
            </Dialog>

            {/* Modal pour l'édition d'un utilisateur */}
                {showEditUserPopup && (
                    <EditUser id={currentUserId} open={showEditUserPopup} onClose={() => setShowEditUserPopup(false)} />
                )}
            {/* Snackbar pour les messages de succès ou d'erreur */}

            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                TransitionComponent={SlideTransition}  // Utilise SlideTransition pour gérer la direction
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default UserDashboard;
