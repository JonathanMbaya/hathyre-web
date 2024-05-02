import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpShortWide } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './Product.css';
import '../../Filter/Filter.css';

const ListProducts = () => {

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const [filterCriteria, setFilterCriteria] = useState({
    sortByName: '',
    sortByPrice: ''
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/products`);
        setProducts(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des produits :', error);
      }
    };
    
    fetchProducts();
  }, [filterCriteria]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Activer le chargement
      try {
        const response = await axios.get(`http://localhost:8080/api/products/filters/${filterCriteria.sortByName}/${filterCriteria.sortByPrice}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des produits :', error);
      } finally {
        setTimeout(() => {
          setLoading(false); // Désactiver le chargement après 1,5 seconde
        }, 1500);
      }
    };
    
    fetchProducts();
  }, [filterCriteria]);

  const [isOpen, setIsOpen] = useState(false);

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  const handleNameFilterChange = (event) => {
    const { name, value } = event.target;
    setFilterCriteria(prevCriteria => ({
        ...prevCriteria,
        [name]: value
    }));
  };

  const handlePriceFilterChange = (event) => {
    const { name, value } = event.target;
    setFilterCriteria(prevCriteria => ({
        ...prevCriteria,
        [name]: value
    }));
  };

  return (
    <div>
      <div className={`area-filter ${isOpen ? 'open' : ''}`}>

        <div onClick={toggleFilter}>
          Afficher les filtres <FontAwesomeIcon icon={faArrowUpShortWide} />
        </div>

        <div className='btn-filter'>
          <select name="sortByName" value={filterCriteria.sortByName} onChange={handleNameFilterChange}>
            <option value="">Par nom</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>

          <select name="sortByPrice" value={filterCriteria.sortByPrice} onChange={handlePriceFilterChange}>
            <option value="">Par prix</option>
            <option value="asc">Croissant</option>
            <option value="desc">Décroissant</option>
          </select>
        </div>

      </div>

      {
        loading ? (
          <div className="loading">
            <img  src={process.env.PUBLIC_URL + '/hathyre-logo-loading.gif'} alt="" />
            <h4>Chargement ...</h4>
          </div>
        ) : 

        <div className="list-products">
            {products.map(product => (
                <div key={product._id} className="product">
                    <Link to={`/product/${product._id}`}>
                        <img
                            className='img-fluid'
                            src={process.env.PUBLIC_URL + `${product.image}`}
                            alt=""
                        />
                    </Link>
                    <p>{product.name}</p>
                    <p>{product.price}</p>
                </div>
            ))}
        </div>
      }
        
    </div>
  );

};

export default ListProducts;
