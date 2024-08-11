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

      

      <div className={`menu ${isOpen ? 'open' : ''}`}>

        <ul className="d-flex">
          <li className="me-0 border-2 border-end border-dark-subtle connect">
            
            {!userConnected ? (
              
              <Link to="/login"> {/* Assurez-vous que le lien est correct */}
                Se connecter <FontAwesomeIcon icon={faUser} />
              </Link>
              
              ) : (
              <span className='connect' onClick={handleLogout}>
                {/* Assurez-vous que le lien est correct */}
                
                Bonjour , {userConnected.prenom } {userConnected.nom} <br />
                <hr />

                <Link to="/">
                  Déconnexion <FontAwesomeIcon onClick={handleLogout} icon={faPowerOff} />
                </Link>
              </span> 
            )}

          </li>

        </ul>

        <ul>
          <hr/>
          <li className='burger-li'>
            <Link to="/" className="link-without-decoration"><FontAwesomeIcon icon={faHouse} /></Link>
            <FontAwesomeIcon icon={faChevronRight} />
          </li>
          <li className='burger-li'>
            <Link to="/product" className="link-without-decoration">Nos produits </Link>
            <FontAwesomeIcon icon={faChevronRight} />
          </li>
          <li className='burger-li'>
            <Link to="/apropos" className="link-without-decoration">A propos de Hathyre</Link>
            <FontAwesomeIcon icon={faChevronRight} />
          </li>

          <Link className="link-without-decoration" to="https://instagram.com/hathyre_/" target="_blank">
            <li>
              Rejoins nous sur instagram  <img className='icon-nav' src={process.env.PUBLIC_URL + '/socialnetwork/instagram.svg'} alt="Logo Hathyre" />
            </li>
          </Link>
          
        </ul>

      </div>

    </div>
  );
};

export default BurgerMenu;
