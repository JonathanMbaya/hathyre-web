import React from 'react';
import { Link } from "react-router-dom";
import "./Error.css";

function Error() {

  return (
    <div className="error-page">

        <h1>Erreur 404</h1>

        <h2> Cette page n'existe pas désolé ...</h2>

        <Link to="/">
            <button>Revenir a l'accueil</button>
        </Link>

      
    </div>
  )
}

export default Error
