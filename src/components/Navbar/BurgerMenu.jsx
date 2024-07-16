import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LoginContext } from "../../context/login.context";
import { faBars, faHouse, faMagnifyingGlass, faPowerOff, faUser, faChevronRight  } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import './BurgerMenu.css'; // Assurez-vous d'avoir un fichier CSS pour styliser le menu burger

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const { userConnected } = useContext(LoginContext);

  const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      navigate('/');
  };

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`https://hathyre-server-api.onrender.com/api/product/search/${encodeURIComponent(input)}`);
        const data = response.data;
        setResults(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
      }
    };

    fetchResults();
  }, [input]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
    if (event.target.value.trim() === '') {
      setResults([]);
    }
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

          {/* {userConnected.prenom === 'Zacharie' && (
            <li>
              <Link className="dropdown-item" to="/admin/login">
                Administration
              </Link>
            </li>
          )}  */}
          
        </ul>

        <ul>
          <hr />
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

      <div className={`page-search ${isOpenSearch ? 'openSearch': ''}`}>
        <div className='search'>
          <form className="form-search">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Trouvez un produit" 
            />
          </form>
        </div>
        <div className='result-search'>
        {results.length === 0 ? (
          <p>Aucun produit trouvé.</p>
        ) : (
          results
            .filter((product) => {
              return product.name.toLowerCase().includes(input.toLowerCase());
            })
            .map((product) => (
              <Link className='link-without-decoration' to={`/product/${product._id}`}>
                <div className='item-search' key={product._id}>
                  <img src={product.image} alt={product.name} />
                  <p>{product.name}</p>
                </div>
              </Link>

            ))
        )}
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;
