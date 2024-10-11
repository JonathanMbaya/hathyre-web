import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faChevronDown, faChevronRight, faSoap, faDroplet, faRing } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Importer axios
import './navbar.style.css';

function Navbar() {
  
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);
  const [category, setCategory] = useState([]);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      const scrollPosition = window.scrollY;

      if (scrollPosition > navbar.offsetTop) {
        setIsNavbarFixed(true);
      } else {
        setIsNavbarFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://hathyre-server-api.onrender.com/api/products/savon');
        setCategory(response.data); // Mettre à jour l'état avec les données de la catégorie
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories :", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className={`navbar ${isNavbarFixed ? 'fixed' : ''}`}>
      <nav style={{borderRadius: "0rem 0rem 2rem 2rem"}}>
        <ul>
          <li>
            <Link to="/" className="link-without-decoration"><FontAwesomeIcon icon={faHouse} /></Link>
          </li>
          <li
            className="submenu-container"
            onMouseEnter={() => setIsSubMenuOpen(true)}
            onMouseLeave={() => setIsSubMenuOpen(false)}
          >
            <Link to="/product" className="link-without-decoration">
              Nos produits <FontAwesomeIcon icon={faChevronDown} />
            </Link>

            {isSubMenuOpen && (
              <div className="submenu" style={{ display: "flex" }}>
                <div>
                  <li>
                    <Link to="/product" className="link-without-decoration">
                      <FontAwesomeIcon icon={faSoap} /> Savons <FontAwesomeIcon icon={faChevronRight} />
                    </Link>
                  </li>
                  {category.map((product, index) => (
                    <li key={index}>
                      <Link to={`/product/${product._id}`} className="link-without-decoration">
                        {product.name}
                      </Link>
                    </li>
                  ))}
                  {/* <li>
                    <Link to={`/product`} className="link-without-decoration">
                      Voir plus +
                    </Link>
                  </li> */}
                </div>

                <div>
                  <li>
                    <Link to="/" className="link-without-decoration">
                      <FontAwesomeIcon icon={faDroplet} /> Beurres et Huiles <FontAwesomeIcon icon={faChevronRight} />
                    </Link>
                  </li>
                  <li>Bientôt disponible</li>
                </div>

                <div>
                  <li>
                    <Link to="/" className="link-without-decoration">
                      <FontAwesomeIcon icon={faRing} /> Accessoires <FontAwesomeIcon icon={faChevronRight} />
                    </Link>
                  </li>
                  <li>Bientôt disponible</li>
                </div>
              </div>
            )}
          </li>

          <li>
            <Link to="/apropos" className="link-without-decoration">A propos de Hathyre</Link>
          </li>
          <li>
            <Link className="link-without-decoration" to="https://instagram.com/hathyre_/" target="_blank" rel="noopener noreferrer">
              Nous rejoindre sur Instagram
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
