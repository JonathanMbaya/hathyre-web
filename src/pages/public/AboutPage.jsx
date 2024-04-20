import React from 'react';
import InfoAbout from '../../components/InfoAbout/InfoAbout.jsx';
import Footer from '../../components/Footer/Footer';
import 'animate.css';

function AboutPage () {

    const Shadow = {
        
        position: 'fixed',
        height: '50vh',
        width: '100%',
        zIndex: 70000000,
        background: 'linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))',
        bottom: '0px',
        transition : '.3s'

    };


    // Fonction pour gérer le défilement de la page
    const handleScroll = () => {
        const scrollThreshold = 1000; // Définissez ici le niveau de scroll à partir duquel l'ombre disparaît
        const shadow = document.getElementById('shadow'); // Remplacez 'shadow' par l'ID de votre élément ombre
        if (window.scrollY > scrollThreshold) {
            shadow.style.display = 'none'; // Cacher l'ombre lorsque le niveau de défilement dépasse le seuil
        } else {
            shadow.style.display = 'block'; // Afficher l'ombre lorsque le niveau de défilement est inférieur au seuil
        }
    }

    // Écouteur d'événements pour le défilement de la page
    window.addEventListener('scroll', handleScroll);

    

    return (
        <>

            <div id="shadow" style={Shadow} className='box-shadow-white'></div>

            <h1 className='animate__animated animate__fadeInUp'  style={{ textAlign: 'center', marginBottom: '5rem', marginTop: '1rem', color : 'white'  }}> 
                A propos de Hathyre
            </h1>

            <InfoAbout/>

            <Footer/>
            
        </>
    );
};

export default AboutPage;