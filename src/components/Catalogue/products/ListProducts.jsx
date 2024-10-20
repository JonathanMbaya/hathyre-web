import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import {
  Box,
  Grid,
  CardMedia,
  CardContent,
  Typography,
  FormControl,
  InputBase,
  Skeleton,
} from '@mui/material';
import { useQuery } from 'react-query';
import { LoginContext } from '../../../context/login.context.jsx';
import { FavoritesContext } from '../../../context/favorites.context.jsx';
import PopLogin from '../../PopLogin/PopLogin.jsx'; // Import du composant PopLogin
import './Product.css';

// Fonction pour récupérer les produits
const fetchProducts = async () => {
  const { data } = await axios.get('https://hathyre-server-api.onrender.com/api/products');
  return data;
};

const ListProducts = () => {
  const { userConnected } = useContext(LoginContext);
  const { favoriteItems, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortByName, setSortByName] = useState('');
  const [sortByPrice, setSortByPrice] = useState('');
  const [openLogin, setOpenLogin] = useState(false); // État pour ouvrir/fermer la modale

  const [hoveredProductId, setHoveredProductId] = useState(null); // État pour le produit survolé

  // Utilisation de React Query pour récupérer les produits
  const { data: products = [], isLoading, isError } = useQuery('products', fetchProducts);

  const handleLikeToggle = (productId) => {
    if (!userConnected) {
      setOpenLogin(true); // Ouvrir la modale de connexion si l'utilisateur n'est pas connecté
      return;
    }

    if (favoriteItems.includes(productId)) {
      removeFromFavorites(productId);
    } else {
      addToFavorites(productId);
    }
  };

  const handleCloseLogin = () => {
    setOpenLogin(false); // Fermer la modale
  };

  // Filtrage et tri des produits
  const filteredProducts = products
    .filter((product) => {
      return product.name.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .filter((product) => {
      return selectedCategory ? product.category === selectedCategory : true;
    })
    .sort((a, b) => {
      if (sortByName) {
        return sortByName === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      return 0;
    })
    .sort((a, b) => {
      if (sortByPrice) {
        return sortByPrice === 'asc' ? a.price - b.price : b.price - a.price;
      }
      return 0;
    });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', padding: '2rem', alignItems: 'center' }}>
      <hr />
      {/* Filtres de catégories */}
      <Box className="category-filter">
        {['', 'Savon', 'Beurres et Huiles', 'Accessoires'].map((category) => (
          <button
            key={category}
            className={`category-button ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category || 'Tous'}
          </button>
        ))}
      </Box>

      {/* Tri par nom et par prix */}
      <Box className="sort-buttons">
        <button
          className={`sort-button ${sortByName === 'asc' ? 'active' : ''}`}
          onClick={() => setSortByName(sortByName === 'asc' ? '' : 'asc')}
        >
          A-Z
        </button>
        <button
          className={`sort-button ${sortByName === 'desc' ? 'active' : ''}`}
          onClick={() => setSortByName(sortByName === 'desc' ? '' : 'desc')}
        >
          Z-A
        </button>
        <button
          className={`sort-button ${sortByPrice === 'asc' ? 'active' : ''}`}
          onClick={() => setSortByPrice(sortByPrice === 'asc' ? '' : 'asc')}
        >
          Prix croissant
        </button>
        <button
          className={`sort-button ${sortByPrice === 'desc' ? 'active' : ''}`}
          onClick={() => setSortByPrice(sortByPrice === 'desc' ? '' : 'desc')}
        >
          Prix décroissant
        </button>
      </Box>

      <hr />

      {/* Barre de recherche */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputBase
          placeholder="Rechercher un produit"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </FormControl>

      <Grid container spacing={4}>
        {isLoading ? (
          // Afficher les Skeletons lors du chargement
          [1, 2, 3, 4].map((_, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Skeleton variant="rectangular" width={300} height={200} />
              <Skeleton variant="text" width={150} />
              <Skeleton variant="text" width={100} />
            </Grid>
          ))
        ) : isError ? (
          <Typography variant="body1" color="error">
            Erreur lors de la récupération des produits
          </Typography>
        ) : (
          filteredProducts.map((product) => (
            <Grid item key={product._id} xs={6} sm={6} md={4} lg={3}>
              <Box position="relative">
                <Link className="link-without-decoration image-container" to={`/product/${product._id}`}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={hoveredProductId === product._id 
                      ? process.env.PUBLIC_URL + product.image2 // Affiche la deuxième image au survol
                      : process.env.PUBLIC_URL + product.image} // Affiche la première image par défaut
                    alt={product.name}
                    onMouseEnter={() => setHoveredProductId(product._id)}
                    onMouseLeave={() => setHoveredProductId(null)}
                  />
                  <CardContent>
                    <h3>{product.name}</h3>
                    <p>{product.price} EUR</p>
                  </CardContent>
                </Link>

                <FontAwesomeIcon
                  icon={favoriteItems.includes(product._id) ? faSolidHeart : faRegularHeart}
                  onClick={() => handleLikeToggle(product._id)}
                  style={{
                    cursor: 'pointer',
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    color: favoriteItems.includes(product._id) ? 'red' : 'gray',
                  }}
                />
              </Box>
            </Grid>
          ))
        )}
      </Grid>

      {/* Affichage du pop-up de connexion */}
      <PopLogin open={openLogin} handleClose={handleCloseLogin} />
    </Box>
  );
};

export default ListProducts;
