import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './navbar.style.css';

function Navbar() {
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);
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

  return (
    <div className={`navbar ${isNavbarFixed ? 'fixed' : ''}`}>
      <nav>
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

            {isSubMenuOpen ?

              <ul className="submenu">
                <li><Link to="/product" className="link-without-decoration">Savons <FontAwesomeIcon icon={faChevronRight} /></Link></li>
                <li><Link to="/product" className="link-without-decoration">Beurres et Huiles <FontAwesomeIcon icon={faChevronRight} /></Link></li>
                <li><Link to="/product" className="link-without-decoration">Accessoires <FontAwesomeIcon icon={faChevronRight} /></Link></li>
              </ul> : ''
            }



          </li>


          <li>
            <Link to="/apropos" className="link-without-decoration">A propos de Hathyre</Link>
          </li>
          <li>
            <Link className="link-without-decoration" to="https://instagram.com/hathyre_/" target="_blank">
              Nous rejoindre sur instagram
            </Link>
            <i className="fa-brands fa-instagram"></i>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
