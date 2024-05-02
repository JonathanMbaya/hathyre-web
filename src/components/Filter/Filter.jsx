import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpShortWide } from '@fortawesome/free-solid-svg-icons';
import './Filter.css';

function Filter({ filterCriteria, setFilterCriteria }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleFilter = () => {
        setIsOpen(!isOpen);
    };

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilterCriteria(prevCriteria => ({
            ...prevCriteria,
            [name]: value
        }));
    };

    return (
        <div className={`area-filter ${isOpen ? 'open' : ''}`}>
            <div onClick={toggleFilter}>
                Afficher les filtres <FontAwesomeIcon icon={faArrowUpShortWide} />
            </div>
            <div className='btn-filter'>
                <select name="name" id="name" value={filterCriteria.name} onChange={handleFilterChange}>
                    <option value="">Par nom</option>
                    <option value="option1">A-Z</option>
                    <option value="option2">Z-A</option>
                </select>
                <select name="price" id="price" value={filterCriteria.price} onChange={handleFilterChange}>
                    <option value="">Par Prix</option>
                    <option value="option1">Décroissant</option>
                    <option value="option2">Croissant</option>
                </select>
                <select name="category" id="category" value={filterCriteria.category} onChange={handleFilterChange}>
                    <option value="">Par catégorie</option>
                    <option value="option1">Savon</option>
                    <option value="option2">Crème</option>
                    <option value="option3">Accessoires</option>
                </select>
            </div>
        </div>
    );
}

export default Filter;
