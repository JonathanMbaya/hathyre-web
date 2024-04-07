import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './catalogue.css';


function BannerCatalogue(){
    return(
            // <ImageOverlay
            //     imageSrc={process.env.PUBLIC_URL + '/img-products/baobabsoap.png'}
            //     text="Texte au-dessus de l'image"
            // />

            <div className="catalogue-banner">
                <div>
                    <img src={process.env.PUBLIC_URL + "/img-products/baobabsoap.png"}  alt="" />
                </div>
                <div>
                    <img src={process.env.PUBLIC_URL + "/img-products/baobabsoap.png"}  alt="" />
                </div>
                <div className="btn-plus">
                    <p>Voir plus</p>
                    <FontAwesomeIcon icon={faPlus} />
                </div>

            </div>
    )
}


export default BannerCatalogue ; 