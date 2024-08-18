import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDroplet, faRing, faBars, faMagnifyingGlass, faCircleUser, faTimes, faChevronRight, faHouse, faSoap } from '@fortawesome/free-solid-svg-icons';
import Basket from "../Basket/Basket.jsx";
import "./newNavbar.css";
import "./BurgerMenu.css";

function NewNavbar() {
    const [results, setResults] = useState([]);
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenSearch, setIsOpenSearch] = useState(false);
    const [category, setCategory] = useState([]);
    // const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://hathyre-server-api.onrender.com/api/products/savon');
                setCategory(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des catégories :", error);
            }
        };

        fetchCategories();
    }, []);

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
                    <form className="form-search">
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
                            <Link className='link-without-decoration' to={`/product/${product._id}`} key={product._id}>
                                <div className='item-search'>
                                    <img src={product.image} alt={product.name} />
                                    <p>{product.name}</p>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>

            <div style={{ borderBottom: '.5px solid lightgray', display: 'flex', flexDirection: 'row' }} className="burger-icon" onClick={toggleSearch}>
                <div>
                    <p>Trouver un  produit</p>
                </div>
                <div>
                    <FontAwesomeIcon icon={faMagnifyingGlass} size="1x" />
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', width: '25%' }}>
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
                    <li>
                        <Link to="/login" className="link-without-decoration"><FontAwesomeIcon icon={faCircleUser} size="2x" /></Link>
                    </li>
                </div>

                <div className="burger-menu" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', height: '24px' }} onClick={toggleMenu}>
                    <FontAwesomeIcon className={`line ${isOpen ? 'open' : ''}`} icon={faBars} />
                    <FontAwesomeIcon className={`line ${isOpen ? 'open' : ''}`} icon={faBars} />
                    <FontAwesomeIcon className={`line ${isOpen ? 'open' : ''}`} icon={faBars} />
                </div>

                <div className={`menu ${isOpen ? 'open' : ''}`}>


                    <nav>
                        <ul>
                            <li>
                                <Link to="/" className="link-without-decoration"><FontAwesomeIcon icon={faHouse} /></Link>
                            </li>

                            <li>
                                Nos produits
                            </li>

                            <li
                            
                                // onClick={() => setIsSubMenuOpen(true)}
                                style={{ display: "flex", flexDirection: 'column', alignItems: 'flex-start', margin: '0rem' }}
                            >
                                
                                    <div style={{ display: "flex", flexDirection: 'column', alignItems: 'flex-start', justifyContent:'flex-start', textAlign: 'left' }}>
                                        <ul>
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
                                        </ul>
                                        <ul>
                                            <li>
                                                <Link to="/" className="link-without-decoration">
                                                    <FontAwesomeIcon icon={faDroplet} /> Beurres et Huiles <FontAwesomeIcon icon={faChevronRight} />
                                                </Link>
                                            </li>
                                            <li>Bientôt disponible</li>
                                        </ul>
                                        <ul>
                                            <li>
                                                <Link to="/" className="link-without-decoration">
                                                    <FontAwesomeIcon icon={faRing} /> Accessoires <FontAwesomeIcon icon={faChevronRight} />
                                                </Link>
                                            </li>
                                            <li>Bientôt disponible</li>
                                        </ul>
                                    </div>
                                
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
            </div>
        </div>
    );
}

export default NewNavbar;
