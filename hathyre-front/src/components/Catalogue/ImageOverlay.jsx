import React from 'react';
import Button from '../Button/Button';
import './ImageOverlay.css'; // Assure-toi d'avoir un fichier CSS correspondant

const ImageOverlay = ({ imageSrc, text, name }) => {
    return (
        <div className="container">
            <div className='image-overlay'>
                
                <div className="overlay"></div>
                <img src={imageSrc} alt="Background" className="background-image" />
                <div className='name'>{name}</div>

                <div className="text">
                    {text}
                    <Button text = 'Découvrir +'/>
                </div>

            </div>
            
        </div>
    );
};

export default ImageOverlay;
