import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LoginContext } from "../../context/login.context";
import { faBars, faHouse, faMagnifyingGlass, faPowerOff, faUser, faChevronRight  } from '@fortawesome/free-solid-svg-icons';
import './BurgerMenu.css'; // Assurez-vous d'avoir un fichier CSS pour styliser le menu burger

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);


  const navigate = useNavigate();
  const { userConnected } = useContext(LoginContext);

  const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      navigate('/');
  };


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSearch = () => {
    setIsOpenSearch(!isOpenSearch);
  };

  return (
    <div className="burger-menu">
      <div className="icons-users">

        <div className="burger-icon">
          Menu
        </div>

        <div className="burger-icon" onClick={toggleMenu}>

          <FontAwesomeIcon className={`line ${isOpen ? 'open' : ''}`} icon={faBars} />
          <FontAwesomeIcon className={`line ${isOpen ? 'open' : ''}`} icon={faBars} />
          <FontAwesomeIcon className={`line ${isOpen ? 'open' : ''}`} icon={faBars} />

        </div>
        
        <div className="burger-icon" onClick={toggleSearch}>
          <FontAwesomeIcon icon={faMagnifyingGlass} size="1x" />
        </div>

      </div>

    

    </div>
  );
};

export default BurgerMenu;
