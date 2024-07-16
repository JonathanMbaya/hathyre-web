import React from 'react';
import './Popup.css'; // Ajoutez des styles CSS pour votre pop-up
import { Link } from 'react-router-dom';

const Popup = ({ message, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>{message}</h2>
        <Link to='/'>
            <button onClick={onClose}>Fermer</button>
        </Link>
      </div>
    </div>
  );
};

export default Popup;
