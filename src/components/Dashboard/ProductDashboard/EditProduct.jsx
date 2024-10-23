import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from "@mui/material";


function EditProduct() {
  const { id } = useParams(); // Récupérer l'ID du produit à partir de l'URL
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPromo, setProductPromo] = useState("");
  const [productStock, setProductStock] = useState("");
  const [productConseils, setProductConseils] = useState("");
  const [productIngredients, setProductIngredients] = useState("");
  const [productCategory, setProductCategory] = useState("");

  useEffect(() => {
    // Effectuer une requête pour récupérer les détails du produit à modifier
    axios.get(`https://hathyre-server-api.onrender.com/api/product/${id}`)
      .then((response) => {
        const product = response.data;
        // Mettre à jour les états avec les détails du produit récupéré
        setProductName(product.name);
        setProductPrice(product.price);
        setProductDescription(product.description);
        setProductPromo(product.promo);
        setProductStock(product.stock);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération du produit :", error);
      });
  }, [id]);

  const handleEditProduct = (e) => {
    e.preventDefault();

    const updatedProduct = {
      name: productName,
      price: productPrice,
      description: productDescription,
      conseils: productConseils,
      ingredients: productIngredients,
      category: productCategory,
      promo: productPromo,
      stock: productStock,
    };

    axios.put(`https://hathyre-server-api.onrender.com/api/update/product/${id}`, updatedProduct)
      .then((response) => {
        console.log("Réponse du serveur :", response.data);
        navigate(`/admin/dashboard`);
      })
      .catch((error) => {
        console.error("Erreur lors de la modification du produit :", error);
      });
  };

  const returnButton = () => {
    navigate(`/admin/dashboard`);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        <span>
          <FontAwesomeIcon onClick={returnButton} icon={faCircleArrowLeft} style={{ cursor: 'pointer', marginRight: '10px' }} />
        </span>
        Modifier Produit | {productName}
      </Typography>

      <form onSubmit={handleEditProduct}>
        <Grid container spacing={3}>
          {/* Informations sur le produit */}
          <Grid item xs={12}>
            <Typography variant="h6">Informations sur le produit</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nom"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Prix"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Catégorie du produit</InputLabel>
              <Select
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
              type="number"
              label="Promotion"
              value={productPromo}
              onChange={(e) => setProductPromo(e.target.value)}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Stock disponible"
              value={productStock}
              onChange={(e) => setProductStock(e.target.value)}
              variant="outlined"
            />
          </Grid>

          {/* Autres informations */}
          <Grid item xs={12}>
            <Typography variant="h6">Autres informations</Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description du produit"
              placeholder="Décrivez les caractéristiques physiques du produit."
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Ingrédients"
              placeholder="Listez les ingrédients du produit."
              value={productIngredients}
              onChange={(e) => setProductIngredients(e.target.value)}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Conseils d'utilisation"
              placeholder="Fournissez des conseils pour maximiser l'utilisation du produit."
              value={productConseils}
              onChange={(e) => setProductConseils(e.target.value)}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
            >
              Mettre à jour
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default EditProduct;