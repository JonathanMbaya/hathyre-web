import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Box, Button, Typography, TextField, Select, MenuItem, InputLabel, FormControl, Grid, Snackbar, Alert } from '@mui/material';
import axios from "axios";

function AddProduct() {
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productIngredients, setProductIngredients] = useState("");
  const [productConseils, setProductConseils] = useState("");
  const [productPromo, setProductPromo] = useState("");
  const [productStock, setProductStock] = useState("");
  const [file, setFile] = useState(null);

  // State for Snackbar notifications
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const navigate = useNavigate();

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!file) {
      setSnackbarMessage("Veuillez sélectionner une image.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("category", productCategory);
    formData.append("price", productPrice);
    formData.append("description", productDescription);
    formData.append("ingredients", productIngredients);
    formData.append("conseils", productConseils);
    formData.append("promo", productPromo);
    formData.append("stock", productStock);
    formData.append("image", file);

    try {
      const response = await axios.post("https://hathyre-server-api.onrender.com/api/add/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      console.log(response.data)

      // Reset fields after success
      setProductName("");
      setProductCategory("");
      setProductPrice("");
      setProductDescription("");
      setProductIngredients("");
      setProductConseils("");
      setProductPromo("");
      setProductStock("");
      setFile(null);

      setSnackbarMessage("Produit ajouté avec succès !");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      const userId = localStorage.getItem('id');
      const userToken = localStorage.getItem('token');
      if (userId && userToken) {
        navigate(`/admin/dashboard/${userId}/${userToken}`);
      } else {
        console.error("ID utilisateur ou jeton d'authentification manquant dans le stockage local.");
        setSnackbarMessage("Erreur lors de la navigation. Veuillez réessayer.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit :", error);
      setSnackbarMessage("Erreur lors de l'ajout du produit. Veuillez réessayer.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const returnButton = () => {
    navigate(`/admin/dashboard`);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        <span>
          <FontAwesomeIcon onClick={returnButton} icon={faCircleArrowLeft} style={{ cursor: 'pointer', marginRight: '10px' }} />
        </span>
        Ajouter un nouveau produit
      </Typography>

      <form onSubmit={handleAddProduct} encType="multipart/form-data">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nom du produit"
              variant="outlined"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="category-label">Catégorie du produit</InputLabel>
              <Select
                labelId="category-label"
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
                label="Catégorie du produit"
              >
                <MenuItem value="">Sélectionner la catégorie</MenuItem>
                <MenuItem value="Savon">Savon</MenuItem>
                <MenuItem value="Beurres et huiles">Beurres et huiles</MenuItem>
                <MenuItem value="Accessoires">Accessoires</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Prix"
              type="number"
              variant="outlined"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Promotion"
              type="number"
              variant="outlined"
              value={productPromo}
              onChange={(e) => setProductPromo(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Stock disponible"
              variant="outlined"
              value={productStock}
              onChange={(e) => setProductStock(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description du produit"
              multiline
              rows={4}
              variant="outlined"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Ingrédients"
              multiline
              rows={4}
              variant="outlined"
              value={productIngredients}
              onChange={(e) => setProductIngredients(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Conseils d'utilisation"
              multiline
              rows={4}
              variant="outlined"
              value={productConseils}
              onChange={(e) => setProductConseils(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              component="label"
              color="primary"
              fullWidth
            >
              Télécharger une image
              <input
                type="file"
                hidden
                onChange={(e) => e.target.files && setFile(e.target.files[0])}
              />
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
            >
              Ajouter le produit
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default AddProduct;
