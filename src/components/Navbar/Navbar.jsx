// Navbar.jsx

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './navbar.style.css';

function Navbar() {
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      const scrollPosition = window.scrollY;

      // Ajoutez ou supprimez la classe .fixed en fonction de la position de défilement
      if (scrollPosition > navbar.offsetTop) {
        setIsNavbarFixed(true);
      } else {
        setIsNavbarFixed(false);
      }
    };

    // Ajoutez un gestionnaire d'événements pour le défilement
    window.addEventListener('scroll', handleScroll);

    // Nettoyez le gestionnaire d'événements lorsque le composant est démonté
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`navbar ${isNavbarFixed ? 'fixed' : ''}`}>
      <nav>
        <ul>
          <li>
            <Link to="/" className="link-without-decoration"><FontAwesomeIcon icon={faHouse} /></Link>
          </li>
          <li>
            <Link to="/product" className="link-without-decoration">Nos produits</Link>
          </li>
          <li>
            <Link to="/apropos" className="link-without-decoration">A propos de Hathyre</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
