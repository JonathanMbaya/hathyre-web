import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass, faCircleUser, faTimes } from '@fortawesome/free-solid-svg-icons';
import Basket from "../Basket/Basket.jsx";
import "./newNavbar.css"; // Assurez-vous de créer et d'importer le fichier CSS


function NewNavbar() {

    const [results, setResults] = useState([]);
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenSearch, setIsOpenSearch] = useState(false);


    
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };


    const toggleSearch = () => {
        setIsOpenSearch(!isOpenSearch);
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

        if (input.trim() !== '') {
        fetchResults();
        } else {
        setResults([]);
        }
    }, [input]);

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

  return (
    <div className="nav-high">

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

                <div onClick={toggleSearch} className="product-close animate__animated animate__fadeInUp">
                    <FontAwesomeIcon icon={faTimes} />
                </div>
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

        <div style={{borderBottom: '.5px solid lightgray', display: 'flex', flexDirection: 'row'}}  className="burger-icon" onClick={toggleSearch}>
            
            <div>
                <p>Rechercher</p> 
            </div>

            <div>
                <FontAwesomeIcon icon={faMagnifyingGlass} size="1x" />
            </div>

        </div>


        <div style={{ display: 'flex', justifyContent: 'center', width:'25%' }}>

            <Link to='/'>
                <img
                    src={`${process.env.PUBLIC_URL}/hathyre-logo.png`}
                    alt="Logo de l'application"
                    className="logo-img"
                />
            </Link>

        </div>


        <div className="icons-users">

            <div className="burger-menu" style={{display : 'flex', flexDirection: 'column', justifyContent:'space-around', alignItems: 'center', height:'24px'}} onClick={toggleMenu}>
                <FontAwesomeIcon className={`line ${isOpen ? 'open' : ''}`} icon={faBars} />
                <FontAwesomeIcon className={`line ${isOpen ? 'open' : ''}`} icon={faBars} />
                <FontAwesomeIcon className={`line ${isOpen ? 'open' : ''}`} icon={faBars} />
            </div>

            <Basket/>

            <div>


                
                    <li>
                        <Link to="/login" className="link-without-decoration"><FontAwesomeIcon icon={faCircleUser} size="2x"  /></Link>
                    </li>

            </div>


        </div>
        
    </div>

  );
}

export default NewNavbar;
