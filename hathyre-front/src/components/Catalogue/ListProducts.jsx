import React from 'react';
import ImageOverlay from './ImageOverlay';

function ListProducts() {
    return (
        <div className="wrapper">
            <div className="products category">
                <ul>
                    <li>
                        <ImageOverlay
                            imageSrc={process.env.PUBLIC_URL + '/img-products/baobabsoap.png'}
                            text="Texte au-dessus de l'image"
                        />
                    </li>
                {/* Ajoutez les autres éléments <li> ici */}
                </ul>
            </div>
        </div>
    );
}

export default ListProducts;
