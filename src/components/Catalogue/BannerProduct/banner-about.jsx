import React from "react";
// import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus } from '@fortawesome/free-solid-svg-icons';
import "./catalogue.css";

function BannerAbout() {
  return (
    <div>
      <div className="about-banner">
        <h2>
          Découvrez l'histoire des produits Hathyre et les secrets de nos
          fabrications
        </h2>
        <img src={process.env.PUBLIC_URL + "/present/1.png"} alt="" />
        <div className="text-banner">
          <h2>Pourquoir choisir les produits Hathyre ?</h2>

          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem
            dolorem et optio molestiae. Facilis, dolor! Numquam cum officia
            sapiente amet ex architecto, voluptas dolore doloribus suscipit hic
            voluptatum adipisci quas!
          </p>
        </div>
      </div>
    </div>
  );
}

export default BannerAbout;
