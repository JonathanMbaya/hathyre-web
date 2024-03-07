import React from 'react';
import InfoAbout from '../components/InfoAbout/InfoAbout.jsx';
import Footer from '../components/Footer/Footer';

function AboutPage () {
    return (
        <>
            <h1 style={{ textAlign: 'center', marginBottom: '5rem', marginTop: '1rem', color : '#895832'  }}> 
                A propos de Hathyre
            </h1>

            <video autoPlay loop muted style={{ width: '50%', height: 'auto' }}>
                <source src={`${process.env.PUBLIC_URL}/karite.mp4`} type="video/mp4" />
                {/* Ajoutez d'autres sources pour les différents formats de vidéo si nécessaire */}
            </video>

            <img 
                src={`${process.env.PUBLIC_URL}/karite.gif`} 
                alt="GIF de karite" 
                style={{ width: '50%', height: 'auto' }} 
            />

            <InfoAbout/>

            <Footer/>
            
        </>
    );
};

export default AboutPage;