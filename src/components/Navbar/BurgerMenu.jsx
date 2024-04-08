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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="burger-menu">

      <div className="icons-users">

        <button className="burger-icon" onClick={toggleMenu}>
          <FontAwesomeIcon className={`line ${isOpen ? 'open' : ''}`} icon={faBars} />
          <FontAwesomeIcon className={`line ${isOpen ? 'open' : ''}`} icon={faBars} />
          <FontAwesomeIcon className={`line ${isOpen ? 'open' : ''}`} icon={faBars} />
          {/* <div className={`line ${isOpen ? 'open' : ''}`}></div>
          <div className={`line ${isOpen ? 'open' : ''}`}></div>
          <div className={`line ${isOpen ? 'open' : ''}`}></div> */}
        </button>

        <button className="burger-icon" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBagShopping} />
        </button>

        <button className="burger-icon">
          <FontAwesomeIcon icon={faUser} />
        </button>

        <button className="burger-icon" onClick={toggleMenu}>
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
    </div>
  );
};

export default BurgerMenu;
