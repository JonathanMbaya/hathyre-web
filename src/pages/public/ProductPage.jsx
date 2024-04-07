import React from 'react';
import ListProducts from '../../components/Catalogue/products/ListProducts.jsx';
import Footer from '../../components/Footer/Footer';

function ProductPage() {
    return (
        <>

     
            <h1 style={{ textAlign: 'center', marginBottom: '10rem', marginTop: '1rem', color : '#895832'  }}> 
                La Boutique | Hathyre 
            </h1>
            

            <ListProducts/>

            <Footer/>

        </>
    );
};

export default ProductPage;