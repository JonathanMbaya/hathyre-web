import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';

const ProductDashboard = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false); // Pour la popup de confirmation
    const [productToDelete, setProductToDelete] = useState(null); // Produit à supprimer

    useEffect(() => {
        axios.get('https://hathyre-server-api.onrender.com/api/products')
            .then(response => {
                setProducts(response.data);
                setFilteredProducts(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des produits :', error);
            });
    }, []);

    useEffect(() => {
        let filtered = products;

        if (categoryFilter) {
            filtered = filtered.filter(product => product.category === categoryFilter);
        }

        if (searchTerm) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredProducts(filtered);
    }, [categoryFilter, searchTerm, products]);

    const handleOpenConfirmDialog = (product) => {
        setProductToDelete(product); // Définir le produit à supprimer
        setOpenConfirmDialog(true); // Ouvrir la popup de confirmation
    };

    const handleCloseConfirmDialog = () => {
        setOpenConfirmDialog(false); // Fermer la popup de confirmation
        setProductToDelete(null); // Réinitialiser le produit sélectionné
    };

    const handleDeleteProduct = () => {
        if (productToDelete) {
            axios.delete(`https://hathyre-server-api.onrender.com/api/delete/product/${productToDelete._id}`)
                .then(() => {
                    setProducts(products.filter(product => product._id !== productToDelete._id));
                    handleCloseConfirmDialog(); // Fermer la popup après suppression
                })
                .catch(error => {
                    console.error('Erreur lors de la suppression du produit :', error);
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

    return (
        <>
            <div className='board'>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <div>
                        <div style={{ backgroundColor: 'white', borderRadius: '.5rem .5rem 0 0' }} className='head-dash'>
                            <h1 style={{ margin: '.5rem' }}>Produits</h1>
                        </div>

                        <div>
                            <Link to={`/admin/dashboard/product/add`}>
                                <button style={{ margin: '.5rem', borderRadius: '.5rem' }}>
                                    Ajouter un produit <FontAwesomeIcon icon={faPlus} />
                                </button>
                            </Link>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '.5rem' }}>
                            <TextField
                                label="Rechercher un produit..."
                                variant="outlined"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                sx={{ flex: 1, marginRight: '1rem' }}
                            />

                            <FormControl variant="outlined" sx={{ minWidth: 200 }}>
                                <InputLabel>Filtrer par catégorie</InputLabel>
                                <Select
                                    value={categoryFilter}
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                    label="Filtrer par catégorie"
                                >
                                    <MenuItem value="">Tous</MenuItem>
                                    <MenuItem value="Savon">Savon</MenuItem>
                                    <MenuItem value="Beurres et huiles">Beurres et huiles</MenuItem>
                                    <MenuItem value="Accessoires">Accessoires</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>

                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Référence</TableCell>
                                    <TableCell>Nom du produit</TableCell>
                                    <TableCell>Prix du produit</TableCell>
                                    <TableCell>Promotion</TableCell>
                                    <TableCell>Catégorie</TableCell>
                                    <TableCell>Mis à jour</TableCell>
                                    <TableCell>Modifier / Détails</TableCell>
                                    <TableCell>Supprimer</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredProducts
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((product) => (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={product._id}>
                                            <TableCell>{product._id}</TableCell>
                                            <TableCell>{product.name}</TableCell>
                                            <TableCell>{product.price} EUR</TableCell>
                                            <TableCell>{product.promo} %</TableCell>
                                            <TableCell>{product.category}</TableCell>
                                            <TableCell>{new Date(product.updatedAt).toLocaleDateString()}</TableCell>
                                            <TableCell>
                                                <Link to={`/admin/dashboard/product/edit/${product._id}`}>
                                                    <FontAwesomeIcon style={{color: 'gray'}} icon={faEllipsis} />
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    style={{ cursor: 'pointer' }}
                                                    variant="contained"
                                                    color="error"
                                                    onClick={() => handleOpenConfirmDialog(product)} // Ouvrir la popup de confirmation
                                                    startIcon={<FontAwesomeIcon icon={faTrash} />}
                                                    >
                                                    Supprimer
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Pagination */}
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={filteredProducts.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
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
                        Êtes-vous sûr de vouloir supprimer ce produit ? Cette action est irréversible.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirmDialog} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={handleDeleteProduct} color="error" autoFocus>
                        Supprimer
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ProductDashboard;
