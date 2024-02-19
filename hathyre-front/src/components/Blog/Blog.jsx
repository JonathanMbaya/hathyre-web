import React from 'react';
import ImageOverlay from '../Catalogue/ImageOverlay';

function Blog () {
    return (
        <div>
            <div>
                <ImageOverlay
                    className='blog-img'
                    imageSrc={process.env.PUBLIC_URL + '/img-products/baobabsoap.png'}
                    text="Texte au-dessus de l'image"
                />
            </div>
            <div>
                <ImageOverlay
                    className='blog-img'
                    imageSrc={process.env.PUBLIC_URL + '/img-products/baobabsoap.png'}
                    text="Texte au-dessus de l'image"
                />
            </div>
            <div>
                <ImageOverlay
                    className='blog-img'
                    imageSrc={process.env.PUBLIC_URL + '/img-products/baobabsoap.png'}
                    text="Texte au-dessus de l'image"
                />
            </div>
            
        </div>
    );
};

export default Blog;