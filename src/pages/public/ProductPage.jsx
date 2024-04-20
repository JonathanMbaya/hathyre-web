import React from 'react';
import ListProducts from '../../components/Catalogue/products/ListProducts.jsx';
import Footer from '../../components/Footer/Footer';
import 'animate.css';

function ProductPage() {
    return (
        <>
        
            <div id="shadow"></div>
     
            <h1 className='animate__animated animate__fadeInUp' style={{ textAlign: 'center', marginBottom: '10rem', marginTop: '1rem', color : '#895832'  }}> 
                La Boutique | Hathyre 
            </h1>
            

            <ListProducts/>

            <Footer/>

        </>
    );
};

export default ProductPage;