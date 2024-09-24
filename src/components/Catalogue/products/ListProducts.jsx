import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpShortWide, faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import {
  Box,
  Grid,
  CardMedia,
  CardContent,
  Typography,
  Drawer,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { LoginContext } from '../../../context/login.context.jsx';  // Contexte de connexion
import { FavoritesContext } from '../../../context/favorites.context.jsx';  // Contexte des favoris

const ListProducts = () => {
  const { userConnected } = useContext(LoginContext); // Vérifier si l'utilisateur est connecté
  const { favoriteItems, addToFavorites, removeFromFavorites } = useContext(FavoritesContext); // Gestion des favoris

  const [products, setProducts] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState({
    sortByName: '',
    sortByPrice: '',
    category: '',
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/products`, {
          params: filterCriteria,
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des produits :', error);
      }
    };

    fetchProducts();
  }, [filterCriteria]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilterCriteria((prevCriteria) => ({
      ...prevCriteria,
      [name]: value,
    }));
  };

  // Fonction pour gérer le like/unlike
  const handleLikeToggle = (productId) => {
    if (!userConnected) {
      alert('Vous devez être connecté pour liker un produit.');
      return;
    }

    // Si le produit est déjà dans les favoris, on le retire
    if (favoriteItems.includes(productId)) {
      removeFromFavorites(productId);
    } else {
      addToFavorites(productId);
    }
  };

  return (
    <Box sx={{ display: 'flex', padding: '2rem' }}>
      {/* Sidebar pour les filtres */}
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250, padding: '1rem' }}>
          <Typography variant="h6">Filtres</Typography>

          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel id="category-label">Catégorie</InputLabel>
            <Select
              labelId="category-label"
              name="category"
              value={filterCriteria.category}
              onChange={handleFilterChange}
              label="Catégorie"
            >
              <MenuItem value="">Tous</MenuItem>
              <MenuItem value="Savon">Savon</MenuItem>
              <MenuItem value="Beurres et Huiles">Beurres et Huiles</MenuItem>
              <MenuItem value="Accessoires">Accessoires</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel id="sortByName-label">Trier par nom</InputLabel>
            <Select
              labelId="sortByName-label"
              name="sortByName"
              value={filterCriteria.sortByName}
              onChange={handleFilterChange}
              label="Trier par nom"
            >
              <MenuItem value="">Aucun</MenuItem>
              <MenuItem value="asc">A-Z</MenuItem>
              <MenuItem value="desc">Z-A</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth variant="outlined">
            <InputLabel id="sortByPrice-label">Trier par prix</InputLabel>
            <Select
              labelId="sortByPrice-label"
              name="sortByPrice"
              value={filterCriteria.sortByPrice}
              onChange={handleFilterChange}
              label="Trier par prix"
            >
              <MenuItem value="">Aucun</MenuItem>
              <MenuItem value="asc">Prix croissant</MenuItem>
              <MenuItem value="desc">Prix décroissant</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Drawer>

      <Box sx={{ flexGrow: 1 }}>
        <button onClick={toggleDrawer} sx={{ mb: 2 }}>
          {isDrawerOpen ? 'Masquer les filtres' : 'Afficher les filtres'}{' '}
          <FontAwesomeIcon icon={faArrowUpShortWide} />
        </button>

        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
              <Box position="relative">
                {/* Lien vers la page du produit */}
                <Link className="image-container" to={`/product/${product._id}`}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={process.env.PUBLIC_URL + product.image}
                    alt={product.name}
                  />
                  <CardContent>
                    <h3>{product.name}</h3>
                    <Typography variant="body2">{product.price} EUR</Typography>
                  </CardContent>
                </Link>

                {/* Bouton pour liker/unliker */}
                <FontAwesomeIcon
                  icon={favoriteItems.includes(product._id) ? faSolidHeart : faRegularHeart}
                  onClick={() => handleLikeToggle(product._id)}
                  style={{ cursor: 'pointer', position: 'absolute', top: '10px', right: '10px', color: favoriteItems.includes(product._id) ? 'red' : 'gray' }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ListProducts;
