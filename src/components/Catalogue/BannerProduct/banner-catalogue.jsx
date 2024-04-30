import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './catalogue.css';


function BannerCatalogue(){
    return(
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