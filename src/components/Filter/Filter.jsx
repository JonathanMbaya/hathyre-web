import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpShortWide } from '@fortawesome/free-solid-svg-icons';
import './Filter.css';

function Filter() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`area-filter ${isOpen ? 'open' : ''}`}>
      <FontAwesomeIcon icon={faArrowUpShortWide} onClick={toggleFilter} />

      <div className='btn-filter'>
        <select name="filter" id="filter">
          <option value="">Par nom</option>
          <option value="option1">A-Z</option>
          <option value="option2">Z-A</option>
        </select>

        <select name="filter" id="filter">
          <option value="">Par Prix</option>
          <option value="option1">Décroissant</option>
          <option value="option2">Croissant</option>
        </select>

        <select name="filter" id="filter">
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
