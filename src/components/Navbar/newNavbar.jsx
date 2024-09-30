import React, { useState, useEffect, useContext} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDroplet, faRing, faBars, faMagnifyingGlass, faCircleUser, faTimes, faChevronRight, faHouse, faSoap } from '@fortawesome/free-solid-svg-icons';
import Basket from "../Basket/Basket.jsx";
import {LoginContext} from "../../context/login.context.jsx"
import "./newNavbar.css";
import "./BurgerMenu.css";

function NewNavbar() {
    const [results, setResults] = useState([]);
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenSearch, setIsOpenSearch] = useState(false);
    const { userConnected } = useContext(LoginContext);

    const toggleMenu = () => setIsOpen(!isOpen);
    const toggleSearch = () => setIsOpenSearch(!isOpenSearch);


    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get(`https://hathyre-server-api.onrender.com/api/product/search/${encodeURIComponent(input)}`);
                setResults(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des produits:', error);
            }
        };

        if (input.trim() !== '') {
            fetchResults();
        } else {
            setResults([]);
        }
    }, [input]);

    const handleInputChange = (event) => setInput(event.target.value);

    return (
        <div className="nav-high">
            <div className={`page-search ${isOpenSearch ? 'openSearch' : ''}`}>
                <div className='search'>
                    <form className="form-search" onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="text"
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Trouvez un produit"
                    />
                    </form>
                    <div onClick={toggleSearch} className="product-close animate__animated animate__fadeInUp">
                    <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
                <div className='result-search'>
                    {results.length === 0 ? (
                    <p>Aucun produit trouvé.</p>
                    ) : (
                    results.map((product) => (
                        <div  to={`/product/${product._id}`} key={product._id}>
                            <div className='item-search'>
                                <img src={product.image} alt={product.name} />
                                <p style={{fontSize: "12px"}}>{product.name}</p>
                            </div>
                        </div>
                    ))
                    )}
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', width: '20%' }} className="burger-icon" onClick={toggleSearch}>
                <button style={{borderRadius: "1rem", display: "flex", alignItems: "center"}}>
                    __<FontAwesomeIcon icon={faMagnifyingGlass} size="1.5x" />
                </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', width: '50%' }}>
                <Link to='/'>
                    <img
                        src={`${process.env.PUBLIC_URL}/hathyre-logo.png`}
                        alt="Logo de l'application"
                        className="logo-img"
                    />
                </Link>
            </div>

            <div className="icons-users">

                <Basket />

                <div>
                    {   !userConnected ?

                        <li>
                            <Link to="/login" className="link-without-decoration"><FontAwesomeIcon icon={faCircleUser} size="2x" /></Link>
                        </li> :
                        <li>
                            <Link to="/account" className="link-without-decoration"><FontAwesomeIcon icon={faCircleUser} size="2x" /></Link>
                        </li>

                    }

                </div>

                <div className="burger-menu" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', height: '24px' }} onClick={toggleMenu}>
                    <FontAwesomeIcon className={`line ${isOpen ? 'open' : ''}`} icon={faBars} />
                    <FontAwesomeIcon className={`line ${isOpen ? 'open' : ''}`} icon={faBars} />
                    <FontAwesomeIcon className={`line ${isOpen ? 'open' : ''}`} icon={faBars} />
                </div>

                <div className={`menu ${isOpen ? 'open' : ''}`}>

                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <Link to='/'>
                            <img
                                src={`${process.env.PUBLIC_URL}/hathyre-logo.png`}
                                alt="Logo de l'application"
                                className="logo-img"
                            />
                        </Link>
                    </div>


                    <nav className="mobile">

                        <div onClick={toggleMenu} className="product-close animate__animated animate__fadeInUp">
                            <FontAwesomeIcon icon={faTimes} />
                        </div>

                        <ul>
                            <li>
                                <Link to="/" className="link-without-decoration"><FontAwesomeIcon icon={faHouse} /></Link>
                            </li>

                            <li>
                                <FontAwesomeIcon icon={faSoap} />
                                <Link to="/product" className="link-without-decoration">
                                    Savons
                                </Link>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </li>
                        
                            <li>
                                <FontAwesomeIcon icon={faDroplet} />
                                <Link to="/" className="link-without-decoration">
                                    Beurres et Huiles
                                </Link>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </li>
                        
                            <li>
                                <FontAwesomeIcon icon={faRing} />
                                <Link to="/" className="link-without-decoration">
                                    Accessoires
                                </Link>
                                <FontAwesomeIcon icon={faChevronRight} />
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

                        <ul>
                            <li>
                                <Link className="link-without-decoration" to="/account">
                                    Mon compte
                                </Link>
                            </li>
                            <li>
                                <Link className="link-without-decoration" to="/faq">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link className="link-without-decoration" to="/">
                                    Se déconnecter
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default NewNavbar;
