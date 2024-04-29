import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHouse, faMagnifyingGlass, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import './BurgerMenu.css'; // Assurez-vous d'avoir un fichier CSS pour styliser le menu burger

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);

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
          <Link to="/admin/login">
            <li>
              Se connecter  <FontAwesomeIcon className="burger-icon" icon={faArrowRightToBracket} />
            </li>
          </Link>
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
