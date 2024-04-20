import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './BurgerMenu.css'; // Assurez-vous d'avoir un fichier CSS pour styliser le menu burger

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSearch = () => {
    setIsOpenSearch(!isOpenSearch);
  };


  return (
    <div className="burger-menu">

      <div className="icons-users">

        <button className="burger-icon" onClick={toggleMenu}>
          <FontAwesomeIcon className={`line ${isOpen ? 'open' : ''}`} icon={faBars} />
          <FontAwesomeIcon className={`line ${isOpen ? 'open' : ''}`} icon={faBars} />
          <FontAwesomeIcon className={`line ${isOpen ? 'open' : ''}`} icon={faBars} />
        </button>

        <button className="burger-icon" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBagShopping} />
        </button>

        <Link to="/admin/login">
          <button className="burger-icon">
            <FontAwesomeIcon icon={faUser} />
          </button>
        </Link>


        <button className="burger-icon" onClick={toggleSearch}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>

      </div>



      <div className={`menu ${isOpen ? 'open' : ''}`}>
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
      </div>

      <div className={`search ${isOpenSearch ? 'openSearch': ''}`}>
        <div className={`result-search ${isOpenSearch ? 'openSearch': ''}`}>

        </div>

        <input type="text" placeholder="Trouvez un produit" />

      </div>
    </div>
  );
};

export default BurgerMenu;
