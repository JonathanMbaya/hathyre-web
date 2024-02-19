import React from "react";
import ImageOverlay from './ImageOverlay';
import './ImageOverlay.css';



function Catalogue(){
    return(
        <div>

            <ImageOverlay
                imageSrc={process.env.PUBLIC_URL + '/img-products/baobabsoap.png'}
                text="Texte au-dessus de l'image"
            />

        </div>
    )
}



export default Catalogue ; 