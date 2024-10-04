import React, { useState, useEffect, useContext } from 'react';
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
} from '@mui/material';
import { LoginContext } from '../../../context/login.context.jsx';
import { FavoritesContext } from '../../../context/favorites.context.jsx';
import './Product.css';

const ListProducts = () => {
  const { userConnected } = useContext(LoginContext);
  const { favoriteItems, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortByName, setSortByName] = useState('');
  const [sortByPrice, setSortByPrice] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`https://hathyre-server-api.onrender.com/api/products`);
        setProducts(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des produits :', error);
      }
    };

    fetchProducts();
  }, []);

  const handleLikeToggle = (productId) => {
    if (!userConnected) {
      alert('Vous devez être connecté pour liker un produit.');
      return;
    }

    if (favoriteItems.includes(productId)) {
      removeFromFavorites(productId);
    } else {
      addToFavorites(productId);
    }
  };

  // Filtrage et tri des produits
  const filteredProducts = products
    .filter((product) => {
      // Filtrer par recherche
      return product.name.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .filter((product) => {
      // Filtrer par catégorie
      return selectedCategory ? product.category === selectedCategory : true;
    })
    .sort((a, b) => {
      // Tri par nom
      if (sortByName) {
        return sortByName === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      return 0;
    })
    .sort((a, b) => {
      // Tri par prix
      if (sortByPrice) {
        return sortByPrice === 'asc' ? a.price - b.price : b.price - a.price;
      }
      return 0;
    });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', padding: '2rem', alignItems:'center' }}>
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
      <FormControl fullWidth  sx={{ mb: 2 }}>
        <InputBase
          placeholder="Rechercher un produit"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </FormControl>

      <Grid container spacing={4}>
        {filteredProducts.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
            <Box position="relative">
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
        ))}
      </Grid>
    </Box>
  );
};

export default ListProducts;
