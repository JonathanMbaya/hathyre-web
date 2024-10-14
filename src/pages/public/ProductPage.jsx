import React, { Suspense } from 'react';
import 'animate.css';

// Utilisation de lazy loading pour les composants
const ListProducts = React.lazy(() => import('../../components/Catalogue/products/ListProducts'));
const Footer = React.lazy(() => import('../../components/Footer/Footer'));

function ProductPage() {
    return (
        <Suspense fallback={<div>Chargement de la page...</div>}>
            <div id="shadow"></div>

            <h1
                className='animate__animated animate__fadeInUp'
                style={{
                    backgroundColor: "blanchedalmond",
                    textAlign: 'center',
                    paddingBottom: '2rem',
                    color: '#895832',
                    height: '25vh',
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center"
                }}
            >
                La Boutique | Hathyre
            </h1>

            <p style={{ width: "90%", textAlign: "center", fontSize: "18px", paddingLeft: "5%" }}>
                Découvrez notre boutique Hathyre et laissez-vous séduire par
                notre sélection de soins naturels, conçus pour sublimer votre
                peau.
            </p>

            {/* Lazy loaded components */}
            <ListProducts />

            <Footer />
        </Suspense>
    );
};

export default ProductPage;
