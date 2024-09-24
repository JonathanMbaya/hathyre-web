import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, IconButton, Divider } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHouse, faSoap, faDroplet, faRing, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState([]);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://hathyre-server-api.onrender.com/api/products/savon');
        setCategory(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories :', error);
      }
    };

    fetchCategories();
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsOpen(open);
  };

  return (
    <>
      {/* Burger Icon */}
      <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
        <FontAwesomeIcon icon={faBars} />
      </IconButton>

      {/* Drawer Menu */}
      <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
        <div
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
          style={{ width: 250 }}
        >
          <List>
            {/* Home */}
            <ListItem button component={Link} to="/">
              <FontAwesomeIcon icon={faHouse} style={{ marginRight: '10px' }} />
              <ListItemText primary="Accueil" />
            </ListItem>

            <Divider />

            {/* Nos Produits */}
            <ListItem>
              <ListItemText primary="Nos produits" />
            </ListItem>

            <List component="div" disablePadding>
              {/* Savons */}
              <ListItem button component={Link} to="/product" sx={{ pl: 4 }}>
                <FontAwesomeIcon icon={faSoap} style={{ marginRight: '10px' }} />
                <ListItemText primary="Savons" />
                <FontAwesomeIcon icon={faChevronRight} />
              </ListItem>

              {category.map((product, index) => (
                <ListItem key={index} button component={Link} to={`/product/${product._id}`} sx={{ pl: 6 }}>
                  <ListItemText primary={product.name} />
                </ListItem>
              ))}

              {/* Beurres et Huiles */}
              <ListItem button component={Link} to="/" sx={{ pl: 4 }}>
                <FontAwesomeIcon icon={faDroplet} style={{ marginRight: '10px' }} />
                <ListItemText primary="Beurres et Huiles" />
                <FontAwesomeIcon icon={faChevronRight} />
              </ListItem>
              <ListItem sx={{ pl: 6 }}>
                <ListItemText primary="Bientôt disponible" />
              </ListItem>

              {/* Accessoires */}
              <ListItem button component={Link} to="/" sx={{ pl: 4 }}>
                <FontAwesomeIcon icon={faRing} style={{ marginRight: '10px' }} />
                <ListItemText primary="Accessoires" />
                <FontAwesomeIcon icon={faChevronRight} />
              </ListItem>
              <ListItem sx={{ pl: 6 }}>
                <ListItemText primary="Bientôt disponible" />
              </ListItem>
            </List>

            <Divider />

            {/* A propos */}
            <ListItem button component={Link} to="/apropos">
              <ListItemText primary="À propos de Hathyre" />
            </ListItem>

            {/* Instagram */}
            <ListItem button component="a" href="https://instagram.com/hathyre_/" target="_blank" rel="noopener noreferrer">
              <ListItemText primary="Nous rejoindre sur Instagram" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </>
  );
}

export default BurgerMenu;
